import { Input } from "@/components/ui/input";
import {
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {  IoMdNavigate } from "react-icons/io";
import { useFormContext } from "react-hook-form";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const HeroFormInputField = ({
  indicator,
  placeholder,
  error,
  name,
  icon,
}: {
  indicator?: boolean;
  placeholder: string;
  name: string;
  error?: string;
  icon: React.ReactNode;
}) => {
  const form = useFormContext();
 

  const handleLocationRequest = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log("Location:", { latitude, longitude });
        },
        (error) => {
          console.error("Location error:", error);
        }
      );
    } else {
      toast.error("Geolocation is not supported by this browser.");
    }
  };

  return (
    <FormItem className="space-y-1">
      <FormLabel htmlFor={name} className="sr-only">
        {placeholder}
      </FormLabel>
      <FormControl>
        <div className="relative h-full flex items-center bg-white/5  border dark:border-input px-3 rounded-md focus-within:outline-none focus-within:ring-1 focus-within:ring-ring">
          {icon}
          <Input
            id={name}
            {...form.register(name)}
            autoComplete="off"
            className="text-foreground text-base h-11 border-none bg-transparent w-full outline-none focus-visible:ring-0"
            placeholder={placeholder}
          />

      
            <IoMdNavigate
              size={20}
              className= {cn("cursor-pointer",!indicator && "rotate-180")} 
              onClick={handleLocationRequest}
            />
        

          {indicator && (
            <span className="h-12 w-0.5 bg-foreground absolute top-9 z-10 ml-1.5"></span>
          )}
        </div>
      </FormControl>
      {error && <FormMessage>{error}</FormMessage>}
    </FormItem>
  );
};

export default HeroFormInputField;
