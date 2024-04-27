import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Check, Loader, Plus, X } from "lucide-react";
import { FormEvent, useState } from "react";
import { ApplicationJobPost, DBUser, JobPost } from "@/utils/types";
import cookie from "js-cookie";

export default function JobPostForm(props: {
  onContinue: (formData: ApplicationJobPost) => void;
}) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
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

  async function handleFormSubmission(e: FormEvent) {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const role = formData.get("role")?.toString();
    const description = formData.get("description")?.toString();

    const userCookie = cookie.get("db_user");

    if (!userCookie) {
      return toast({
        description: "please login again",
      });
    }

    const parsedUserCookie: DBUser = JSON.parse(userCookie);

    props.onContinue({
      role: role!,
      description: description!,
      responsibilities,
      requirements,
      organization: Number(parsedUserCookie.organization),
      poster: Number(parsedUserCookie.id),
    });
  }

  return (
    <form onSubmit={handleFormSubmission}>
      <fieldset>
        <Label htmlFor="role" className="text-black">
          Job title
        </Label>
        <Input name="role" placeholder="Software Engineer" />
      </fieldset>
      <fieldset>
        <Label htmlFor="description" className="text-black">
          Description
        </Label>
        <Textarea
          name="description"
          placeholder="Share some info about your company (eg, values, mission & vision, etc) and info about this role"
        />
      </fieldset>
      <fieldset>
        <Label className="text-black">Requirements</Label>
        <ul className="space-y-3">
          {requirements.map((requirement) => (
            <li key={requirement} className="flex items-center justify-between">
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
          <Button type="button" variant="secondary" onClick={addRequirement}>
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
          <Button type="button" variant="secondary" onClick={addResponsibility}>
            <Plus size={15} />
            Add
          </Button>
        </div>
      </fieldset>
      <fieldset>
        <Label htmlFor="more" className="text-black">
          Please enter any extra information you want to show on the job post
        </Label>
        <Textarea
          name="more"
          placeholder="Talk about any other thing, eg. salary, interview stages, etc"
        />
      </fieldset>
      <Button>
        {isLoading ? <Loader className="animate-spin" /> : "Continue"}
      </Button>
    </form>
  );
}
