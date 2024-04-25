"use client";

import { Input } from "@/components/ui/input";
import PageInfo from "../../components/page-info";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, Copy, FileDown, Plus, Stars, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { JOB_POST_SECTIONS } from "@/utils/constants";

export default function Page() {
  const [newRequirement, setNewRequirement] = useState("");
  const [requirements, setRequirements] = useState<string[]>([]);
  const [newResponsibility, setNewResponsibility] = useState("");
  const [responsibilities, setResponsibilities] = useState<string[]>([]);

  function addRequirement() {
    if (!newRequirement.trim()) return;
    setRequirements((prev) => [...prev, newRequirement]);
    setNewRequirement("");
  }

  function removeRequirement(value: string) {
    setRequirements(requirements.filter((a) => a !== value));
  }

  function addResponsibility() {
    if (!newResponsibility.trim()) return;
    setResponsibilities((prev) => [...prev, newResponsibility]);
    setNewResponsibility("");
  }

  function removeResponsibility(value: string) {
    setResponsibilities(responsibilities.filter((a) => a !== value));
  }

  function handleFormSubmission(e: FormEvent) {
    e.preventDefault();
  }

  return (
    <>
      <PageInfo
        showBackButton
        title="Create new job"
        actionButtons={<GenerateWithAIDialog />}
      />
      <form onSubmit={handleFormSubmission} className="mt-10 max-w-xl">
        <fieldset>
          <Label className="text-black">Job title</Label>
          <Input placeholder="Software Engineer" />
        </fieldset>
        <fieldset>
          <Label className="text-black">Description</Label>
          <Textarea placeholder="Share some info about your company (eg, values, mission & vision, etc) and info about this role" />
        </fieldset>
        <fieldset>
          <Label className="text-black">Requirements</Label>
          <ul className="space-y-3">
            {requirements.map((requirement) => (
              <li
                key={requirement}
                className="flex items-center justify-between"
              >
                <div className="flex gap-2 items-center">
                  <Check size={10} />
                  <p>{requirement}</p>
                </div>
                <Button
                  onClick={() => removeRequirement(requirement)}
                  size="icon"
                  className="hover:text-destructive"
                  variant="outline"
                >
                  <X size={15} />
                </Button>
              </li>
            ))}
          </ul>
          <div className="flex gap-3">
            <Input
              value={newRequirement}
              onChange={(e) => setNewRequirement(e.target.value)}
              placeholder="Degree in Computer Science or a relevant field"
            />
            <Button variant="secondary" onClick={addRequirement}>
              <Plus size={15} />
              Add
            </Button>
          </div>
        </fieldset>
        <fieldset>
          <Label className="text-black">Responsibilities</Label>
          <ul className="space-y-3">
            {responsibilities.map((responsibility) => (
              <li
                key={responsibility}
                className="flex items-center justify-between"
              >
                <div className="flex gap-2 items-center">
                  <Check size={10} />
                  <p>{responsibility}</p>
                </div>
                <Button
                  onClick={() => removeResponsibility(responsibility)}
                  size="icon"
                  className="hover:text-destructive"
                  variant="outline"
                >
                  <X size={15} />
                </Button>
              </li>
            ))}
          </ul>
          <div className="flex gap-3">
            <Input
              value={newResponsibility}
              onChange={(e) => setNewResponsibility(e.target.value)}
              placeholder="Write technical documentation"
            />
            <Button variant="secondary" onClick={addResponsibility}>
              <Plus size={15} />
              Add
            </Button>
          </div>
        </fieldset>
        <fieldset>
          <Label className="text-black">
            Please enter any extra information you want to show on the job post
          </Label>
          <Textarea placeholder="Talk about any other thing, eg. salary, interview stages, etc" />
        </fieldset>
        <div className="space-x-3">
          <Button>Create</Button>
          <Button variant="secondary">Save as draft</Button>
        </div>
      </form>
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
