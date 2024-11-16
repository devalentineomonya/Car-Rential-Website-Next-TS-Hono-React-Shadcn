import { Input } from "@/components/ui/input";
import { FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { IoMdCloseCircle } from "react-icons/io";
import { useFormContext } from "react-hook-form";

const HeroFormInputField = ({
    indicator,
    placeholder,
    name,
    icon,
  }: {
    indicator?: boolean;
    placeholder: string;
    name: string;
    icon: React.ReactNode;
  }) => {
    const form = useFormContext();
  
    return (
      <FormItem>
        <FormLabel htmlFor={name} className="sr-only">{placeholder}</FormLabel>
        <FormControl>
          <div className="relative h-full flex items-center bg-white/5 border border-input px-3 rounded-md focus-within:outline-none focus-within:ring-1 focus-within:ring-ring">
            {icon}
            <Input
            id={name}
              {...form.register(name)} 
              autoComplete="off"
              className="text-foreground text-base h-11 border-none bg-transparent w-full outline-none focus-visible:ring-0"
              placeholder={placeholder}
            />
            <IoMdCloseCircle size={20} className="cursor-pointer" />
            {indicator && <span className="h-12 w-0.5 bg-foreground absolute top-9 z-10 ml-1.5"></span>}
          </div>
        </FormControl>
        <FormMessage  />
      </FormItem>
    );
  };
  

export default HeroFormInputField;
