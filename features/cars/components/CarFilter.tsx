"use client";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FiPlus } from "react-icons/fi";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  filterOptions,
  colors,
  categories,
  models,
  makes,
  fuelTypes,
  drivetrains,
} from "./carFilterData";

const CarFilterSchema = z
  .object({
    for: z.array(z.string()).optional(),
    color: z.array(z.string()).optional(),
    category: z.array(z.string()).optional(),
    model: z.array(z.string()).optional(),
    make: z.array(z.string()).optional(),
    fuelType: z.array(z.string()).optional(),
    drivetrain: z.array(z.string()).optional(),
  })
  .refine(
    (data) => {
      return (
        (data.for?.length ?? 0) > 0 ||
        (data.color?.length ?? 0) > 0 ||
        (data.category?.length ?? 0) > 0 ||
        (data.model?.length ?? 0) > 0 ||
        (data.make?.length ?? 0) > 0 ||
        (data.fuelType?.length ?? 0) > 0 ||
        (data.drivetrain?.length ?? 0) > 0
      );
    },
    {
      message: "You have to select at least one item from any filter category.",
    }
  );

const CarFilter = () => {
  const form = useForm<z.infer<typeof CarFilterSchema>>({
    resolver: zodResolver(CarFilterSchema),
  });

  function onSubmit(data: z.infer<typeof CarFilterSchema>) {
    toast.info(
      <div>
        <p>You submitted the following values:</p>
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      </div>
    );
  }

  const renderFilter = (
    fieldName: keyof z.infer<typeof CarFilterSchema>,
    items: { id: string; label: string }[] 
  ) => (
    <AccordionItem  value={fieldName}>
      <AccordionTrigger
        className="[&[data-state=open]>.chevronPlus]:rotate-45"
        icon={<FiPlus className="chevronPlus" />}
      >
        {fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}
      </AccordionTrigger>
      <AccordionContent>
        {items.map((item) => (
          <FormField
            key={item.id}
            control={form.control}
            name={fieldName}
            render={({ field }) => {
              return (
                <FormItem className="flex items-center space-x-3 mt-1">
                  <FormControl>
                    <Checkbox
                      checked={field.value?.includes(item.id)}
                      onCheckedChange={(checked) => {
                        return checked
                          ? field.onChange([...(field.value ?? []), item.id])
                          : field.onChange(
                              field.value?.filter((value) => value !== item.id)
                            );
                      }}
                    />
                  </FormControl>
                  <FormLabel className="font-normal">{item.label}</FormLabel>
                </FormItem>
              );
            }}
          />
        ))}
      </AccordionContent>
    </AccordionItem>
  );

  return (
    <div className="max-sm:mb-8 col-span-12 sm:col-span-3 sticky top-0">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Accordion type="multiple" defaultValue={["for"]}>
            {renderFilter("for", filterOptions)}
            {renderFilter("color", colors)}
            {renderFilter("category", categories)}
            {renderFilter("model", models)}
            {renderFilter("make", makes)}
            {renderFilter("fuelType", fuelTypes)}
            {renderFilter("drivetrain", drivetrains)}
          </Accordion>
          <FormMessage />
          <Button type="submit">Filter</Button>
        </form>
      </Form>
    </div>
  );
};

export default CarFilter;
