import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { footerLinks } from "./footerLinks";
import FooterForm from "./FooterForm";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";

const FooterSection = ({
  title,
  items,
}: {
  title: string;
  items: { name: string; href: string }[];
}) => (
  <div className="col-span-6 sm:col-span-4 lg:col-span-2">
    <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase">
      {title}
    </h3>
    <NavigationMenu>
      <NavigationMenuList className="space-y-2 flex-col items-start mt-5">
        {items.map((item) => (
          <NavigationMenuItem key={item.name}>
            <NavigationMenuLink
              href={item.href}
              className="text-gray-300 hover:text-foreground transition-colors font-medium"
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
  return (
    <footer className="border-t flex items-center justify-center bg-background">
      <div className="container max-w-6xl px-4 py-12">
        <div className="grid grid-cols-12 max-sm:gap-y-6">
          <FooterSection title="Solutions" items={footerLinks.solutions} />
          <FooterSection title="Support" items={footerLinks.support} />
          <FooterSection title="Company" items={footerLinks.company} />

          <Card className="border-0 bg-transparent col-span-12 lg:col-span-6">
            <CardHeader className="px-0">
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                Subscribe to our newsletter
              </h3>
            </CardHeader>
            <CardContent className="px-0">
              <p className="text-gray-300 mb-4">
                The latest news, articles, and resources, sent to your inbox
                weekly.
              </p>
              <FooterForm />
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
            . All rights rentd.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
