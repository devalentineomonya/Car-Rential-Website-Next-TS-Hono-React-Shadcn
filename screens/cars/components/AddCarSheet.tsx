"use client";

import {useUser} from "@clerk/nextjs";
import {zodResolver} from "@hookform/resolvers/zod";
import {ChevronLeft, ChevronRight} from "lucide-react";
import type React from "react";
import {useEffect, useState, useMemo} from "react";
import {useForm, FormProvider} from "react-hook-form";

import {toast} from "sonner";
import {type z, ZodError} from "zod";

import {Button} from "@/components/ui/button";

import {Icons} from "@/components/ui/icons";
import {ScrollArea} from "@/components/ui/scroll-area";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";

import {insertCarSchema} from "@/db/schema";
import {useAddCar} from "@/features/cars/api/use-add-car";
import {useNewCar} from "@/hooks/use-new-car";
import {renderStepContent} from "./rendersteps";
import Stepper from "./Stepper";

const STEPS = [
    "Car Purpose",
    "Vehicle Details",
    "Features",
    "Pricing & Specs",
    "Media Upload",
];

const AddCarSheet: React.FC = () => {
    const {isOpen, onClose} = useNewCar();
    const {user} = useUser();
    const addCar = useAddCar();
    const [files, setFiles] = useState<string[]>([]);
    const [currentStep, setCurrentStep] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [stepCompleted, setStepCompleted] = useState<boolean[]>([
        false,
        false,
        false,
        false,
        false,
    ]);

    const defaultValues = useMemo(
        () => ({
            ownerId: user?.id ?? "",
            isForRent: false,
            isForHire: false,
            isForDelivery: false,
            isAvailable: true,
        }),
        [user],
    );

    type FormData = z.infer<typeof insertCarSchema>;

    const formMethods = useForm<FormData>({
        resolver: zodResolver(insertCarSchema),
        defaultValues,
        mode: "onChange",
    });

    const {
        handleSubmit,
        watch,
        setValue,
        trigger,
        formState: {errors, isValid},
    } = formMethods;
    const carPurpose = watch("carPurpose" as const);
    console.log("Errors", errors);
    console.log("Values", formMethods.getValues());
    console.log("Is Valid", formMethods.formState.isValid);

    useEffect(() => {
        if (!carPurpose) return;
        const purposeMap = {
            rent: {isForRent: true, isForHire: false, isForDelivery: false},
            ride: {isForRent: false, isForHire: true, isForDelivery: false},
            deliver: {
                isForRent: false,
                isForHire: false,
                isForDelivery: true,
            } as const,
        } as const;
        const purpose =
            purposeMap[carPurpose as keyof typeof purposeMap] ??
            (purposeMap.rent as {
                isForRent: boolean;
                isForHire: boolean;
                isForDelivery: boolean;
            });
        setValue("isForRent", purpose.isForRent, {shouldDirty: false});
        setValue("isForHire", purpose.isForHire, {shouldDirty: false});
        setValue("isForDelivery", purpose.isForDelivery, {shouldDirty: false});
    }, [carPurpose, setValue]);

    useEffect(() => {
        setValue("images", files, {shouldValidate: true});
    }, [files, setValue]);

    const validateStep = async (step: number): Promise<boolean> => {
        switch (step) {
            case 0:
                return await trigger(["carPurpose"]);
            case 1:
                return await trigger([
                    "name",
                    "make",
                    "model",
                    "mileage",
                    "dateManufactured",
                    "description",
                    "color",
                ]);
            case 2:
                return true;
            case 3:
                const baseFields: Array<keyof z.infer<typeof insertCarSchema>> =
                    [
                        "fuelType",
                        "bodyType",
                        "transmission",
                        "condition",
                        "driveType",
                        "doors",
                        "cylinders",
                        "engineSize",
                    ];
                if (carPurpose === "rent") {
                    return await trigger(["pricePerDay", ...baseFields]);
                } else {
                    return await trigger(["pricePerKm", ...baseFields]);
                }
            case 4:
                return await trigger("images");
            default:
                return false;
        }
    };

    const handleNext = async () => {
        const isValid = await validateStep(currentStep);

        if (isValid) {
            const newCompleted = [...stepCompleted];
            newCompleted[currentStep] = true;
            setStepCompleted(newCompleted);
            setCurrentStep((prev) => Math.min(prev + 1, STEPS.length - 1));
        } else {
            toast.error(
                `Please complete all required fields in ${STEPS[currentStep]}`,
            );
        }
    };

    const handlePrevious = () => {
        setCurrentStep((prev) => Math.max(prev - 1, 0));
    };

    const onSubmit = async (data: z.infer<typeof insertCarSchema>) => {
        try {
            setIsSubmitting(true);

            const filteredFeatures = Array.isArray(data.features)
                ? data.features.filter(Boolean)
                : [];
            const carData = {
                ...data,
                features:
                    filteredFeatures.length > 0 ? filteredFeatures : undefined,
            };

            await addCar.mutateAsync(carData);
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
        } finally {
            setIsSubmitting(false);
        }
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
                    <Stepper
                        steps={STEPS}
                        currentStep={currentStep}
                        completedSteps={stepCompleted}
                    />
                    <ScrollArea className="pb-28 pr-4">
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            encType="multipart/form-data"
                            className="space-y-4"
                        >
                            <div className="min-h-[400px] transition-all duration-300 ease-in-out">
                                {renderStepContent({
                                    setFiles,
                                    carPurpose,
                                    fullName: user?.fullName ?? "",
                                    currentStep,
                                })}
                            </div>

                            <div className="pt-4 flex justify-between space-x-4">
                                <div>
                                    {currentStep > 0 && (
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={handlePrevious}
                                            className="flex items-center"
                                        >
                                            <ChevronLeft className="mr-2 h-4 w-4" />
                                            Previous
                                        </Button>
                                    )}
                                </div>
                                <div className="flex space-x-2">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={onClose}
                                    >
                                        Cancel
                                    </Button>

                                    {currentStep < STEPS.length - 1 ? (
                                        <Button
                                            type="button"
                                            onClick={handleNext}
                                            className="flex items-center"
                                        >
                                            Next
                                            <ChevronRight className="ml-2 h-4 w-4" />
                                        </Button>
                                    ) : (
                                        <Button
                                            type="submit"
                                            disabled={
                                                isSubmitting ||
                                                addCar.isPending ||
                                                !isValid
                                            }
                                        >
                                            {isSubmitting ||
                                            addCar.isPending ? (
                                                <div className="flex items-center space-x-2">
                                                    <Icons.spinner className="animate-spin size-6" />
                                                    <span>Adding...</span>
                                                </div>
                                            ) : (
                                                "Add Car"
                                            )}
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </form>
                    </ScrollArea>
                </FormProvider>
            </SheetContent>
        </Sheet>
    );
};

export default AddCarSheet;
