import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@radix-ui/react-popover";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import cn from "classnames";

const HeroFormDateTimePicker = ({
  selectedDate,
  placeholder,
  onDateChange,
  time,
  onTimeChange,
}: {
  selectedDate: Date | null;
  onDateChange: (date: Date) => void;
  time: string;
  placeholder: string;
  onTimeChange: (time: string) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [date, setDate] = useState<Date | null>(selectedDate);
  const [currentTime, setTime] = useState<string>(time);

  return (
    <FormField
      name="datetime"
      render={({ field }) => (
        <FormItem className="flex items-center gap-x-3">
          <FormLabel className="sr-only">Date & Time</FormLabel>
          <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
              <FormControl
                className="relative h-11 flex-1 items-center bg-white/5 border border-input
                px-3 rounded-md focus-within:outline-none focus-within:ring-1 focus-within:ring-ring"
              >
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full font-normal",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {field.value ? (
                    `${format(field.value, "PPP")}, ${currentTime}`
                  ) : (
                    <span>{placeholder}</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent
              className=" p-0 flex items-star bg-background border border-input rounded-md"
              align="start"
            >
              <Calendar
                mode="single"
                captionLayout="dropdown"
                selected={date || field.value}
                onSelect={(selectedDate) => {
                  if (selectedDate) {
                    const [hours, minutes] = currentTime.split(":").map(Number);
                    selectedDate.setHours(hours, minutes);
                    setDate(selectedDate);
                    field.onChange(selectedDate);
                    onDateChange(selectedDate);
                  }
                }}
                onDayClick={() => setIsOpen(false)}
                fromYear={2000}
                disabled={(date) =>
                  date < new Date() ||
                  date > new Date(new Date().setDate(new Date().getDate() + 30))
                }
              />
            </PopoverContent>
          </Popover>

          <Select
            defaultValue={currentTime}
            onValueChange={(newTime) => {
              setTime(newTime);
              if (date) {
                const [hours, minutes] = newTime.split(":").map(Number);
                const updatedDate = new Date(date);
                updatedDate.setHours(hours, minutes);
                setDate(updatedDate);
                field.onChange(updatedDate);
                onTimeChange(newTime);
              }
            }}
          >
            <SelectTrigger
              className="relative h-11 flex-1 items-center bg-white/5 border
             border-input px-3 rounded-md focus-within:outline-none focus-within:ring-1
              focus-within:ring-ring"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="border-none shadow-none mr-2">
              <ScrollArea className="h-[15rem]">
                {Array.from({ length: 96 }).map((_, i) => {
                  const hour = Math.floor(i / 4)
                    .toString()
                    .padStart(2, "0");
                  const minute = ((i % 4) * 15).toString().padStart(2, "0");
                  return (
                    <SelectItem key={i} value={`${hour}:${minute}`}>
                      {hour}:{minute}
                    </SelectItem>
                  );
                })}
              </ScrollArea>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default HeroFormDateTimePicker;
