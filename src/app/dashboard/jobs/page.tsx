"use client";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { FREE_JOB_POST_CREDITS, ROUTES } from "@/utils/constants";
import { DBUser, JobPost } from "@/utils/types";
import { Loader } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import PageInfo from "../components/page-info";
import { createClient } from "@/utils/supabase/client";
import cookie from "js-cookie";
import JobPostCard from "@/components/job-post-card";

export default function Page() {
  const userCookie = cookie.get("db_user");
  const parsedUserCookie: DBUser = JSON.parse(userCookie ?? "{}");
  const [jobPosts, setJobPosts] = useState<JobPost[] | null>(null);

  async function fetchJobPosts() {
    if (!userCookie) {
      return toast({
        description: "please login again",
      });
    }

    const supabase = createClient();

    let { data: job_posts, error } = await supabase
      .from("job_posts")
      .select(
        `
        role,
        id,
        description,
        created_at,
        updated_at,
        organization,
        organizations(name,domain)
      `,
      )
      .eq("poster", parsedUserCookie.id);

    if (error) {
      return toast({
        description: error.message,
      });
    }

    setJobPosts(job_posts as any);
  }

  useEffect(() => {
    fetchJobPosts();
  }, []);

  const remainingJobPostCredits =
    FREE_JOB_POST_CREDITS - (jobPosts ?? []).length;

  return (
    <div className="space-y-5">
      <PageInfo
        title="Your job postings"
        actionButtons={
          parsedUserCookie.subscription_type !== "PAID" ? (
            <div className="flex items-center gap-3">
              <p>You have {remainingJobPostCredits} job post credits left</p>
              <Button disabled={remainingJobPostCredits === 0}>
                <Link href={ROUTES.jobs.new}>Create new job </Link>
              </Button>
            </div>
          ) : (
            <Button>
              <Link href={ROUTES.jobs.new}>Create new job </Link>
            </Button>
          )
        }
      />
      {!jobPosts ? (
        <div className="flex items-center justify-center py-32">
          <Loader className="animate-spin" />
        </div>
      ) : (
        <>
          {jobPosts.length < 1 && (
            <div className="flex items-center justify-center py-32">
              <p>You have no job posts</p>
            </div>
          )}
          <ul className="grid grid-cols-3 gap-5">
            {jobPosts.map((post) => (
              <JobPostCard data={post} key={post.id} />
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
