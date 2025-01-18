import { zodResolver } from "@hookform/resolvers/zod";
import { Car } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { IoCarSportOutline } from "react-icons/io5";
import { PiPackage } from "react-icons/pi";
import { toast } from "sonner";
import { z, ZodError } from "zod";

import LoaderWrapper from "@/components/common/loaders/LoaderWrapper";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Icons } from "@/components/ui/icons";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { dynamicSchema } from "@/db/schema";
import { useGetCar } from "@/features/cars/api/use-get-car";
import { useUpdateCar } from "@/features/cars/api/use-update-car";
import { useEditCar } from "@/hooks/use-edit-car";
import { cn } from "@/lib/utils";
import { INPUT_CLASSNAME } from "@/utils/constants";

import DateManufactured from "./DateManufactured";
import FileUpload from "./FileUpload";
import FormInputField from "./FormInput";
import FormSelect from "./FormSelect";

const EditCarSheet: React.FC = () => {
  const { isOpen, onClose, id } = useEditCar();
  const { data, isLoading, isError } = useGetCar(id);

  const updateCar = useUpdateCar();
  const [files, setFiles] = useState<string[]>([]);
 type FormData = z.infer<typeof dynamicSchema>

  const formMethods = useForm<FormData>({
    resolver: zodResolver(dynamicSchema),
    defaultValues: {} as FormData,
  });

  const { handleSubmit, watch, setValue, reset } = formMethods;
  const carPurpose = watch("carPurpose");

  useEffect(() => {
    if (isError) {
      toast.error("Failed to fetch car data");
    } else if (data) {
      reset({
        ...data,
        dateManufactured: data.dateManufactured ? new Date(data.dateManufactured) : undefined,
        pricePerDay: data.pricePerDay ?? undefined,
        pricePerKm: data.pricePerKm ?? undefined,
      });
    }
  }, [data, isError, reset]);

  useEffect(() => {
    const purposeMap: Record<string, { isForRent: boolean; isForHire: boolean; isForDelivery: boolean }> = {
      rent: { isForRent: true, isForHire: false, isForDelivery: false },
      ride: { isForRent: false, isForHire: true, isForDelivery: false },
      deliver: { isForRent: false, isForHire: false, isForDelivery: true },
    };
    const purpose = purposeMap[carPurpose as keyof typeof purposeMap] ?? purposeMap.rent;
    setValue("isForRent", purpose.isForRent);
    setValue("isForHire", purpose.isForHire);
    setValue("isForDelivery", purpose.isForDelivery);
  }, [carPurpose, setValue]);

  useEffect(() => {
    setValue("images", files);
  }, [files, setValue]);

  const carPurposeOptions = [
    { label: "Ride", value: "ride", icon: <IoCarSportOutline size={24} /> },
    { label: "Deliver", value: "deliver", icon: <PiPackage size={24} /> },
    { label: "Rent", value: "rent", icon: <Car size={24} /> },
  ];

  const onSubmit = async (data: FormData) => {
    try {
      await updateCar.mutateAsync(data);
      toast.success("Car added successfully!");
      onClose();
    } catch (error) {
      const errorMessage =
        error instanceof ZodError
          ? "Invalid form data."
          : error instanceof Error
          ? error.message
          : "Failed to add car.";
      toast.error(errorMessage);
    }
  };

//   console.log("defaultValues", defaultValues)
  console.log("FormValues", formMethods.getValues())
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-4xl">
        <SheetHeader>
          <SheetTitle>Edit Car</SheetTitle>
          <SheetDescription>
            Fill out the form to edit a new car.
          </SheetDescription>
        </SheetHeader>
        <LoaderWrapper isLoading={isLoading}>
          <FormProvider {...formMethods}>
            <ScrollArea className="h-screen pb-28 pr-4">
              <form
                onSubmit={handleSubmit(onSubmit)}
                encType="multipart/form-data"
                className="space-y-4"
              >
                <div className="grid grid-cols-12 justify-center my-3 gap-4">
                  <FormField
                    name="carPurpose"
                    render={({ field }) => (
                      <FormItem className="col-span-12 max-w-lg mx-auto">
                        <FormLabel htmlFor="carPurpose">Car Purpose</FormLabel>
                        <FormControl>
                          <ToggleGroup
                            className="justify-start"
                            type="single"
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            {carPurposeOptions.map((ride) => (
                              <ToggleGroupItem
                                key={ride.value}
                                size="lg"
                                value={ride.value}
                                className="p-8"
                              >
                                <div className="flex flex-col items-center p-4 justify-center">
                                  {ride.icon}
                                  <span>{ride.label}</span>
                                </div>
                              </ToggleGroupItem>
                            ))}
                          </ToggleGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Car Details */}
                <div className="grid grid-cols-12 gap-4">
                  <FormInputField
                    name="name"
                    label="Car Name"
                    placeholder="Toyota Corolla"
                  />
                  <FormInputField
                    name="make"
                    label="Make"
                    placeholder="Toyota"
                  />
                  <FormInputField
                    name="model"
                    label="Model"
                    placeholder="Corolla"
                  />
                  <FormInputField
                    name="mileage"
                    label="Mileage (km)"
                    placeholder="20000"
                    type="number"
                  />
                  <DateManufactured
                    name="dateManufactured"
                    label="Date Manufactured"
                  />
                  <FormInputField
                    name=""
                    label="Car Owner"
                    placeholder={`${data?.owner?.firstName} ${data?.owner?.lastName}`}
                    disabled
                  />
                  <FormField
                    name="description"
                    render={({ field }) => (
                      <FormItem className="col-span-12">
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            placeholder="e.g., Air Conditioning, GPS"
                            className={cn(INPUT_CLASSNAME, "h-24")}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormInputField
                    name="color"
                    label="Color"
                    placeholder="e.g., Red, Blue, Green"
                  />
                  <FormInputField
                    name="pricePerDay"
                    label="Price Per Day"
                    placeholder="50"
                    type="number"
                  />
                  <FormInputField
                    name="pricePerKm"
                    label="Price Per Km"
                    placeholder="10"
                    type="number"
                  />
                  <FormInputField
                    name="doors"
                    label="Doors"
                    max={4}
                    min={3}
                    placeholder="4"
                    type="number"
                  />
                  <FormInputField
                    name="cylinders"
                    label="Cylinders"
                    placeholder="4"
                    max={12}
                    min={4}
                    type="number"
                  />
                  <FormInputField
                    name="engineSize"
                    label="Engine Size"
                    max={6}
                    min={3}
                    placeholder="2.0L"
                    type="number"
                  />
                  <FormField
                    name="isAvailable"
                    render={({ field }) => (
                      <FormItem className="col-span-12 sm:col-span-6 flex flex-row items-start space-x-3 mt-9">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Car Availability</FormLabel>
                          <FormDescription>
                            Check to indicate if the car is available for hire.
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>

                {/* Car Specifications */}
                <div className="grid grid-cols-12 gap-4">
                  <FormSelect
                    name="fuelType"
                    label="Fuel Type"
                    placeholder="Select Fuel Type"
                    options={[
                      { value: "petrol", label: "Petrol" },
                      { value: "diesel", label: "Diesel" },
                      { value: "gasoline", label: "Gasoline" },
                    ]}
                  />
                  <FormSelect
                    name="bodyType"
                    label="Body Type"
                    placeholder="Select Body Type"
                    options={[
                      { value: "sedan", label: "Sedan" },
                      { value: "suv", label: "SUV" },
                      { value: "truck", label: "Truck" },
                      { value: "pickup", label: "Pickup" },
                    ]}
                  />
                  <FormSelect
                    name="transmission"
                    label="Transmission"
                    placeholder="Select Transmission"
                    options={[
                      { value: "automatic", label: "Automatic" },
                      { value: "manual", label: "Manual" },
                      { value: "hybrid", label: "Hybrid" },
                    ]}
                  />
                  <FormSelect
                    name="condition"
                    label="Condition"
                    placeholder="Select Condition"
                    options={[
                      { value: "new", label: "New" },
                      { value: "used", label: "Used" },
                      { value: "reconditioned", label: "Reconditioned" },
                    ]}
                  />
                  <FormSelect
                    name="driveType"
                    label="Drive Type"
                    placeholder="Select Drive Type"
                    options={[
                      { value: "front-wheel", label: "Front-Wheel" },
                      { value: "rear-wheel", label: "Rear-Wheel" },
                      { value: "four-wheel", label: "Four-Wheel" },
                    ]}
                  />
                </div>

                {/* Image Upload */}
                <div className="grid grid-cols-12">
                  <div className="col-span-12 space-y-2">
                    <label className="block text-sm font-medium text-muted-foreground">
                      Upload Images
                    </label>
                    <FileUpload existingFiles={data?.images} onFilesChange={setFiles} />
                  </div>
                </div>

                <div className="pt-4 flex justify-end space-x-4">
                  <Button type="button" variant="outline" onClick={onClose}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={updateCar.isPending}>
                    {updateCar.isPending ? (
                      <div className="flex items-center space-x-2">
                        <Icons.spinner className="animate-spin size-6" />
                        <span>Updating...</span>
                      </div>
                    ) : (
                      "Update Car"
                    )}
                  </Button>
                </div>
              </form>
            </ScrollArea>
          </FormProvider>
        </LoaderWrapper>
      </SheetContent>
    </Sheet>
  );
};

export default EditCarSheet;
