import { ColumnDef } from "@tanstack/react-table";
import { InputFieldComponentProps, JobPost } from "./types";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

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

function RenderTableCell(props: {
  value: string;
  field: InputFieldComponentProps;
}) {
  if (props.field.type === "file") {
    return (
      <Dialog>
        <DialogTrigger className="flex items-center gap-1 underline hover:no-underline whitespace-nowrap text-blue">
          <ExternalLink size={13} />
          <p>View file</p>
        </DialogTrigger>
        <DialogContent className="h-[800px]">
          <iframe
            width={800}
            height={700}
            className="bg-zinc-50"
            src={props.value}
          />
        </DialogContent>
      </Dialog>
    );
  } else if (props.field.type === "url") {
    return (
      <Link
        target="_blank"
        className="underline hover:no-underline flex items-center gap-1 whitespace-nowrap text-blue-600"
        href={props.value}
      >
        <ExternalLink size={13} />
        {props.value}
      </Link>
    );
  } else
    return (
      <p className="max-w-xl line-clamp-1">
        {props.field.type === "number"
          ? Number(props.value).toLocaleString()
          : props.value}
      </p>
    );
}
