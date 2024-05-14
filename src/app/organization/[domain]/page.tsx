import { createClient } from "@/utils/supabase/server";
import { Organization, PageProps } from "@/utils/types";
import JobPostGrid from "../components/job-posts-grid";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ROUTES } from "@/utils/constants";
import { Metadata } from "next";

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  return {
    title: (props.params.domain as string).replaceAll("-", " ").toUpperCase(),
  };
}

export default async function Page(props: PageProps) {
  const supabase = createClient();

  const { data: organization, error: organizationError } = await supabase
    .from("organizations")
    .select()
    .eq("domain", props.params.domain);

  if (organizationError) return <p>{organizationError.message}</p>;

  if (organization.length < 1)
    return <p className="text-center py-32">Organization does not exist</p>;

  const organizationData = organization as unknown as Organization[];

  const { data: jobPosts, error: jobPostError } = await supabase
    .from("job_posts")
    .select()
    .eq("organization", organizationData[0].id);

  if (jobPostError) return <p>{jobPostError.message}</p>;

  return (
    <>
      <div className="max-w-[500px] p-5 mx-auto space-y-5">
        {organization && organization[0] && (
          <h1 className="text-2xl md:text-3xl font-bold">
            {organization[0].name}
          </h1>
        )}

        {jobPosts && jobPosts.length < 1 && <p>No open roles</p>}

        {!jobPosts ? (
          <></>
        ) : (
          <>
            <JobPostGrid
              domain={String(props.params.domain)}
              jobPosts={jobPosts}
            />
          </>
        )}
      </div>
      <div className="flex items-center justify-center mb-32">
        <Link href={ROUTES.index}>
          <Button variant="outline">Built with Onena Hire</Button>
        </Link>
      </div>
    </>
  );
}
