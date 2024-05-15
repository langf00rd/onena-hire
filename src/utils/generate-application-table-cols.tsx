import { ColumnDef } from "@tanstack/react-table";
import { JobPost, RenderTableCellProps } from "./types";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  FileFieldTypes,
  IMAGE_FILE_TYPES,
  VIDEO_FILE_TYPES,
} from "./constants";
import Image from "next/image";

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
          <RenderTableCell
            value={String(cell.getValue())}
            field={field}
            truncateStrings
            fileFieldType={field.file_field_type as FileFieldTypes}
          />
        );
      },
    });
  }
  return columnDefs;
}

export function RenderTableCell(props: RenderTableCellProps) {
  if (props.field.type === "file" && props.fileFieldType) {
    if (IMAGE_FILE_TYPES.includes(props.fileFieldType)) {
      return (
        <Image
          alt={`image of ${props.field}`}
          src={props.value}
          width={props.imageSize ?? 50}
          height={props.imageSize ?? 50}
          style={{
            width: props.imageSize ?? 50,
            borderRadius: "5px",
          }}
        />
      );
    }

    if (
      VIDEO_FILE_TYPES.includes(props.fileFieldType) &&
      props.showVideoInTableCell
    ) {
      return <video className="w-full" controls src={props.value} />;
    }

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
      <p className={props.truncateStrings ? `max-w-xl line-clamp-1` : ""}>
        {props.field.type === "number"
          ? Number(props.value).toLocaleString()
          : props.value === "undefined"
            ? "--"
            : props.value}
      </p>
    );
}
