import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SortByController = () => {
  return (
    <Select>
      <SelectTrigger className="w-fit">
        <SelectValue placeholder="Sort By" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="pricePerDay_asc">Price: Low to High</SelectItem>
        <SelectItem value="pricePerDay_desc">Price: High to Low</SelectItem>
        <SelectItem value="mileage_asc">Mileage: Low to High</SelectItem>
        <SelectItem value="dateManufactured_desc">Newest Vehicles</SelectItem>
        <SelectItem value="make_asc">Make: A to Z</SelectItem>
        <SelectItem value="createdAt_desc">Newest Listings</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default SortByController;
