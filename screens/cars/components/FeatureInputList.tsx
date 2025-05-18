"use client";
import {useEffect} from "react";
import {Trash2, Plus} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
    FormDescription,
} from "@/components/ui/form";
import {INPUT_CLASSNAME} from "@/utils/constants";
import {cn} from "@/lib/utils";
import {useFieldArray, useFormContext} from "react-hook-form";

const FeatureInputList = () => {
    const {control, register} = useFormContext();

    const {fields, append, remove} = useFieldArray({
        control,
        name: "features",
    });

    useEffect(() => {
        if (fields.length === 0) {
            append("");
        }
    }, [fields, append]);

    const handleAddFeature = () => append("");

    const handleRemoveFeature = (index: number) => {
        // Don't remove the last field if it's the only one
        if (fields.length > 1) {
            remove(index);
        }
    };

    return (
        <FormField
            control={control}
            name="features"
            render={() => (
                <FormItem>
                    <FormLabel>Car Features</FormLabel>
                    <FormDescription>
                        Add features that make your car stand out, such as GPS,
                        leather seats, sunroof, etc.
                    </FormDescription>
                    <FormControl>
                        <div className="space-y-3">
                            {fields.map((item, index) => (
                                <div
                                    key={item.id}
                                    className="flex items-center gap-2"
                                >
                                    <Input
                                        {...register(`features.${index}`)}
                                        placeholder="Enter car feature"
                                        className={cn(
                                            INPUT_CLASSNAME,

                                        )}
                                    />
                                    <Button
                                        type="button"
                                        variant="destructive"
                                        size="icon"
                                        className="h-11 w-11"
                                        onClick={() =>
                                            handleRemoveFeature(index)
                                        }
                                        disabled={fields.length === 1}
                                    >
                                        <Trash2 className="h-5 w-5" />
                                    </Button>
                                </div>
                            ))}

                            <Button
                                type="button"
                                variant="outline"
                                onClick={handleAddFeature}
                                className="mt-2 flex items-center gap-2"
                            >
                                <Plus className="h-4 w-4" />
                                Add Feature
                            </Button>
                        </div>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default FeatureInputList;
