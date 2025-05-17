"use client";

import {useUser} from "@clerk/nextjs";
import {zodResolver} from "@hookform/resolvers/zod";
import {Car, ChevronLeft, ChevronRight} from "lucide-react";
import type React from "react";
import {useEffect, useState, useMemo} from "react";
import {useForm, FormProvider} from "react-hook-form";

import {toast} from "sonner";
import {z, ZodError} from "zod";

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

    const formMethods = useForm<z.infer<typeof insertCarSchema>>({
        resolver: zodResolver(insertCarSchema),
        defaultValues,
        mode: "onChange",
    });

    const {
        handleSubmit,
        watch,
        setValue,
        trigger,
        formState: {errors},
    } = formMethods;
    const carPurpose = watch("carPurpose" as const);

    useEffect(() => {
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
        setValue("isForRent", purpose.isForRent);
        setValue("isForHire", purpose.isForHire);
        setValue("isForDelivery", purpose.isForDelivery);
    }, [carPurpose, setValue]);

    useEffect(() => {
        setValue("images", files);
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
                if (carPurpose === "rent") {
                    return await trigger([
                        "pricePerDay",
                        "fuelType",
                        "bodyType",
                        "transmission",
                        "condition",
                        "driveType",
                        "doors",
                        "cylinders",
                        "engineSize",
                    ]);
                } else {
                    return await trigger([
                        "pricePerKm",
                        "fuelType",
                        "bodyType",
                        "transmission",
                        "condition",
                        "driveType",
                        "doors",
                        "cylinders",
                        "engineSize",
                    ]);
                }
            case 3:
                return true;
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
        console.log(data);
        try {
            setIsSubmitting(true);
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
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Sheet open={true} onOpenChange={onClose}>
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
                    <ScrollArea className="min-h-screen max-h-screen pb-28 pr-4 flex flex-col justify-center items-center">
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                console.dir(errors, {depth: null});
                                return console.dir(formMethods.getValues(), {
                                    depth: null,
                                });
                            }}
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
                                                isSubmitting || addCar.isPending
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
