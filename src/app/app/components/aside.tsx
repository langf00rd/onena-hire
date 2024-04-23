import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bolt, BriefcaseBusiness, TrendingUp } from "lucide-react";
import AsideNavItem from "./aside-nav-item";
import { Button } from "@/components/ui/button";
import { ReactNode } from "react";
import { ROUTES } from "@/utils/constants";
import Support from "./support";

export default function Aside() {
  return (
    <aside className="h-full w-[370px] p-10 flex flex-col justify-between">
      <div className="space-y-10">
        <h1 className="text-3xl font-black">Onena Hire</h1>
        <div className="space-y-10">
          <ul className="space-y-2">
            {ASIDE_ROUTES.map((route) => (
              <li key={route.route}>
                <AsideNavItem navItem={route} />
              </li>
            ))}
          </ul>
          <hr />
          <div>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1" className="border-0 px-3 -mt-6">
                <AccordionTrigger>
                  <div className="flex items-center gap-2">
                    <Avatar className="w-7 h-7">
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <p>langford</p>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="p-0">
                  <Button className="w-full" variant="ghost">
                    Sign out
                  </Button>
                  <Button variant="ghost" className="w-full">
                    Referral
                  </Button>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
      <Support />
    </aside>
  );
}

export const ASIDE_ROUTES: {
  label: string;
  route: string;
  icon?: ReactNode;
}[] = [
  {
    label: "Overview",
    route: ROUTES.overview,
    icon: <TrendingUp size={20} />,
  },
  {
    label: "Jobs",
    route: ROUTES.jobs.index,
    icon: <BriefcaseBusiness size={20} />,
  },
  {
    label: "Settings",
    route: ROUTES.settings,
    icon: <Bolt size={20} />,
  },
];
