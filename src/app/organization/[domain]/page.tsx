import { createClient } from "@/utils/supabase/server";
import { Organization, PageProps } from "@/utils/types";
import JobPostGrid from "../components/job-posts-grid";

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
      <div className="max-w-5xl p-10 mx-auto space-y-10">
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
    </>
  );
}
