"use client";

import RenderInputFieldFromType from "@/components/render-input-field-from-type";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { INPUT_FIELD_TYPES } from "@/utils/constants";
import { InputFieldComponentProps } from "@/utils/types";
import { Plus } from "lucide-react";
import { useState } from "react";

export default function ApplicationForm(props: {
  onSubmit: (inputFields: InputFieldComponentProps[]) => void;
}) {
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
        <InputFieldComponent onAddComponent={handleAddComponent} />
      </div>
      <Button onClick={() => props.onSubmit(inputFields)}>
        Create job post
      </Button>
    </div>
  );
}

export function RenderSelectedInputFieldComponents(props: {
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
