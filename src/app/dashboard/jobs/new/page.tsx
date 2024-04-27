"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { JOB_POST_SECTIONS } from "@/utils/constants";
import {
  ApplicationJobPost,
  InputFieldComponentProps,
  JobPost,
} from "@/utils/types";
import { ArrowLeft, Copy, FileDown, Stars } from "lucide-react";
import { useState } from "react";
import PageInfo from "../../components/page-info";
import ApplicationFormBuilder from "./components/application-form-builder";
import JobPostForm from "./components/job-post-form";
import { createClient } from "@/utils/supabase/client";
import { toast } from "@/components/ui/use-toast";

export default function Page() {
  const [showJobPostForm, setShowJobPostForm] = useState(false);
  const [formData, setFormData] = useState<null | ApplicationJobPost>(null);

  function onApplicationFormFilled(formData_: ApplicationJobPost) {
    setFormData(formData_);
    setShowJobPostForm(true);
  }

  async function handleCreateJobPost(inputFields: InputFieldComponentProps[]) {
    const supabase = createClient();
    const queryPayload = { ...formData, input_fields: inputFields };

    const { error } = await supabase.from("job_posts").insert([queryPayload]);

    if (error) {
      return toast({ description: error.message });
    }

    toast({ description: "job post created!" });
  }

  return (
    <>
      <PageInfo
        showBackButton
        title="Create new job"
        actionButtons={<GenerateWithAIDialog />}
      />
      <br />
      {showJobPostForm ? (
        <div className="space-y-5 max-w-[800px] mx-auto">
          <ApplicationFormBuilder onSubmit={handleCreateJobPost} />
          <div className="flex gap-3">
            <Button
              variant="secondary"
              onClick={() => setShowJobPostForm(false)}
            >
              <ArrowLeft size={15} />
              Go back to job post form
            </Button>
          </div>
        </div>
      ) : (
        <div className="max-w-xl mx-auto">
          <JobPostForm onContinue={onApplicationFormFilled} />
        </div>
      )}
    </>
  );
}

function GenerateWithAIDialog() {
  return (
    <Dialog>
      <DialogTrigger>
        <Button>
          <Stars size={15} />
          Generate with AI
        </Button>
      </DialogTrigger>
      <DialogContent className="space-y-5">
        <DialogTitle>
          Quickly create quality job descriptions with AI
        </DialogTitle>
        <div className="space-y-5">
          <div className="space-y-5">
            <fieldset>
              <Label>Describe the job</Label>
              <Textarea placeholder="" />
            </fieldset>
            <fieldset>
              <Label>Choose section</Label>
              <Select>
                <SelectTrigger className="w-[180px] capitalize">
                  <SelectValue placeholder={JOB_POST_SECTIONS[0]} />
                </SelectTrigger>
                <SelectContent>
                  {JOB_POST_SECTIONS.map((section) => (
                    <SelectItem
                      key={section}
                      value={section}
                      className="capitalize"
                    >
                      {section}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </fieldset>
            <Button>Generate</Button>
          </div>
          <hr />
          <div>
            <h2>Result</h2>
            <p>
              We are looking for a Full Stack Developer to produce scalable
              software solutions. Youll be part of a cross-functional team
              that’s responsible for the full software development life cycle,
              from conception to deployment. As a Full Stack Developer, you
              should be comfortable around both front-end and back-end coding
              languages, development frameworks and third-party libraries. You
              should also be a team player with a knack for visual design and
              utility.
            </p>
          </div>
        </div>
        <DialogFooter>
          <Button variant="secondary">
            <Copy size={15} />
            Copy
          </Button>
          <Button variant="secondary">
            <FileDown size={15} />
            Insert
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
