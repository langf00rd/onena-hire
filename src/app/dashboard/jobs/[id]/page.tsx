import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import getJobPostLink from "@/utils/get-job-post-link";
import { createClient } from "@/utils/supabase/server";
import { JobApplication, JobPost, PageProps } from "@/utils/types";
import { ExternalLink, Share2 } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";
import { LinkCopyButton } from "../../components/link-copy-button";
import PageInfo from "../../components/page-info";
import RenderOnClient from "../../components/render-on-client";
import { ApplicantsTable } from "../../components/tables/applicants";
import DeleteJobPostDialog from "../new/components/delete-job-post-dialog";

export default async function Page(props: PageProps) {
  const supabase = createClient();
  const headersList = headers();

  const { data, error } = await supabase
    .from("job_posts")
    .select(
      `
      id,
      role,
      input_fields,
      requirements,
      responsibilities,
      poster,
      description,
      organization,
      custom_sections,
      input_fields,
      organizations(id,domain)
    `,
    )
    .eq("id", props.params.id);

  if (error) return <p>{error.message}</p>;

  if (data.length < 1) return <p>Job post not found</p>;

  let { data: applications, error: applicationsError } = await supabase
    .from("applications")
    .select()
    .eq("job_post", props.params.id);

  if (applicationsError) return <p>{applicationsError.message}</p>;

  const jobPostData: JobPost = data[0] as unknown as JobPost;

  const shareableJobPostLink = `https://${headersList.get("host")}${getJobPostLink(
    jobPostData.id,
    jobPostData.organizations.domain,
  )}`;

  return (
    <>
      <PageInfo
        showBackButton
        title={jobPostData.role}
        actionButtons={
          <div className="flex gap-5">
            {props.params && jobPostData.organizations && (
              <Link
                href={getJobPostLink(
                  jobPostData.id,
                  jobPostData.organizations.domain,
                )}
                target="_blank"
              >
                <Button variant="secondary">
                  <ExternalLink size={15} />
                  View job post
                </Button>
              </Link>
            )}
            <Popover>
              <PopoverTrigger>
                <Button variant="secondary">
                  <Share2 size={15} />
                  Share
                </Button>
              </PopoverTrigger>
              <PopoverContent className="space-y-5">
                <div className="flex gap-2">
                  <Input value={shareableJobPostLink} />
                  <LinkCopyButton link={shareableJobPostLink} />
                </div>
                {/* <hr />
                <div className="flex items-center justify-evenly">
                  <Twitter />
                  <Linkedin />
                  <Facebook />
                </div> */}
              </PopoverContent>
            </Popover>
          </div>
        }
      />
      <Tabs defaultValue="applicatins" className="mt-5">
        <TabsList>
          <TabsTrigger value="applicatins">Applications</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="applicatins">
          <RenderOnClient>
            <ApplicantsTable
              schema={jobPostData.input_fields}
              data={getFormattedInputFieldValues(
                applications as JobApplication[],
              )}
            />
          </RenderOnClient>
        </TabsContent>
        <TabsContent value="settings">
          <div className="mt-5">
            <div className="bg-destructive/10 flex items-center justify-between p-5 rounded-lg">
              <div>
                <h3>Terminate this job post</h3>
                <p>
                  This will permanently delete your job post and remove all
                  related data from our servers, including applications
                </p>
              </div>
              <DeleteJobPostDialog jobPostID={jobPostData.id} />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
}

function getFormattedInputFieldValues(data: JobApplication[]) {
  const jobApplications: Record<string, unknown>[] = [];
  for (const jobApplication of data) {
    let obj = jobApplication.input_values.reduce((accumulator, current) => {
      return { ...accumulator, ...current };
    }, {});
    jobApplications.push(obj);
  }
  return jobApplications;
}
