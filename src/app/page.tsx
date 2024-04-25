import { Button } from "@/components/ui/button";
import Link from "next/link";
import Header from "./dashboard/components/header";
import WidthConstraint from "@/components/width-constraint";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <WidthConstraint className="flex flex-col gap-4">
          <h1>ONENA HIRE</h1>
          <ul>
            <li>create a job post</li>
            <li>see applicants</li>
            <li>use AI to find best applicant(s)</li>
          </ul>
          <Button asChild className="max-w-[200px]">
            <Link href="/dashboard/jobs">Go to app</Link>
          </Button>
        </WidthConstraint>
      </main>
    </>
  );
}
