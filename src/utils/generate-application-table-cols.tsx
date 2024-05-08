import { ColumnDef } from "@tanstack/react-table";
import { InputFieldComponentProps, JobPost } from "./types";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

function RenderTableCell(props: {
  value: string;
  field: InputFieldComponentProps;
}) {
  if (props.field.type === "url" || props.field.type === "file") {
    return (
      <Link
        target="_blank"
        className="underline hover:no-underline flex items-center gap-1 whitespace-nowrap text-blue-600"
        href={props.value}
      >
        <ExternalLink size={13} />
        {props.value.toString() === "undefined"
          ? props.value
          : new URL(props.value).host}
      </Link>
    );
  } else
    return (
      <div className="whitespace-nowrap">
        {Number(props.value)
          ? Number(props.value).toLocaleString()
          : props.value}
      </div>
    );
}

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
        return (
          <RenderTableCell value={String(cell.getValue())} field={field} />
        );
      },
    });
  }
  return columnDefs;
}
