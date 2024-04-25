"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { ROUTES } from "@/utils/constants";
import { JobPost } from "@/utils/types";
import { ExternalLink, Loader } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import PageInfo from "../components/page-info";

export default function Page() {
  const [jobPosts, setJobPosts] = useState<JobPost[] | null>(null);

  /** fetch user's job posts from the `/api/job-posts` endpoint */
  async function fetchJobPosts() {
    const response = await fetch("/api/job-posts");
    const body: { message: string; data: JobPost[] } = await response.json();

    if (response.status !== 200) {
      setJobPosts([]);
      return toast({ description: body.message });
    }

    setJobPosts(body.data);
  }

  useEffect(() => {
    fetchJobPosts();
  }, []);

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
      {jobPosts ? (
        <>
          {jobPosts.length < 1 && (
            <div className="flex items-center justify-center py-32">
              <p>You have no job posts</p>
            </div>
          )}
          <ul className="grid grid-cols-3 gap-5">
            {jobPosts.map((post, index) => (
              <li key={index} className="relative group">
                <Link
                  href={`/${post.organization}`}
                  target="_blank"
                  className="hidden group-hover:block"
                >
                  <Button
                    size="icon"
                    variant="secondary"
                    className="shadow-lg bg-white border absolute -right-3 -top-3 rounded-full"
                  >
                    <ExternalLink size={18} />
                  </Button>
                </Link>
                <Link href={ROUTES.jobs.index + "/" + post.id}>
                  <Card className="p-5 space-y-2">
                    <h3 className="font-semibold">{post.role}</h3>
                    <p>{post.requirements.length}</p>
                    <div className="flex items-center justify-between">
                      <p>{post.created_at}</p>
                      <p>1003 applicants</p>
                    </div>
                  </Card>
                </Link>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <div className="flex items-center justify-center py-32">
          <Loader className="animate-spin" />
        </div>
      )}
    </div>
  );
}
