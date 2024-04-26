"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { ROUTES } from "@/utils/constants";
import { DBUser, JobPost } from "@/utils/types";
import { Loader } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import PageInfo from "../components/page-info";
import { createClient } from "@/utils/supabase/client";
import cookie from "js-cookie";
import JobPostCard from "@/components/job-post-card";

export default function Page() {
  const [jobPosts, setJobPosts] = useState<JobPost[] | null>(null);

  async function fetchJobPosts() {
    const userCookie = cookie.get("db_user");

    if (!userCookie) {
      return toast({
        description: "please login again",
      });
    }

    const parsedUserCookie: DBUser = JSON.parse(userCookie);

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

  console.log(jobPosts);

  return (
    <div className="space-y-5">
      <PageInfo
        title="Your job postings"
        actionButtons={
          <Link href={ROUTES.jobs.new}>
            <Button>Create new job</Button>
          </Link>
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
