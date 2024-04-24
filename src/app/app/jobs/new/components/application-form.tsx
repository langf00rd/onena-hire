import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { INPUT_FIELD_TYPES } from "@/utils/constants";
import { Plus } from "lucide-react";
import { useState } from "react";

interface InputFieldComponentProps {
  id: string;
  type: string;
  label: string;
  maxChars?: number;
  required?: boolean;
}

export default function ApplicationForm() {
  const [inputFields, setInputFields] = useState<InputFieldComponentProps[]>(
    [],
  );

  function handleAddComponent(componentProps: InputFieldComponentProps) {
    setInputFields((prev) => [...prev, componentProps]);
  }

  return (
    <div className="flex items-start gap-5">
      <div className="flex-1">
        <RenderSelectedInputFieldComponents components={inputFields} />
      </div>
      <div className="flex-1 sticky top-[100px]">
        <InputFieldComponent
          onAddComponent={handleAddComponent}
          onLabelChange={console.log}
        />
      </div>
    </div>
  );
}

function RenderInputFieldFromType(props: InputFieldComponentProps) {
  if (["file", "text", "email", "number"].includes(props.type)) {
    return (
      <fieldset>
        <Label>
          {props.label} {props.required && "*"}
        </Label>
        <Input
          type={props.type}
          name={props.id}
          required={props.required}
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

function RenderSelectedInputFieldComponents(props: {
  components: InputFieldComponentProps[];
}) {
  return (
    <div className="space-y-3">
      {props.components.map((component) => (
        <RenderInputFieldFromType key={component.id} {...component} />
      ))}
    </div>
  );
}

function InputFieldComponent(props: {
  onLabelChange: (value: string) => void;
  onAddComponent: (componentProps: InputFieldComponentProps) => void;
}) {
  const [labelValue, setLabelValue] = useState("");
  const [fieldType, setFieldType] = useState(INPUT_FIELD_TYPES[0]);
  const [isRequired, setIsRequired] = useState(false);
  return (
    <Card className="p-3 space-y-5">
      <div className="flex items-center justify-between">
        <h3>Input field</h3>
        <Button
          size="icon"
          variant="secondary"
          onClick={() => {
            if (!labelValue) return;
            props.onAddComponent({
              id: labelValue.toLowerCase().replaceAll(" ", "_"),
              type: fieldType,
              label: labelValue,
              required: isRequired,
            });
          }}
        >
          <Plus />
        </Button>
      </div>
      <div className="space-y-2">
        <p>Type</p>
        <Select onValueChange={setFieldType}>
          <SelectTrigger className="capitalize">
            <SelectValue placeholder={INPUT_FIELD_TYPES[0]} />
          </SelectTrigger>
          <SelectContent>
            {INPUT_FIELD_TYPES.map((type) => (
              <SelectItem key={type} value={type} className="capitalize">
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <p>Label</p>
        <Input
          required
          onChange={(e) => {
            props.onLabelChange(e.target.value);
            setLabelValue(e.target.value);
          }}
        />
      </div>
      <div className="flex justify-between items-center">
        <p>Required</p>
        <Input
          type="checkbox"
          className="w-4 h-4"
          onChange={(e) => {
            setIsRequired(e.target.checked);
          }}
        />
      </div>
    </Card>
  );
}
