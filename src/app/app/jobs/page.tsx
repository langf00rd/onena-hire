import { Card } from "@/components/ui/card";
import { ROUTES } from "@/utils/constants";
import Link from "next/link";
import PageInfo from "../components/page-info";
import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    <div className="space-y-5">
      <PageInfo
        title="Your job postings"
        description="These is a list of all the jobs you've posted via onena hire"
        actionButtons={
          <Link href={ROUTES.jobs.new}>
            <Button>Create new job</Button>
          </Link>
        }
      />
      <ul className="grid grid-cols-3 gap-5">
        {Array.from({ length: 4 }).map((_, index) => (
          <li key={index}>
            <Link href={ROUTES.jobs.index + "/" + index}>
              <Card className="p-5 bg-zinc-50 space-y-2">
                <h3 className="font-semibold">Senior software engineer</h3>
                <p>5 requirements</p>
                <p>No hidden constraints</p>
                <div className="flex items-center justify-between">
                  <p>13 Aug, 2024</p>
                  <p>1003 applicants</p>
                </div>
              </Card>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
