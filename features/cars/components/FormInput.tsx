import { useFormContext } from "react-hook-form";

import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { INPUT_CLASSNAME } from "@/utils/constants";


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
            <FormLabel htmlFor={name}>{label}</FormLabel>
            <FormControl>
              <Input
                id={name}
                {...field}
                placeholder={placeholder}
                type={type}
                className={INPUT_CLASSNAME}
                disabled={disabled}
                onChange={(e) => {
                  if (type === "number") {
                    field.onChange(e.target.valueAsNumber);
                  } else {
                    field.onChange(e.target.value);
                  }
                }}
                
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    );
};
export default FormInputField;
