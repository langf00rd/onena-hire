import { Button } from "@/components/ui/button";
import WidthConstraint from "@/components/width-constraint";
import { ROUTES } from "@/utils/constants";
import { BarChart, Globe, Grid, Pencil, Search, Stars } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";

export default function Home() {
  const headersList = headers();
  const shareableJobPostLink = `https://${headersList.get("host")}/organization/onena-hire/`;
  return (
    <main>
      <WidthConstraint className="gap-5 flex flex-col items-center justify-center text-center h-[50vh] px-10 md:px-0">
        <Link href="/" className="bg-primary px-3 py-1 rounded-lg">
          <h1 className="text-xl font-black text-primary-foreground">
            Onena Hire
          </h1>
        </Link>
        <h1 className="text-3xl md:text-4xl">Hire the best, fast</h1>
        <p className="md:text-xl max-w-2xl">
          Track &amp; manage job applications, create career pages, and analyze
          job applicants to ensure you hire only the best people
        </p>
        <div className="flex items-center gap-3">
          <Link href={ROUTES.auth.signIn}>
            <Button>
              <Stars size={15} />
              Get started for free
            </Button>
          </Link>
          <Link target="_blank" href={shareableJobPostLink}>
            <Button variant="secondary">View demo</Button>
          </Link>
        </div>
      </WidthConstraint>
      <div className="bg-zinc-50 py-20 px-10">
        <div className="max-w-4xl mx-auto h-full flex items-center justify-center">
          <ul className="grid md:grid-cols-3 gap-20 md:gap-10">
            {[
              {
                title: "Minimal interface",
                description:
                  "Our intuitive interface makes the use of our software enjoyable",
                icon: <Pencil />,
              },
              {
                title: "Track applications",
                description:
                  "Leverage our suite of application tracking tools to get you the best candidates",
                icon: <Search />,
              },
              {
                title: "Connect your domain",
                description:
                  "Look professional by connecting your company's domain to your career page",
                icon: <Globe />,
              },
              {
                title: "In-depth analytics",
                description:
                  "Gain in-depth insights on your applications to make data-driven decisions",
                icon: <BarChart />,
              },
              {
                title: "Custom form builder",
                description:
                  "Add as many fields to your job application. More data, more confidence",
                icon: <Grid />,
              },
            ].map((item) => (
              <li className="space-y-3" key={item.title}>
                {item.icon}
                <h3 className="text-xl">{item.title}</h3>
                <p>{item.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="h-[10vh] bg-white text-center flex flex-col items-center justify-center">
        <p>All Rights Reserved. Onena HQ. &copy;{new Date().getFullYear()}</p>
      </div>
    </main>
  );
}
