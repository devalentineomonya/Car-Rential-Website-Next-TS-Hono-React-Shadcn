import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { footerLinks } from "./footerLinks";
import { toast } from "sonner";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { GrSend } from "react-icons/gr";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

const emailSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type EmailFormValues = z.infer<typeof emailSchema>;

const FooterSection = ({
  title,
  items,
}: {
  title: string;
  items: { name: string; href: string }[];
}) => (
  <div className="col-span-12 sm:col-span-6 lg:col-span-2">
    <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase">
      {title}
    </h3>
    <NavigationMenu>
      <NavigationMenuList className="space-y-2 flex-col items-start mt-5">
        {items.map((item) => (
          <NavigationMenuItem key={item.name}>
            <NavigationMenuLink
              href={item.href}
              className="text-gray-300 hover:text-white transition-colors font-medium"
            >
              {item.name}
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  </div>
);

const Footer = () => {
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
    <footer className="bg-background border-t flex items-center justify-center bg-slate-950">
      <div className="container max-w-6xl px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-12 gap-8">
          <FooterSection title="Solutions" items={footerLinks.solutions} />
          <FooterSection title="Support" items={footerLinks.support} />
          <FooterSection title="Company" items={footerLinks.company} />

          <Card className="border-0 bg-transparent col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-5">
            <CardHeader>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                Subscribe to our newsletter
              </h3>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 mb-4">
                The latest news, articles, and resources, sent to your inbox
                weekly.
              </p>
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
                            className="bg-white/5 border-white/10"
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
                    className="text-white bg-slate-900 hover:bg-slate-800 hover:text-gray-100 border-white/10 transition-transform hover:scale-105"
                  >
                    <GrSend aria-label="Send" />
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>

        <Separator className="my-8 bg-gray-700" />

        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <NavigationMenu className="flex space-x-6">
            <NavigationMenuList className="gap-x-2">
              {footerLinks.social.map((item) => (
                <NavigationMenuItem key={item.name}>
                  <NavigationMenuLink
                    href={item.href}
                    className="text-gray-400 hover:text-gray-300 transition-colors"
                  >
                    <span className="sr-only">{item.name}</span>
                    <item.icon
                      className="h-5 aspect-square"
                      aria-hidden="true"
                    />
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
          <p className="mt-8 md:mt-0 text-gray-400">
            &copy; {new Date().getFullYear()}{" "}
            <Link
              href="http://devalentine.vercel.app"
              target="_blank"
              className="underline"
            >
              Devalentine
            </Link>
            . All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
