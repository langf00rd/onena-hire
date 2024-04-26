import JobPostCard from "@/components/job-post-card";
import { createClient } from "@/utils/supabase/server";
import { JobPost, PageProps } from "@/utils/types";

export default async function Page(props: PageProps) {
  const supabase = createClient();

  const { data: job_posts } = await supabase.from("job_posts").select();
  const { data: organization } = await supabase
    .from("organizations")
    .select()
    .eq("domain", props.params.domain);

  return (
    <>
      <div className="max-w-5xl p-10 mx-auto space-y-10">
        {organization && organization[0] && (
          <h1 className="text-2xl md:text-3xl font-bold">
            {organization[0].name}
          </h1>
        )}
        {!job_posts ? (
          <></>
        ) : (
          <ul className="grid md:grid-cols-2 gap-5">
            {(job_posts as unknown as JobPost[]).map((post) => (
              <JobPostCard
                domain={props.params.domain as string}
                isPublic
                data={post}
                key={post.id}
              />
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
