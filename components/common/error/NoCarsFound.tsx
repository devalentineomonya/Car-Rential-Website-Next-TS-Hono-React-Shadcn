"use client";
import Link from "next/link";
import { FaCarCrash, FaFilter, FaEnvelope } from "react-icons/fa";
import { Button } from "@/components/ui/button";

const NoCarsFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-center py-8 px-4 w-full">
      <div className="max-w-2xl mx-auto space-y-6">
        <FaCarCrash className="text-6xl mx-auto text-muted-foreground mb-4" />

        <h2 className="text-2xl font-semibold text-foreground">
          No Cars Found Matching Your Criteria
        </h2>

        <p className="text-muted-foreground mb-6">
          Try adjusting your search filters or explore our full inventory.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="outline" className="gap-2">
            <FaFilter className="text-lg" />
            Adjust Filters
          </Button>

          <Button asChild variant="default" className="gap-2">
            <Link href="/contact">
              <FaEnvelope className="text-lg" />
              Contact Administrator
            </Link>
          </Button>
        </div>

        <p className="text-sm text-muted-foreground mt-6">
          Can't find what you're looking for? Our team is here to help!
        </p>
      </div>
    </div>
  );
};

export default NoCarsFound;
