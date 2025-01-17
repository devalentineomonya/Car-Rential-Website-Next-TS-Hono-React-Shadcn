"use client";

import { ColumnDef, Row } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import Image from "rc-image";
import {
  GrRotateLeft,
  GrRotateRight,
  GrZoomIn,
  GrZoomOut,
  GrClose,
} from "react-icons/gr";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import { IoIosSwap } from "react-icons/io";
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

// Schema refinement with better type safety
const refinedSchema = selectCarSchema.extend({
  owner: z.object({
    firstName: z.string(),
    lastName: z.string(),
  }),
});

type TableTypes = z.infer<typeof refinedSchema>;

// Separate CarActions component for clarity
const CarActions = ({ row }: { row: Row<TableTypes> }) => {
  const car = row.original;
  const { onOpen } = useEditCar();
  const { onOpen: onDelete } = useDeleteCar();

  return (
    <div className="sticky right-0">
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
            onClick={() =>
              navigator.clipboard
                .writeText(car.id)
                .catch(() => console.error("Failed to copy car ID"))
            }
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
};

// Define icons as a utility object for better organization
const icons = {
  rotateLeft: <GrRotateLeft />,
  rotateRight: <GrRotateRight />,
  zoomIn: <GrZoomIn />,
  zoomOut: <GrZoomOut />,
  close: <GrClose />,
  left: <GoArrowLeft />,
  right: <GoArrowRight />,
  flipX: <IoIosSwap />,
  flipY: <IoIosSwap style={{ transform: "rotate(90deg)" }} />,
};

// Columns configuration for the table
export const columns: ColumnDef<TableTypes>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
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
          <Image.PreviewGroup
            preview={{
              countRender: (current, total) => `Image ${current} of ${total}`,
            }}
            items={Array.isArray(images) ? (images as string[]) : []}
            icons={icons}
          >
            <Image
              src={
                Array.isArray(images) && images[0]
                  ? images[0]
                  : "/images/car1.png"
              }
              alt={name}
              className="w-10 aspect-square rounded-md object-cover"
            />
          </Image.PreviewGroup>
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
    cell: ({ row }) =>
      row.original.mileage
        ? `${row.original.mileage.toLocaleString()} km`
        : "N/A",
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
    cell: ({ row }) => {
      const { isForDelivery, isForHire, isForRent } = row.original;

      if (isForDelivery) {
        return (
          <Badge variant="outline" className="text-green-600">
            Delivery
          </Badge>
        );
      } else if (isForHire) {
        return (
          <Badge variant="outline" className="text-green-600">
            Hire
          </Badge>
        );
      } else if (isForRent) {
        return (
          <Badge variant="outline" className="text-green-600">
            Rent
          </Badge>
        );
      } else {
        return (
          <Badge variant="outline" className="text-gray-600">
            Not Specified
          </Badge>
        );
      }
    },
  },
  {
    id: "actions",
    cell: CarActions,
  },
];
