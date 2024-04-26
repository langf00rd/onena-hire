import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1>ONENA HIRE</h1>
      <ul>
        <li>create a job post</li>
        <li>see applicants</li>
        <li>use AI to find best applicant(s)</li>
      </ul>
      <Button asChild>
        <Link href="/dashboard/jobs">Go to app</Link>
      </Button>
    </main>
  );
}
