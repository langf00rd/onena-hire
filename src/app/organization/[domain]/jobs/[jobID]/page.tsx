import PageInfo from "@/app/dashboard/components/page-info";
import ApplicationForm from "@/app/organization/components/application-form";
import { Button } from "@/components/ui/button";
import { MAX_FREE_APPLICATION_RECORDS } from "@/utils/constants";
import { createClient } from "@/utils/supabase/server";
import { DBUser, JobPost, PageProps } from "@/utils/types";
import { Check } from "lucide-react";
import Link from "next/link";

export default async function Page(props: PageProps) {
  const supabase = createClient();
  const jobID = props.params.jobID as string;
  const domain = props.params.domain as string;

  const { data, error } = await supabase
    .from("job_posts")
    .select(
      `
      role,
      description,
      requirements,
      input_fields,
      poster(subscription_type)
      `,
    )
    .eq("id", props.params.jobID);

  if (error) return <p>{error.message}</p>;

  const jobPostData: JobPost = data[0] as unknown as JobPost;

  if (!jobPostData) {
    return (
      <div className="w-screen text-center py-32">
        <h1>This job post does not exist</h1>
      </div>
    );
  }

  const jobPoster = jobPostData.poster as unknown as DBUser;

  let { data: applications, error: fetchApplicationsError } = await supabase
    .from("applications")
    .select()
    .eq("id", Number(props.params.jobID));

  if (fetchApplicationsError) {
    return (
      <div className="w-screen text-center py-32">
        <h1>{fetchApplicationsError.message}</h1>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-4xl p-10 mx-auto space-y-10" id="public-job-desc">
        <div className="space-y-10">
          <PageInfo
            title={jobPostData.role}
            actionButtons={
              <div className="flex gap-5">
                <Link href="#apply">
                  <Button>Apply for this role</Button>
                </Link>
                <Link href={`/organization/${props.params.domain}`}>
                  <Button variant="secondary">Company home</Button>
                </Link>
              </div>
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
          {jobPoster.subscription_type === "FREE" &&
          (applications ?? [])?.length >= MAX_FREE_APPLICATION_RECORDS ? (
            <p>This job post is no longer accepting new applications</p>
          ) : (
            <ApplicationForm
              domain={domain}
              jobPostID={jobID}
              inputFields={jobPostData.input_fields}
            />
          )}
        </div>
      </div>
    </>
  );
}
