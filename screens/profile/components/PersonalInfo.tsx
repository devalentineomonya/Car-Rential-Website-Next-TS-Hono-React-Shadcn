"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
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
import { insertUserSchema } from "@/db/schema";
import { useUpdateUser } from "@/features//users/api/use-update-user";
import { INPUT_CLASSNAME } from "@/utils/constants";
const personalInfoSchema = insertUserSchema
  .pick({
    id: true,
    clerk_id: true,
    firstName: true,
    lastName: true,
    email: true,
    phone: true,
    address: true,
    location: true,
  })
  .required();

type PersonalInfoSchema = z.infer<typeof personalInfoSchema>;

const PersonalInfo = ({ data }: { data: PersonalInfoSchema }) => {
  const updateUser = useUpdateUser();
  const form = useForm<PersonalInfoSchema>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      id: data.id || "",
      clerk_id: data.clerk_id || "",
      firstName: data.firstName || "",
      lastName: data.lastName || "",
      email: data.email || "",
      phone: data.phone || "",
      address: data.address || "",
      location: data.location || "",
    },
  });

  useEffect(() => {
    const defaultValues = {
      id: data.id || "",
      clerk_id: data.clerk_id || "",
      firstName: data.firstName || "",
      lastName: data.lastName || "",
      email: data.email || "",
      phone: data.phone || "",
      address: data.address || "",
      location: data.location || "",
    };
    form.reset(defaultValues);
  }, [data, form]);

  async function onSubmit(data: PersonalInfoSchema) {
    try {
      const response = await updateUser.mutateAsync(data);
      if (response) {
        toast.success("User updated successfully!");
      }
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to update user";
      toast.error(errorMessage);
    }
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
                    <FormLabel>First Name *</FormLabel>
                    <FormControl>
                      <Input
                        autoComplete="off"
                        className={INPUT_CLASSNAME}
                        placeholder="Eg John, Jane"
                        required
                        {...field}
                        value={field.value || ""}
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
                    <FormLabel>Last Name *</FormLabel>
                    <FormControl>
                      <Input
                        autoComplete="off"
                        className={INPUT_CLASSNAME}
                        placeholder="eg Doe, Smith"
                        required
                        {...field}
                        value={field.value || ""}
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
                    <FormLabel>Location *</FormLabel>
                    <FormControl>
                      <Input
                        autoComplete="off"
                        className={INPUT_CLASSNAME}
                        placeholder="eg New York, London"
                        required
                        {...field}
                        value={field.value || ""}
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
                    <FormLabel>Email *</FormLabel>
                    <FormControl>
                      <Input
                        autoComplete="off"
                        className={INPUT_CLASSNAME}
                        placeholder="eg john@doe.com, jane@smith.com"
                        type="email"
                        required
                        disabled
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
                    <FormLabel>Phone *</FormLabel>
                    <FormControl>
                      <Input
                        autoComplete="off"
                        className={INPUT_CLASSNAME}
                        placeholder="eg +1234567890, +1234567890"
                        required
                        {...field}
                        value={field.value || ""}
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
                    <FormLabel>Address *</FormLabel>
                    <FormControl>
                      <Input
                        autoComplete="off"
                        className={INPUT_CLASSNAME}
                        placeholder="2g 1234 Main St, Anytown, USA Main St, Anytown, USA"
                        required
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button
              disabled={updateUser.isPending}
              type="submit"
              className="mt-12 inline-block"
            >
              {updateUser.isPending ? "Updating..." : "Submit"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default PersonalInfo;
