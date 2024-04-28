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

  useEffect(() => {
    const searchResults = props.jobPosts.filter((a: JobPost) =>
      a.role.toLowerCase().includes(query),
    );
    setFilteredJobPosts(searchResults);
  }, [query, props.jobPosts]);

  return (
    <>
      <div className="flex items-center gap-5 bg-zinc-50 max-w-md pr-5 p-2 rounded-md">
        <Input
          onChange={(e) => setQuery(e.target.value)}
          className="border-0 text-md outline-none ring-0 bg-transparent"
          placeholder={`Search from ${props.jobPosts.length} open positions`}
        />
        <Search size={20} />
      </div>
      <ul className="grid md:grid-cols-2 gap-5">
        {(filteredJobPosts ?? (props.jobPosts as unknown as JobPost[])).map(
          (post) => (
            <JobPostCard
              domain={props.domain as string}
              isPublic
              data={post}
              key={post.id}
            />
          ),
        )}
      </ul>
    </>
  );
}
