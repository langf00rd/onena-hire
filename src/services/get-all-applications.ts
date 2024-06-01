import { CookieKeys } from "@/utils/constants";
import { createClient } from "@/utils/supabase/client";
import { DBUser, JobApplication, JobPost } from "@/utils/types";
import { cookies } from "next/headers";

export async function getAllApplications(): Promise<{
  applications: JobApplication[];
  jobPosts: JobPost[];
}> {
  const user = JSON.parse(
    cookies().get(CookieKeys.User)?.value ?? "{}",
  ) as DBUser;

  if (!user) throw "User not found";

  const supabase = createClient();

  let { data: orgPosts, error: orgPostsError } = await supabase
    .from("job_posts")
    .select("*")
    .eq("organization", user.organization);

  if (orgPostsError) throw orgPostsError.message;

  const postIDs = orgPosts?.map((post) => post.id) ?? [];

  let { data: applications, error: applicationsError } = await supabase
    .from("applications")
    .select("*")
    .in("job_post", postIDs);

  if (applicationsError) throw applicationsError.message;

  return {
    applications: applications ?? [],
    jobPosts: orgPosts ?? [],
  };
}
