"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ROUTES } from "@/utils/constants";
import timestampzToReadable from "@/utils/timestampz-to-readable";
import { JobPost } from "@/utils/types";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

export default function JobPostCard(props: {
  data: JobPost;
  isPublic?: boolean;
  domain?: string;
}) {
  return (
    <div className="relative group">
      {!props.isPublic && (
        <Link
          href={`/organization/${props.data.organizations.domain}/jobs/${props.data.id}`}
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
      )}
      <Link
        href={
          props.isPublic
            ? props.domain + "/jobs/" + props.data.id
            : ROUTES.jobs.index + "/" + props.data.id
        }
      >
        <Card className="p-5 space-y-2 capitalize">
          <h3 className="font-semibold">{props.data.role}</h3>
          <div className="flex flex-col md:flex-row space-y-2 justify-between">
            <p>{timestampzToReadable(props.data.created_at)}</p>
            <p>
              {props.data.location_type} {props.data.location}
            </p>
          </div>
        </Card>
      </Link>
    </div>
  );
}
