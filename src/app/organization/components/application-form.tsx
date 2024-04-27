"use client";

import { RenderSelectedInputFieldComponents } from "@/app/dashboard/jobs/new/components/application-form-builder";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { createClient } from "@/utils/supabase/client";
import { InputFieldComponentProps } from "@/utils/types";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";

export default function ApplicationForm(props: {
  inputFields: InputFieldComponentProps[];
  domain: string;
  jobPostID: string;
}) {
  const router = useRouter();

  async function handleApply(e: FormEvent) {
    e.preventDefault();

    const inputValues = [];
    const formData = new FormData(e.target as HTMLFormElement);

    // @ts-ignore
    for (const pair of formData.entries()) {
      inputValues.push(arrayToObject(pair));
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

  //@ts-ignore
  function arrayToObject(arr) {
    let obj = {};
    if (arr.length >= 2) {
      //@ts-ignore
      obj[arr[0]] = arr[1];
    }
    return obj;
  }

  return (
    <form onSubmit={handleApply} className="max-w-md">
      <RenderSelectedInputFieldComponents components={props.inputFields} />
      <Button>Apply</Button>
    </form>
  );
}
