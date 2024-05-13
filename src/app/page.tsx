import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import WidthConstraint from "@/components/width-constraint";
import { ROUTES } from "@/utils/constants";
import { createClient } from "@/utils/supabase/server";
import { BarChart, Globe, Grid, Pencil, Search, Stars } from "lucide-react";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default async function Home() {
  const headersList = headers();
  const shareableJobPostLink = `https://${headersList.get("host")}/organization/onena-hire/`;
  const supabase = createClient();

  return (
    <main>
      <Link
        href="/"
        className="fixed z-20 shadow-xl top-5 left-5 bg-primary px-3 py-1 rounded-lg"
      >
        <h1 className="text-xl font-black text-primary-foreground">
          Onena Hire
        </h1>
      </Link>
      <WidthConstraint className="gap-7 flex flex-col items-center justify-center text-center pt-32 px-10 md:px-0">
        <h1 className="text-3xl md:text-4xl">Hire The Best, Fast</h1>
        <p className="md:text-xl max-w-2xl">
          Track &amp; manage job applications, create career pages, and analyze
          job applicants to ensure you hire only the best people
        </p>
        <div className="flex items-center gap-3">
          <Link href={ROUTES.auth.signIn}>
            {(await supabase.auth.getUser()).data.user ? (
              <Link href={ROUTES.jobs.index}>
                <Button>Go to dashboard</Button>
              </Link>
            ) : (
              <Link href={ROUTES.auth.signUp}>
                <Button>Try for free</Button>
              </Link>
            )}
          </Link>
          <Link target="_blank" href={shareableJobPostLink}>
            <Button variant="secondary">View demo</Button>
          </Link>
        </div>
        <Image
          src="/assets/landing-page/dashboard-home-1.png"
          alt="screenshot of dashboard home"
          className="border rounded-3xl p-5 bg-white mt-5 hidden md:block shadow-[rgba(0,_0,_0,_0.1)_0px_10px_50px_-5px]"
          width={1000}
          height={1000}
        />
      </WidthConstraint>
      <div className="bg-zinc-50 py-20 px-10 mt-20 md:-mt-10 md:pt-32">
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
      <div className="hidden md:flex items-center flex-col justify-center mt-20 px-20">
        <Carousel>
          <CarouselContent>
            {[
              {
                src: "/assets/landing-page/applications-1.png",
                alt: "screenshot of applications table",
              },
              {
                src: "/assets/landing-page/create-job-post-1.png",
                alt: "screenshot of page to enter job post details",
              },
              {
                src: "/assets/landing-page/form-builder.png",
                alt: "screenshot of application form builder page",
              },
            ].map((shot) => (
              <CarouselItem key={shot.src} className="max-w-4xl">
                <Image
                  src={shot.src}
                  alt={shot.alt}
                  className="border rounded-3xl p-5 bg-white"
                  width={1000}
                  height={1000}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
      <div>
        <div className="py-32 px-10 max-w-4xl mx-auto space-y-10">
          <h1 className="text-center text-2xl">
            Choose a plan that works for you
          </h1>
          <ul className="grid md:grid-cols-2 gap-10">
            {[
              {
                name: "Free",
                price: 0,
                features: [
                  "3 job posts",
                  "10,000 application submissions",
                  "24/7 support",
                ],
              },
              {
                name: "Lite",
                top: true,
                price: 10,
                subscriptionPage: "https://paystack.com/pay/onena-lite-sub",
                features: [
                  "10 job posts",
                  "50,000 application submissions",
                  "Custom domain connection",
                  "24/7 support",
                  "More customizations",
                ],
              },
              {
                name: "Pro",
                price: 30,
                subscriptionPage: "https://paystack.com/pay/onena-pro-sub",
                features: [
                  "Unlimited job posts",
                  "Unlimited application submissions",
                  "Custom domain connection",
                  "24/7 support",
                  "More customizations",
                ],
              },
            ].map((plan) => (
              <li
                className="border p-5 flex flex-col justify-between gap-10 rounded-xl"
                key={plan.name}
              >
                <div className="flex items-center justify-between">
                  <p className="text-2xl flex gap-3 items-center">
                    {plan.name}
                    {plan.top && <Badge variant="outline">Best option</Badge>}
                  </p>
                  <h1 className="text-3xl">${plan.price}</h1>
                </div>
                <ul className="space-y-2">
                  {plan.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
                <Link
                  href={plan.subscriptionPage ?? "#"}
                  target="_blank"
                  className="w-full"
                >
                  <Button variant="outline" className="w-full">
                    Choose this
                  </Button>
                </Link>
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
