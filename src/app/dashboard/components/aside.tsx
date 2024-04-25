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
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function Aside() {
  return (
    <aside className="h-full w-[450px] p-10 flex flex-col justify-between">
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
      <Card className="p-5 space-y-5 shadow-md">
        <p>Got feedback or need support?</p>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-full">Send us a message</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>Talk to us</DialogTitle>
            <DialogDescription>
              Someone from our team will contact you via your email
            </DialogDescription>
            <form>
              <fieldset>
                <Label>Choose category</Label>
                <Select required>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder={SUPPORT_CATEGORIES[0]} />
                  </SelectTrigger>
                  <SelectContent>
                    {SUPPORT_CATEGORIES.map((item) => (
                      <SelectItem key={item} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </fieldset>
              <fieldset>
                <Label>Your email</Label>
                <Input required type="email" placeholder="john@acme.co" />
              </fieldset>
              <fieldset>
                <Label>Message</Label>
                <Textarea required placeholder="Type your message here..." />
              </fieldset>
              <DialogFooter>
                <Button>Send</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </Card>
    </aside>
  );
}

const SUPPORT_CATEGORIES = ["Feedback", "Issue"];

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
