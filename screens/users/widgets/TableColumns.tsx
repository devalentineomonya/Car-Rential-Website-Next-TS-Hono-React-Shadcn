import { ColumnDef, Row } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
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
import { z } from "zod";
import { insertUserSchema } from "@/db/schema";
import { useEditUser } from "@/hooks/use-edit-user";
import { useDeleteUser } from "@/hooks/use-delete-user";

type TableTypes = z.infer<typeof insertUserSchema>;

const UserActions = ({ row }: { row: Row<TableTypes> }) => {
  const user = row.original;
  const { onOpen } = useEditUser();
  const { onOpen: onDelete } = useDeleteUser();

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
            onClick={() => navigator.clipboard.writeText(user.email)}
          >
            Copy email
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>View details</DropdownMenuItem>
          <DropdownMenuItem onClick={() => onOpen(user.email)}>
            Edit user
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onDelete(user.email)}>
            Delete user
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

// Columns configuration for the user table
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
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => row.original.email,
  },
  {
    accessorKey: "firstName",
    header: "First Name",
    cell: ({ row }) => row.original.firstName,
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
    cell: ({ row }) => row.original.lastName,
  },
  {
    accessorKey: "location",
    header: "Location",
    cell: ({ row }) => row.original.location,
  },
  {
    accessorKey: "address",
    header: "Address",
    cell: ({ row }) => row.original.address,
  },
  {
    accessorKey: "  ",
    header: "Phone",
    cell: ({ row }) => row.original.phone,
  },
  {
    accessorKey: "isNew",
    header: "New User",
    cell: ({ row }) => (
      <Badge
        variant={row.original.isNew ? "outline" : "secondary"}
        className="text-green-600"
      >
        {row.original.isNew ? "New" : "Existing"}
      </Badge>
    ),
  },
  {
    id: "actions",              
    cell: UserActions,
  },
];
