"use client"
import { zodResolver } from "@hookform/resolvers/zod";
import React from 'react'
import { useForm } from "react-hook-form";
import { GrSend } from "react-icons/gr";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
  } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
  
  const emailSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
  });
  
  type EmailFormValues = z.infer<typeof emailSchema>;
  
const FooterForm = () => {
    const form = useForm<EmailFormValues>({
        resolver: zodResolver(emailSchema),
        defaultValues: {
          email: "",
        },
      });
    
      const onSubmit = (data: EmailFormValues) => {
        toast.success(`Subscription successful for: ${data.email}`);
        form.reset();
      };
    
  return (
    <Form {...form}>
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex gap-2"
    >
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem className="flex-1">
            <FormControl>
              <Input
                placeholder="Enter your email"
                {...field}
                className="bg-black/5 dark:bg-white/5  border-black/10 dark:border-white/10 text-foreground"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <Button
        type="submit"
        variant="outline"
        size="icon"
        className="text-foreground bg-background  hover:bg-background/80 hover:text-slate-900 dark:hover:text-gray-100 border-black/10 dark:border-white/10  transition-transform hover:scale-105"
      >
        <GrSend aria-label="Send" />
      </Button>
    </form>
  </Form>
  )
}

export default FooterForm