"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { GoDotFill } from "react-icons/go";
import { IoMdSquare } from "react-icons/io";
import { IoNavigate } from "react-icons/io5";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import { heroFormSchema } from "../widgets/hero/HeroFormUtils";

import HeroFormDateTimePicker from "./HeroFormDateTimePicker";
import HeroFormInputField from "./HeroFormInputField";
import HeroFormRideSelect from "./HeroFormRideSelect";






const HeroForm = ({ setRide }: { setRide: (ride: string) => void }) => {
  const form = useForm<z.infer<typeof heroFormSchema>>({
    resolver: zodResolver(heroFormSchema),
    defaultValues: {
      type: "ride",
    },
  });

  const [selectedRide, setSelectedRide] = useState<string>("ride");
  const [pickUpDate, setPickUpDate] = useState<Date | null>(null);
  const [pickUpTime, setPickUpTime] = useState<string>("05:00");
  const [rentFromDate, setRentFromDate] = useState<Date | null>(null);
  const [rentFromTime, setRentFromTime] = useState<string>("09:00");
  const [rentToDate, setRentToDate] = useState<Date | null>(null);
  const [rentToTime, setRentToTime] = useState<string>("18:00");

  const combineDateAndTime = (date: Date | null, time: string) => {
    if (!date) return null;
    const [hours, minutes] = time.split(":").map(Number);
    const updatedDate = new Date(date);
    updatedDate.setHours(hours, minutes, 0, 0);
    return updatedDate;
  };
  console.log(form.formState.errors);

  const onSubmit = async (data: z.infer<typeof heroFormSchema>) => {
    try {
      const pickUpDateTime = combineDateAndTime(pickUpDate, pickUpTime);
      const rentFromDateTime = combineDateAndTime(rentFromDate, rentFromTime);
      const rentToDateTime = combineDateAndTime(rentToDate, rentToTime);

      const errors: { [key: string]: { message: string } } = {};

      if (
        (selectedRide === "ride" || selectedRide === "deliver") &&
        !data.from
      ) {
        errors.from = { message: "Pick-up location is required." };
      }

      if ((selectedRide === "ride" || selectedRide === "deliver") && !data.to) {
        errors.to = { message: "Drop-off location is required." };
      }

      if (selectedRide === "ride" && !pickUpDateTime) {
        errors.pickUpDateTime = {
          message: "Pick-up date and time are required.",
        };
      }

      if (selectedRide === "rent" && !rentFromDateTime) {
        errors.rentFromDateTime = {
          message: "Rent from date and time are required.",
        };
      }

      if (selectedRide === "rent" && !rentToDateTime) {
        errors.rentToDateTime = {
          message: "Rent to date and time are required.",
        };
      }

      if (
        selectedRide === "rent" &&
        rentFromDateTime &&
        rentToDateTime &&
        rentFromDateTime >= rentToDateTime
      ) {
        errors.rentToDateTime = {
          message: "Rent 'to' date/time must be after 'from' date/time.",
        };
      }

      if (Object.keys(errors).length > 0) {
        for (const [field, error] of Object.entries(errors)) {
          form.setError(field as keyof typeof data, {
            type: "manual",
            message: error.message,
          });
        }
        return;
      }

      if (selectedRide === "ride") {
        data.pickUpDateTime = pickUpDateTime ?? undefined;
      } else if (selectedRide === "rent") {
        data.rentFromDateTime = rentFromDateTime ?? undefined;
        data.rentToDateTime = rentToDateTime ?? undefined;
      }

      console.log("Form Data:", data);
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
            error={form.formState.errors.from?.message}
              name="from"
              placeholder={
                selectedRide === "ride" ? "Ride From" : "Deliver From"
              }
              indicator
              icon={<GoDotFill size={20} />}
            />
            <HeroFormInputField
            error={form.formState.errors.to?.message}
              name="to"
              placeholder={selectedRide === "ride" ? "Ride To" : "Deliver To"}
              icon={<IoMdSquare size={14} />}
            />
          </>
        )}

        {selectedRide === "ride" && (
          <HeroFormDateTimePicker
          error={form.formState.errors.pickUpDateTime?.message}
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
            error={form.formState.errors.rentFromDateTime?.message}
              placeholder="Rent From"
              selectedDate={rentFromDate}
              onDateChange={setRentFromDate}
              time={rentFromTime}
              onTimeChange={setRentFromTime}
            />
            <HeroFormDateTimePicker
            error={form.formState.errors.rentToDateTime?.message}
              placeholder="Rent To"
              selectedDate={rentToDate}
              onDateChange={setRentToDate}
              time={rentToTime}
              onTimeChange={setRentToTime}
            />
          </>
        )}

        <Button size="lg" type="submit" className="group font-medium flex items-center gap-x-2">
          <span>See Pricing</span>
          <IoNavigate className="group-hover:translate-x-3 group-hover:-translate-y-2 transition-all ease-in-out duration-300"/>
        </Button>
    
      </form>
    </Form>
  );
};

export default HeroForm;
