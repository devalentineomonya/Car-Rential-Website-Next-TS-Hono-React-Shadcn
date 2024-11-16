"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import HeroFormRideSelect from "./HeroFormRideSelect";
import HeroFormInputField from "./HeroFormInputField";
import HeroFormDateTimePicker from "./HeroFormDateTimePicker";
import { GoDotFill } from "react-icons/go";
import { IoMdSquare } from "react-icons/io";
import { Form } from "@/components/ui/form";
import { heroFormSchema } from "./HeroFormUtils";

const HeroForm = ({ setRide }: { setRide: (ride: string) => void }) => {
  const form = useForm<z.infer<typeof heroFormSchema>>({
    resolver: zodResolver(heroFormSchema),
    defaultValues: {
      type: "ride",
    },
  });

  const [selectedRide, setSelectedRide] = useState<string>("ride");

  // Track state for each date picker
  const [pickUpDate, setPickUpDate] = useState<Date | null>(null);
  const [pickUpTime, setPickUpTime] = useState<string>("05:00");
  const [rentFromDate, setRentFromDate] = useState<Date | null>(null);
  const [rentFromTime, setRentFromTime] = useState<string>("09:00");
  const [rentToDate, setRentToDate] = useState<Date | null>(null);
  const [rentToTime, setRentToTime] = useState<string>("18:00");

  // Helper function to combine date and time
  const combineDateAndTime = (date: Date | null, time: string) => {
    if (!date) return null;
    const [hours, minutes] = time.split(":").map(Number);
    const updatedDate = new Date(date);
    updatedDate.setHours(hours, minutes, 0, 0);
    return updatedDate;
  };
console.log(form.formState.errors)

  const onSubmit = async (data: z.infer<typeof heroFormSchema>) => {
    try {
      const pickUpDateTime = combineDateAndTime(pickUpDate, pickUpTime);
      const rentFromDateTime = combineDateAndTime(rentFromDate, rentFromTime);
      const rentToDateTime = combineDateAndTime(rentToDate, rentToTime);
  
      if (selectedRide === "ride") {
        data.pickUpDateTime = pickUpDateTime ?? undefined;
      } else if (selectedRide === "rent") {
        data.rentFromDateTime = rentFromDateTime ?? undefined;
        data.rentToDateTime = rentToDateTime ?? undefined;
      }
  
      if (selectedRide === "ride" || selectedRide === "deliver") {
        data.from = data.from ?? undefined;
        data.to = data.to ?? undefined;
      }
  
      console.log("Form Data:", data);
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <HeroFormRideSelect
          selectedRide={selectedRide}
          onSelectRide={(ride) => {
            setSelectedRide(ride);
            form.setValue("type", ride as "ride" | "rent" | "deliver");
            setRide(ride);
          }}
        />

        {selectedRide !== "rent" && (
          <>
            <HeroFormInputField
              name="from"
              placeholder={
                selectedRide === "ride" ? "Ride From" : "Deliver From"
              }
              indicator
              icon={<GoDotFill size={20} />}
            />
            <HeroFormInputField
              name="to"
              placeholder={selectedRide === "ride" ? "Ride To" : "Deliver To"}
              icon={<IoMdSquare size={14} />}
            />
          </>
        )}

        {selectedRide === "ride" && (
          <HeroFormDateTimePicker
            placeholder="Pick-up Date & Time"
            selectedDate={pickUpDate}
            onDateChange={setPickUpDate}
            time={pickUpTime}
            onTimeChange={setPickUpTime}
          />
        )}

        {selectedRide === "rent" && (
          <>
            <HeroFormDateTimePicker
              placeholder="Rent From"
              selectedDate={rentFromDate}
              onDateChange={setRentFromDate}
              time={rentFromTime}
              onTimeChange={setRentFromTime}
            />
            <HeroFormDateTimePicker
              placeholder="Rent To"
              selectedDate={rentToDate}
              onDateChange={setRentToDate}
              time={rentToTime}
              onTimeChange={setRentToTime}
            />
          </>
        )}

        <button type="submit">Submit</button>
      </form>
    </Form>
  );
};

export default HeroForm;
