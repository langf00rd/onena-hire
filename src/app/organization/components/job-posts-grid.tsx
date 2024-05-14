"use client";

import JobPostCard from "@/components/job-post-card";
import { Input } from "@/components/ui/input";
import { JobPost } from "@/utils/types";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";

export default function JobPostGrid(props: {
  jobPosts: JobPost[];
  domain: string;
}) {
  const [query, setQuery] = useState("");
  const [filteredJobPosts, setFilteredJobPosts] = useState<JobPost[] | null>(
    null,
  );

  const jobsToShow =
    filteredJobPosts ?? (props.jobPosts as unknown as JobPost[]);

  useEffect(() => {
    const searchResults = props.jobPosts.filter((a: JobPost) =>
      a.role.toLowerCase().includes(query),
    );
    setFilteredJobPosts(searchResults);
  }, [query, props.jobPosts]);

  return (
    <>
      <div className="flex items-center gap-5 bg-zinc-50 pr-5 p-2 rounded-full">
        <Input
          onChange={(e) => setQuery(e.target.value)}
          className="border-0 text-md outline-none rounded-full ring-0 bg-transparent"
          placeholder={`Search from ${props.jobPosts.length} open positions`}
        />
        <Search size={20} />
      </div>
      {jobsToShow.length < 1 && (
        <p className="text-center">No roles found for {query}</p>
      )}
      <ul className="grid gap-5">
        {jobsToShow.map((post) => (
          <JobPostCard
            domain={props.domain as string}
            isPublic
            data={post}
            key={post.id}
          />
        ))}
      </ul>
    </>
  );
}
