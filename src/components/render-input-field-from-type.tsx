import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { InputFieldComponentProps } from "@/utils/types";

export default function RenderInputFieldFromType(
  props: InputFieldComponentProps,
) {
  if (
    [
      "text",
      "file",
      "email",
      "url",
      "tel",
      "time",
      "number",
      "datetime-local",
    ].includes(props.type)
  ) {
    return (
      <fieldset>
        <Label>
          {props.label} {props.required && "*"}
        </Label>
        <Input
          type={props.type}
          name={props.id}
          required={props.required}
          accept={props.file_field_type ?? "*"}
          className="w-full"
        />
      </fieldset>
    );
  } else if (props.type === "multi-text") {
    return (
      <fieldset>
        <Label>
          {props.label} {props.required && "*"}
        </Label>
        <Textarea className="w-full" />
      </fieldset>
    );
  } else return <></>;
}
