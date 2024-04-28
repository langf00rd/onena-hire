import { ColumnDef } from "@tanstack/react-table";
import { JobPost } from "./types";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
/**
 * dynamically generates the table heads (columns) for the table
 * @param schema - the input fields schema from the job post which serves as the main layout for the table
 */
export default function generateApplicationTableHeadCols(
  schema: JobPost["input_fields"],
) {
  const columnDefs: ColumnDef<Record<string, unknown>>[] = [];
  for (const field of schema) {
    columnDefs.push({
      accessorKey: field.label.toLowerCase().replaceAll(" ", "_"),
      header: field.label,
      cell: (cell) => {
        const value =
          typeof cell.getValue() !== "string" ? "--" : String(cell.getValue());
        if (field.type === "url") {
          return (
            <Link
              target="_blank"
              className="underline hover:no-underline flex items-center gap-1 whitespace-nowrap text-blue-600"
              href={value}
            >
              <ExternalLink size={13} />
              {value}
            </Link>
          );
        } else
          return (
            <div className="whitespace-nowrap">
              {Number(value) ? Number(value).toLocaleString() : value}
            </div>
          );
      },
    });
  }
  return columnDefs;
}
