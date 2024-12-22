"use client";

import { ColumnDef, Row } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import Image from "next/image";
import { z } from "zod";

import { Badge } from "@/components/ui/badge";
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
import { selectCarSchema } from "@/db/schema";
import { useDeleteCar } from "@/hooks/use-delete-car";
import { useEditCar } from "@/hooks/use-edit-car";


const refinedSchema = z.object({
    ...selectCarSchema.shape,
    owner: z.object({
      firstName: z.string(),
      lastName: z.string(),
    }),
  });

 type TableTypes = z.infer<typeof refinedSchema>


const CarActions = ({ row }:{row:Row<TableTypes>}) => {
    const car = row.original;
    const { onOpen } = useEditCar();
    const { onOpen: onDelete } = useDeleteCar();
    return (
      <div className=" sticky right-0">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(car.id)}
            >
              Copy car ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View details</DropdownMenuItem>
            <DropdownMenuItem onClick={() => onOpen(car.id)}>
              Edit car
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onDelete(car.id)}>
              Delete car
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  }




export const columns: ColumnDef<TableTypes>[] = [
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
            src={
              Array.isArray(images) && images[0]
                ? (images[0] as string)
                : "/images/car1.png"
            }
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
        <Badge variant="outline" className="text-green-600">
          Available
        </Badge>
      ) : (
        <Badge variant="outline" className="text-red-600">
          Unavailable
        </Badge>
      ),
  },
  {
    accessorKey: "isForHire",
    header: "Purpose",
    cell: ({ row }) =>
      row.original.isForDelivery ? (
        <Badge variant="outline" className="text-green-600">
          Delivery
        </Badge>
      ) : row.original.isForHire ? (
        <Badge variant="outline" className="text-green-600">
          Hire
        </Badge>
      ) : row.original.isForRent ? (
        <Badge variant="outline" className="text-green-600">
          Rent
        </Badge>
      ) : (
        <Badge variant="outline" className="text-green-600">
          Not Specified
        </Badge>
      ),
  },

  {
    id: "actions",
    cell: CarActions
  },
];
