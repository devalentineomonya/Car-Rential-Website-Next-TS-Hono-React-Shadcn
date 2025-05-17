import React from "react";
import {cn} from "@/lib/utils";
import {INPUT_CLASSNAME} from "@/utils/constants";

import DateManufactured from "./DateManufactured";
import FileUpload from "./FileUpload";
import FormInputField from "./FormInput";
import FormSelect from "./FormSelect";

import {Checkbox} from "@/components/ui/checkbox";
import {
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
    FormDescription,
} from "@/components/ui/form";

import {Textarea} from "@/components/ui/textarea";
import {IoCarSportOutline} from "react-icons/io5";
import {PiPackage} from "react-icons/pi";
import {Car} from "lucide-react";

const carPurposeOptions = [
    {label: "Ride", value: "ride", icon: <IoCarSportOutline size={24} />},
    {label: "Deliver", value: "deliver", icon: <PiPackage size={24} />},
    {label: "Rent", value: "rent", icon: <Car size={24} />},
];

interface TRenderSteps {
    currentStep: number;
    setFiles: React.Dispatch<React.SetStateAction<string[]>>;
    fullName: string;
    carPurpose: string;
}

export const renderStepContent = ({
    currentStep,
    setFiles,
    fullName,
    carPurpose,
}: TRenderSteps) => {
    switch (currentStep) {
        case 0:
            return (
                <div className="space-y-4 max-w-2xl mx-auto">
                    <FormField
                        name="carPurpose"
                        render={({field}) => (
                            <FormItem className="space-y-3 ">
                                <FormControl>
                                    <div className="space-y-2">
                                        {carPurposeOptions.map((option) => (
                                            <div
                                                key={option.value}
                                                className={`flex items-center gap-4 p-5 rounded-xl border-2 cursor-pointer transition-all ${
                                                    field.value === option.value
                                                        ? "border-gray-500 bg-gray-50"
                                                        : "border-gray-200 hover:border-gray-300 bg-white"
                                                }`}
                                                onClick={() =>
                                                    field.onChange(option.value)
                                                }
                                            >
                                                <div className="flex-shrink-0 text-gray-700">
                                                    {option.icon}
                                                </div>
                                                <span className="font-medium">
                                                    {option.label}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
            );
        case 1:
            return (
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
                        name="ownerId"
                        label="Car Owner"
                        placeholder={fullName ?? "Unknown"}
                        disabled
                    />
                    <FormField
                        name="description"
                        render={({field}) => (
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
                        name="doors"
                        label="Doors"
                        placeholder="4"
                        type="number"
                    />
                </div>
            );
        case 2:
            return (
                <div className="space-y-6">
                    {/* Service-specific pricing */}
                    <div className="grid grid-cols-12 gap-4">
                        {carPurpose === "rent" ? (
                            <FormInputField
                                name="pricePerDay"
                                label="Price Per Day"
                                placeholder="50"
                                type="number"
                            />
                        ) : (
                            <FormInputField
                                name="pricePerKm"
                                label="Price Per Km"
                                placeholder="10"
                                type="number"
                            />
                        )}
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
                            render={({field}) => (
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
                                            Check to indicate if the car is
                                            available for hire.
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
                                {value: "petrol", label: "Petrol"},
                                {value: "diesel", label: "Diesel"},
                                {value: "gasoline", label: "Gasoline"},
                            ]}
                        />
                        <FormSelect
                            name="bodyType"
                            label="Body Type"
                            placeholder="Select Body Type"
                            options={[
                                {value: "sedan", label: "Sedan"},
                                {value: "suv", label: "SUV"},
                                {value: "truck", label: "Truck"},
                                {value: "pickup", label: "Pickup"},
                            ]}
                        />
                        <FormSelect
                            name="transmission"
                            label="Transmission"
                            placeholder="Select Transmission"
                            options={[
                                {value: "automatic", label: "Automatic"},
                                {value: "manual", label: "Manual"},
                                {value: "hybrid", label: "Hybrid"},
                            ]}
                        />
                        <FormSelect
                            name="condition"
                            label="Condition"
                            placeholder="Select Condition"
                            options={[
                                {value: "new", label: "New"},
                                {value: "used", label: "Used"},
                                {
                                    value: "reconditioned",
                                    label: "Reconditioned",
                                },
                            ]}
                        />
                        <FormSelect
                            name="driveType"
                            label="Drive Type"
                            placeholder="Select Drive Type"
                            options={[
                                {
                                    value: "front-wheel",
                                    label: "Front-Wheel",
                                },
                                {value: "rear-wheel", label: "Rear-Wheel"},
                                {value: "four-wheel", label: "Four-Wheel"},
                            ]}
                        />
                    </div>
                </div>
            );
        case 3:
            return (
                <div className="grid grid-cols-12">
                    <div className="col-span-12 space-y-2">
                        <label className="block text-sm font-medium text-muted-foreground">
                            Upload Images
                        </label>
                        <FileUpload onFilesChange={setFiles} />
                    </div>
                </div>
            );
        default:
            return null;
    }
};
