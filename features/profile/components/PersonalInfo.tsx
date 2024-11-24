"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

const PersonalInfoSchema = z.object({
  firstName: z.string({ message: "First Name is required" }).min(2, {
    message: "First Name must be at least 2 characters.",
  }),
  lastName: z.string({ message: "Last Name is required" }   ).min(2, {
    message: "Last Name must be at least 2 characters.",
  }),
  location: z.string({ message: "Location is required" }    ).min(2, {
    message: "Location must be at least 2 characters.",
  }),
  email: z.string({ message: "Email is required" }).email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string({ message: "Phone number is required" }   ).min(10, {
    message: "Phone number must be at least 10 characters.",
  }),
  address: z.string({ message: "Address is required" }).min(10, {
    message: "Address must be at least 10 characters.",
  }),
});
const PersonalInfo = () => {
  const form = useForm<z.infer<typeof PersonalInfoSchema>>({
    resolver: zodResolver(PersonalInfoSchema),
  });

  function onSubmit(data: z.infer<typeof PersonalInfoSchema>) {
    toast.info(
      <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
        <code className="text-white">{JSON.stringify(data, null, 2)}</code>
      </pre>
    );
  }
  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>
          <h2 className="text-lg font-semibold text-foreground">
            Personal Details
          </h2>
          <p className="text-base text-muted-foreground mt-1 font-medium">
            To change your personal detail , edit and save from here
          </p>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-1">
          <div className="grid lg:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="off"
                      className="text-foreground text-base  w-full outline-none focus-visible:ring-0
                         px-3 rounded-md focus-within:outline-none focus-within:ring-1 focus-within:ring-ring
                          relative h-11 flex-1 items-center bg-white/5 border border-input"
                      placeholder="Eg John, Jane"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="off"
                      className="text-foreground text-base  w-full outline-none focus-visible:ring-0
                     px-3 rounded-md focus-within:outline-none focus-within:ring-1 focus-within:ring-ring
                      relative h-11 flex-1 items-center bg-white/5 border border-input"
                      placeholder="eg Doe, Smith"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
           
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="off"
                      className="text-foreground text-base  w-full outline-none focus-visible:ring-0
                     px-3 rounded-md focus-within:outline-none focus-within:ring-1 focus-within:ring-ring
                      relative h-11 flex-1 items-center bg-white/5 border border-input"
                      placeholder="eg New York, London"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="off"
                      className="text-foreground text-base  w-full outline-none focus-visible:ring-0
                     px-3 rounded-md focus-within:outline-none focus-within:ring-1 focus-within:ring-ring
                      relative h-11 flex-1 items-center bg-white/5 border border-input"
                      placeholder="eg john@doe.com, jane@smith.com"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
              />
          
              <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="off"
                      className="text-foreground text-base  w-full outline-none focus-visible:ring-0
                     px-3 rounded-md focus-within:outline-none focus-within:ring-1 focus-within:ring-ring
                      relative h-11 flex-1 items-center bg-white/5 border border-input"
                      placeholder="eg +1234567890, +1234567890"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="off"
                      className="text-foreground text-base  w-full outline-none focus-visible:ring-0
                     px-3 rounded-md focus-within:outline-none focus-within:ring-1 focus-within:ring-ring
                      relative h-11 flex-1 items-center bg-white/5 border border-input"
                      placeholder="2g 1234 Main St, Anytown, USA Main St, Anytown, USA"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
              />
            </div>
            <Button type="submit" className="mt-12 inline-block">
              Submit
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default PersonalInfo;
