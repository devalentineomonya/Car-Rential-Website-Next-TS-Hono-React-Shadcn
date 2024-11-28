import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { insertCarSchema } from "@/db/schema";
import { useNewCar } from "@/hooks/use-new-car";
import { FileUploader } from "@/components/ui/file-uploader";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useUser } from "@clerk/nextjs";
import { IoCarSportOutline } from "react-icons/io5";
import { PiPackage } from "react-icons/pi";
import { Car } from "lucide-react";
import DateManufactured from "./DateManufactured";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { INPUT_CLASSNAME } from "@/utils/constants";
import { cn } from "@/lib/utils";
// Reusable form input component
const FormInputField = ({
  name,
  label,
  placeholder,
  type = "text",
  disabled = false,
}: {
  name: string;
  label: string;
  placeholder: string;
  type?: string;
  disabled?: boolean;
}) => {
  const { control } = useFormContext();

 

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="col-span-12 sm:col-span-6">
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              {...field}
              placeholder={placeholder}
              type={type}
              className={INPUT_CLASSNAME}
              disabled={disabled}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

const AddCarSheet: React.FC = () => {
  const { isOpen, onClose } = useNewCar();
  const { user } = useUser();
  const [files, setFiles] = React.useState<File[]>([]);


  const dynamicSchema = z.object({
    ...insertCarSchema.shape,
    pricePerDay: z
      .number()
      .min(1)
      .optional()
      .refine((value, ctx) => {
        if (ctx.data.isForRent && value === undefined) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Price per day is required when car is available for rent",
            path: ["pricePerDay"]
          });
        }
      }),
    pricePerKm: z
      .number()
      .min(1)
      .optional()
      .refine((value, ctx) => {
        if ((ctx.data.isForHire || ctx.data.isForDelivery) && value === undefined) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Price per km is required when car is available for hire or delivery",
            path: ["pricePerKm"]
          });
        }
      })
  });

  
  const formMethods = useForm<z.infer<typeof dynamicSchema>>({
    resolver: zodResolver(dynamicSchema),
    defaultValues: {},
  });

  const { handleSubmit } = formMethods;

  const carPurpose = [
    { label: "Ride", value: "ride", icon: <IoCarSportOutline size={24} /> },
    { label: "Deliver", value: "deliver", icon: <PiPackage size={24} /> },
    { label: "Rent", value: "rent", icon: <Car size={24} /> },
  ];

  const onSubmit = (data: z.infer<typeof insertCarSchema>) => {
    toast.success("Car added successfully!");
    toast.info(
      <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
        <code className="text-white">{JSON.stringify(data, null, 2)}</code>
      </pre>
    );
    onClose(); // Close the form on submit
  };

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
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <ScrollArea className="h-screen pb-28">
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
                  label="Date Manufactured"
                  name="dateManufactured"
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
              </div>

              <div className="grid grid-cols-12 gap-4">
                <FormField
                  name="fuelType"
                  render={({ field }) => (
                    <FormItem className="col-span-12 sm:col-span-6">
                      <FormLabel>Fuel Type</FormLabel>
                      <FormControl>
                        <Select {...field}>
                          <SelectTrigger className={INPUT_CLASSNAME}>
                            <SelectValue placeholder="Fuel Type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="petrol">Petrol</SelectItem>
                            <SelectItem value="diesel">Diesel</SelectItem>
                            <SelectItem value="gasoline">Gasoline</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="bodyType"
                  render={({ field }) => (
                    <FormItem className="col-span-12 sm:col-span-6">
                      <FormLabel>Body Type</FormLabel>
                      <FormControl>
                        <Select {...field}>
                          <SelectTrigger className={INPUT_CLASSNAME}>
                            <SelectValue placeholder="Body Type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="sedan">Sedan</SelectItem>
                            <SelectItem value="suv">SUV</SelectItem>
                            <SelectItem value="hatchback">Hatchback</SelectItem>
                            <SelectItem value="wagon">Wagon</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="condition"
                  render={({ field }) => (
                    <FormItem className="col-span-12 sm:col-span-6">
                      <FormLabel>Condition</FormLabel>
                      <FormControl>
                        <Select {...field}>
                          <SelectTrigger className={INPUT_CLASSNAME}>
                            <SelectValue placeholder="Condition" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="new">New</SelectItem>
                            <SelectItem value="refurbished">
                              Refurbished
                            </SelectItem>
                            <SelectItem value="used">Used</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="transmission"
                  render={({ field }) => (
                    <FormItem className="col-span-12 sm:col-span-6">
                      <FormLabel>Transmission</FormLabel>
                      <FormControl>
                        <Select {...field}>
                          <SelectTrigger className={INPUT_CLASSNAME}>
                            <SelectValue placeholder="Transmission" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="automatic">Automatic</SelectItem>
                            <SelectItem value="manual">Manual</SelectItem>
                            <SelectItem value="hybrid">Hybrid</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormInputField
                  name="engineSize"
                  label="Engine Size"
                  placeholder="2.0L"
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
                <FormField
                  name="isAvailable"
                  render={({ field }) => (
                    <FormItem className="col-span-12 sm:col-span-6 flex flex-row items-start space-x-3 space-y-0 mt-9 ">
                      <FormControl>
                        <Checkbox {...field} />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Car availability</FormLabel>
                        <FormDescription>
                          Check to indicate if the car is available for hire
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  name="carPurpose"
                  render={({ field }) => (
                    <ToggleGroup
                      className="justify-start"
                      type="single"
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      {carPurpose.map((ride) => (
                        <ToggleGroupItem key={ride.value} value={ride.value}>
                          <div className="flex flex-col items-center">
                            {ride.icon}
                            <span>{ride.label}</span>
                          </div>
                        </ToggleGroupItem>
                      ))}
                    </ToggleGroup>
                  )}
                />
              </div>

              <div className="col-span-12">
                <FileUploader
                  maxFileCount={8}
                  maxSize={8 * 1024 * 1024}
                  onValueChange={setFiles}
                />
                <Button variant="outline">
                  Upload files {files.length > 0 && `(${files.length})`}
                </Button>
              </div>

              <Button type="submit">Add Car</Button>
            </ScrollArea>
          </form>
        </FormProvider>
      </SheetContent>
    </Sheet>
  );
};

export default AddCarSheet;
