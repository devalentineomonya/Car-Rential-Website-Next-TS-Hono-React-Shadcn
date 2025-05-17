import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ItemsPerPageController = () => {
  return (
    <Select>
      <SelectTrigger className="w-fit">
        <SelectValue placeholder="Show Items" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="8">Show 8</SelectItem>
        <SelectItem value="12">Show 12</SelectItem>
        <SelectItem value="16">Show 16</SelectItem>
        <SelectItem value="20">Show 20</SelectItem>
        <SelectItem value="24">Show 24</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default ItemsPerPageController;
