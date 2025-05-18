"use client";
import {
    flexRender,
    getCoreRowModel,
    useReactTable,
    getPaginationRowModel,
    SortingState,
    getSortedRowModel,
    ColumnFiltersState,
    getFilteredRowModel,
} from "@tanstack/react-table";
import {Plus, ArrowUp, ArrowDown} from "lucide-react";
import {useState, useMemo} from "react";

import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {useGetCars} from "@/features/cars/api/use-get-cars";
import {useNewCar} from "@/hooks/use-new-car";

import TableLoader from "../../../components/common/loaders/TableLoader";
import {TablePagination} from "../../../components/pagination/TablePagination";
import {columns, TableTypes} from "../widgets/TableColumns";

const CarsTable = () => {
    const {data, isLoading} = useGetCars();
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const {onOpen} = useNewCar();

    const transformedData = useMemo(() => {
        return data
            ? data.map((car) => ({
                  ...car,
                  owner: car.owner
                      ? {
                            firstName: car.owner.firstName ?? "",
                            lastName: car.owner.lastName ?? "",
                        }
                      : {firstName: "", lastName: ""},
                  createdAt: new Date(car.createdAt),
                  updatedAt: new Date(car.updatedAt),
                  dateManufactured: new Date(car.dateManufactured),
              }))
            : [];
    }, [data]);

    const table = useReactTable<TableTypes>({
        data: transformedData,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting,
            columnFilters,
        },
    });

    if (isLoading) return <TableLoader />;

    return (
        <div className="w-full space-y-2.5 overflow-auto max-w-[100dvw]">
            <div className="flex justify-between items-center flex-wrap gap-y-3">
                <Button onClick={onOpen}>
                    <Plus className="mr-3" /> Add New
                </Button>

                <Input
                    placeholder="Filter cars..."
                    value={
                        (table.getColumn("name")?.getFilterValue() as string) ??
                        ""
                    }
                    onChange={(event) =>
                        table
                            .getColumn("name")
                            ?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />
            </div>

            <div className="rounded-md border max-w-[100dvw] hide-scrollbar">
                <div className="overflow-x-auto hide-scrollbar">
                    <Table className="min-w-full hide-scrollbar">
                        <TableHeader>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => (
                                        <TableHead
                                            className="min-w-fit whitespace-nowrap"
                                            key={header.id}
                                            onClick={header.column.getToggleSortingHandler()}
                                        >
                                            {header.isPlaceholder ? null : (
                                                <div className="flex items-center gap-2">
                                                    {flexRender(
                                                        header.column.columnDef
                                                            .header,
                                                        header.getContext(),
                                                    )}
                                                    {{
                                                        asc: (
                                                            <ArrowUp className="h-4 w-4" />
                                                        ),
                                                        desc: (
                                                            <ArrowDown className="h-4 w-4" />
                                                        ),
                                                    }[
                                                        header.column.getIsSorted() as string
                                                    ] ?? null}
                                                </div>
                                            )}
                                        </TableHead>
                                    ))}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow key={row.id}>
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell
                                                key={cell.id}
                                                className="min-w-fit whitespace-nowrap"
                                            >
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext(),
                                                )}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={columns.length}
                                        className="h-24 text-center"
                                    >
                                        No results.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
            <TablePagination table={table} />
        </div>
    );
};

export default CarsTable;
