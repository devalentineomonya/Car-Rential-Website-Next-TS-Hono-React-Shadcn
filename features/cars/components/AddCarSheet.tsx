import { useUser } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { Car } from "lucide-react";
import React, { useEffect, useState, useMemo } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { IoCarSportOutline } from "react-icons/io5";
import { PiPackage } from "react-icons/pi";
import { toast } from "sonner";
import { z, ZodError } from "zod";

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
import { useNewCar } from "@/hooks/use-new-car";
import { cn } from "@/lib/utils";
import { useAddCar } from "@/state/cars/api/use-add-car";
import { INPUT_CLASSNAME } from "@/utils/constants";

import DateManufactured from "./DateManufactured";
import FileUpload from "./FileUpload";
import FormInputField from "./FormInput";
import FormSelect from "./FormSelect";
import { Icons } from "@/components/ui/icons";

const AddCarSheet: React.FC = () => {
  const { isOpen, onClose } = useNewCar();
  const { user } = useUser();
  const addCar = useAddCar();
  const [files, setFiles] = useState<string[]>([]);
  const defaultValues = useMemo(
    () => ({
      ownerId: user?.id ?? "",
      isForRent: false,
      isForHire: false,
      isForDelivery: false,
      isAvailable: true,
    }),
    [user]
  );

  const formMethods = useForm<z.infer<typeof dynamicSchema>>({
    resolver: zodResolver(dynamicSchema),
    defaultValues,
  });

  const { handleSubmit, watch, setValue } = formMethods;
  const carPurpose = watch("carPurpose");

  useEffect(() => {
    const purposeMap = {
      rent: { isForRent: true, isForHire: false, isForDelivery: false },
      ride: { isForRent: false, isForHire: true, isForDelivery: false },
      deliver: { isForRent: false, isForHire: false, isForDelivery: true },
    } as const;
    const purpose =
      purposeMap[carPurpose as keyof typeof purposeMap] ?? purposeMap.rent;
    setValue("isForRent", purpose.isForRent);
    setValue("isForHire", purpose.isForHire);
    setValue("isForDelivery", purpose.isForDelivery);
  }, [carPurpose, setValue]);

  const carPurposeOptions = [
    { label: "Ride", value: "ride", icon: <IoCarSportOutline size={24} /> },
    { label: "Deliver", value: "deliver", icon: <PiPackage size={24} /> },
    { label: "Rent", value: "rent", icon: <Car size={24} /> },
  ];

  useEffect(() => {
    setValue("images", files);
  }, [files, setValue]);

  const onSubmit = async (data: z.infer<typeof dynamicSchema>) => {
    try {
      await addCar.mutateAsync(data);
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
  console.log(formMethods.getValues());
  console.log(formMethods.formState.errors);
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-4xl">
        <SheetHeader>
          <SheetTitle>Add Car</SheetTitle>
          <SheetDescription>
            Fill out the form to add a new car.
          </SheetDescription>
        </SheetHeader>

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
                <FormInputField name="make" label="Make" placeholder="Toyota" />
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
                  name="ownerId"
                  label="Car Owner"
                  placeholder={user?.fullName ?? "Unknown"}
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
                  placeholder="4"
                  type="number"
                />
                <FormInputField
                  name="cylinders"
                  label="Cylinders"
                  placeholder="4"
                  type="number"
                />
                <FormInputField
                  name="engineSize"
                  label="Engine Size"
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
                  <FileUpload onFilesChange={setFiles} />
                </div>
              </div>

              <div className="pt-4 flex justify-end space-x-4">
                <Button type="button" variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button type="submit" disabled={addCar.isPending}>
                  {addCar.isPending ?(
                    <div className="flex items-center space-x-2">
                      <Icons.spinner className="animate-spin size-6" />
                      <span>Adding...</span>
                    </div>
                  ) : (
                    "Add Car"
                  )}
                </Button>
              </div>
            </form>
          </ScrollArea>
        </FormProvider>
      </SheetContent>
    </Sheet>
  );
};

export default AddCarSheet;
