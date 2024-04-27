import PageInfo from "@/app/dashboard/components/page-info";
import ApplicationForm from "@/app/organization/components/application-form";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/server";
import { JobPost, PageProps } from "@/utils/types";
import { Check } from "lucide-react";
import Link from "next/link";

export default async function Page(props: PageProps) {
  const supabase = createClient();
  const jobID = props.params.jobID as string;
  const domain = props.params.domain as string;

  const { data, error } = await supabase
    .from("job_posts")
    .select()
    .eq("id", props.params.jobID);

  if (error) return <p>{error.message}</p>;

  const jobPostData: JobPost = data[0] as unknown as JobPost;

  return (
    <>
      <div className="max-w-4xl p-10 mx-auto space-y-10" id="public-job-desc">
        <div className="space-y-10">
          <PageInfo
            title={jobPostData.role}
            actionButtons={
              <Link href="#apply">
                <Button>Apply for this job</Button>
              </Link>
            }
          />
          <p>{jobPostData.description}</p>
          <div className="space-y-4">
            <h2 className="text-xl">Requirements</h2>
            <ul className="space-y-2">
              {jobPostData.requirements.map((requirement, index) => (
                <li key={index} className="flex items-center gap-2">
                  <Check size={15} />
                  <p>{requirement}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <h2 className="text-xl">Responsibilities</h2>
            <ul className="space-y-2">
              {jobPostData.requirements.map((requirement, index) => (
                <li key={index} className="flex items-center gap-2">
                  <Check size={15} />
                  <p>{requirement}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div id="apply">
          <h1 className="text-2xl mb-5">Apply for this role</h1>
          <ApplicationForm
            domain={domain}
            jobPostID={jobID}
            inputFields={jobPostData.input_fields}
          />
        </div>
      </div>
    </>
  );
}
