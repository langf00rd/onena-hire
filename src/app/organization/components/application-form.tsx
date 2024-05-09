"use client";

import { RenderSelectedInputFieldComponents } from "@/app/dashboard/jobs/new/components/application-form-builder";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { createClient } from "@/utils/supabase/client";
import { InputFieldComponentProps } from "@/utils/types";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import * as uuid from "short-uuid";

export default function ApplicationForm(props: {
  inputFields: InputFieldComponentProps[];
  domain: string;
  jobPostID: string;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function parseFormDataEntry(pair: [][]) {
    if (pair[1] instanceof File) {
      const formData = new FormData();
      const fileKey = `${uuid.generate()}-${props.domain}-${props.jobPostID}`;

      formData.set("file", pair[1]);
      formData.set("file-key", fileKey);
      formData.set("file-type", (pair[1] as File).type);

      try {
        const response = await fetch("/api/upload-file", {
          method: "POST",
          body: formData,
        });

        const json = await response.json();

        return arrayToObject([pair[0], json.data.url]);
      } catch (err) {
        throw err;
      }
    }

    return arrayToObject(pair);
  }

  async function handleApply(e: FormEvent) {
    e.preventDefault();

    setIsLoading(true);

    const inputValues = [];
    const formData = new FormData(e.target as HTMLFormElement);

    // @ts-ignore
    for (const pair of formData.entries()) {
      inputValues.push(await parseFormDataEntry(pair));
    }

    const supabase = createClient();

    const payload = {
      input_values: inputValues,
      job_post: Number(props.jobPostID),
    };

    const { error } = await supabase
      .from("applications")
      .insert([payload])
      .select();

    if (error) {
      return toast({
        description: error.message,
      });
    }

    router.push(
      `/organization/${props.domain}/jobs/${props.jobPostID}/submitted`,
    );
  }

  return (
    <form onSubmit={handleApply} className="max-w-md">
      <RenderSelectedInputFieldComponents components={props.inputFields} />
      <Button isLoading={isLoading}>Apply</Button>
    </form>
  );
}

//@ts-ignore
function arrayToObject(arr) {
  let obj = {};
  if (arr.length >= 2) {
    //@ts-ignore
    obj[arr[0]] = arr[1];
  }
  return obj;
}
