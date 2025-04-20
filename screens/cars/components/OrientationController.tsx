"use client";

import { useState } from "react";
import { LayoutGrid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const OrientationController = () => {
  const [view, setView] = useState<"grid" | "list">("grid");
  return (
    <div className="flex border border-gray-300 rounded-md overflow-hidden">
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "rounded-none h-9 w-9",
          view === "grid" ? "bg-gray-300" : "bg-transparent hover:bg-gray-400",
        )}
        onClick={() => setView("grid")}
      >
        <LayoutGrid className="h-5 w-5" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "rounded-none h-9 w-9",
          view === "list" ? "bg-gray-300" : "bg-transparent hover:bg-gray-400",
        )}
        onClick={() => setView("list")}
      >
        <List className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default OrientationController;
