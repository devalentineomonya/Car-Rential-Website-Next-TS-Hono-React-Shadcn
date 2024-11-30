"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import Image from "next/image";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {selectCarSchema} from "@/db/schema"



export const columns: ColumnDef<z.infer<typeof selectCarSchema>>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: "#",
    cell: ({ row }) => row.index + 1, 
    enableSorting: false,
  },
  {
    accessorKey: "name",
    header: "Car Name",
    cell: ({ row }) => {
      const { name, condition, images } = row.original;

      return (
        <div className="flex items-center gap-4">
          {/* Car Image */}
          <Image
            src={images[0] ?? '/images/car1.png'}
            alt={name}
            width={100}
            height={100}
            className="aspect-video rounded-md object-cover"
          />
          {/* Car Name and Condition */}
          <div>
            <p className="font-medium">{name}</p>
            <p className="text-sm text-gray-500">{condition}</p>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "make",
    header: "Make",
  },
  {
    accessorKey: "model",
    header: "Model",
  },
  {
    accessorKey: "mileage",
    header: "Mileage",
  },
  {
    accessorFn: (row) => `${row.owner?.firstName} ${row.owner?.lastName}`,
    id: "owner",
    header: "Owner",
  },
  {
    accessorKey: "pricePerDay",
    header: "Price/Day",
    cell: ({ row }) =>
      row.original.pricePerDay
        ? `$${row.original.pricePerDay.toLocaleString()}`
        : "N/A",
  },
  {
    accessorKey: "isAvailable",
    header: "Availability",
    cell: ({ row }) =>
      row.original.isAvailable ? (
        <span className="text-green-600">Available</span>
      ) : (
        <span className="text-red-600">Unavailable</span>
      ),
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const car = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(car.id)}
            >
              Copy car ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View details</DropdownMenuItem>
            <DropdownMenuItem>Edit car</DropdownMenuItem>
            <DropdownMenuItem>Delete car</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
