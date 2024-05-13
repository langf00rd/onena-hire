import { Button } from "@/components/ui/button";
import { ROUTES } from "@/utils/constants";
import Link from "next/link";

export default function Page() {
  return (
    <div className="w-screen px-10 h-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl">Yay! You subscribed to Onena Hire 🎉</h1>;
      <Link href={ROUTES.jobs.index}>
        <Button>Go to dashboard</Button>
      </Link>
    </div>
  );
}
