import { ColumnDef, Row } from "@tanstack/react-table";
import { JobPost, RenderTableCellProps } from "./types";
import Link from "next/link";
import { Calendar, Expand, ExternalLink, Pen } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  FileFieldTypes,
  IMAGE_FILE_TYPES,
  VIDEO_FILE_TYPES,
} from "./constants";
import Image from "next/image";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

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
          <>
            <ApplicantsTableSheet row={cell.row} schema={schema} />
            <RenderTableCell
              value={String(cell.getValue())}
              field={field}
              truncateStrings
              fileFieldType={field.file_field_type as FileFieldTypes}
            />
          </>
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
        <DialogTrigger
          disabled={props.disabled}
          className="flex items-center gap-1 underline hover:no-underline whitespace-nowrap text-blue"
        >
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
      <p className={props.truncateStrings ? `w-max max-w-xl line-clamp-1` : ""}>
        {props.field.type === "number"
          ? Number(props.value).toLocaleString()
          : props.value === "undefined"
            ? "--"
            : props.value}
      </p>
    );
}

export function ApplicantsTableSheet(props: {
  row: Row<Record<string, unknown>>;
  schema: JobPost["input_fields"];
}) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Expand
          className="absolute rounded-md top-[33%] z-20 left-5 bg-white p-1 shadow-sm hidden group-hover:block"
          size={25}
        />
      </SheetTrigger>
      <SheetContent className="mx-2 mt-2 h-[98%] rounded-xl space-y-5 overflow-y-scroll">
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
