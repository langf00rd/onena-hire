"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "@/components/ui/use-toast";
import { FileFieldTypes } from "@/utils/constants";
import { extractEmailsFromApplicationInputValues } from "@/utils/extract-emails";
import generateApplicationTableCols, {
  RenderTableCell,
} from "@/utils/generate-application-table-cols";
import {
  Application,
  InputFieldComponentProps,
  JobApplication,
  JobPost,
} from "@/utils/types";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import {
  ColumnFiltersState,
  Row,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Calendar, Mail, Pen } from "lucide-react";
import * as React from "react";

export function ApplicantsTable(props: {
  data: JobApplication["input_values"];
  schema: JobPost["input_fields"];
}) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const emails = extractEmailsFromApplicationInputValues(props.data);
  const [isExportingEmails, startEmailExport] = React.useTransition();

  const table = useReactTable({
    data: props.data,
    columns: generateApplicationTableCols(props.schema),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  function exportStringsAsTxt(strings: string[], filename: string) {
    startEmailExport(() => {
      try {
        const blob = new Blob([strings.join("\n")], { type: "text/plain" });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = `${filename}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        // Revoke the URL to free up resources
        URL.revokeObjectURL(url);
      } catch (err) {
        toast({
          description: String(err),
        });
      }
    });
  }

  return (
    <div className="w-full">
      <div className="flex items-center gap-5 py-4">
        <Input
          placeholder="Filter emails..."
          value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("email")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <Button
          isLoading={isExportingEmails}
          variant="secondary"
          onClick={() =>
            exportStringsAsTxt(emails, `application-emails-${Date.now()}`)
          }
        >
          <Mail size={15} />
          Export all {emails.length} emails
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="whitespace-nowrap">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table
                .getRowModel()
                .rows.map((row) => (
                  <CTableCell schema={props.schema} key={row.id} row={row} />
                ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={generateApplicationTableCols(props.schema).length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

function CTableCell(props: {
  schema: InputFieldComponentProps[];
  row: Row<Record<string, unknown>>;
}) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <TableRow
          className="cursor-pointer"
          data-state={props.row.getIsSelected() && "selected"}
        >
          {props.row.getVisibleCells().map((cell) => (
            <TableCell key={cell.id}>
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </TableCell>
          ))}
        </TableRow>
      </SheetTrigger>
      <SheetContent className="space-y-5">
        <SheetHeader>
          <SheetTitle className="text-black">View application</SheetTitle>
        </SheetHeader>
        <div className="space-y-7">
          {Object.entries(props.row.original).map(([key, value]) => {
            const inputFields = props.schema.find((a) => a.id === key);
            if (!inputFields) return;
            return (
              <div key={String(value)} className="space-y-1">
                <p className="text-sm text-black whitespace-nowrap capitalize">
                  {key.replaceAll("_", " ")}
                </p>
                <RenderTableCell
                  fileFieldType={inputFields.file_field_type as FileFieldTypes}
                  imageSize={150}
                  showVideoInTableCell
                  value={String(value)}
                  field={inputFields}
                />
              </div>
            );
          })}
        </div>
        <SheetFooter>
          <Button disabled className="w-full">
            <Calendar size={15} />
            Schedule meeting
          </Button>
          <Button variant="outline" className="w-full" disabled>
            <Pen size={15} />
            Add a note
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
