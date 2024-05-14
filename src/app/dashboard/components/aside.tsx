import {
  Bolt,
  BriefcaseBusiness,
  Shield,
  ShieldHalf,
  Stars,
  TrendingUp,
} from "lucide-react";
import AsideNavItem from "./aside-nav-item";
import { ReactNode } from "react";
import { CookieKeys, ROUTES } from "@/utils/constants";
import Support from "./support";
import UserProfile from "./user-profile";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import cookie from "js-cookie";
import { DBUser } from "@/utils/types";
import { cookies } from "next/headers";
import { Badge } from "@/components/ui/badge";

export default function Aside() {
  const userCookie = cookies().get(CookieKeys.User);
  const parsedUserCookie = JSON.parse(userCookie?.value ?? "{}") as DBUser;
  return (
    <aside className="h-full w-[350px] p-5 flex flex-col justify-between">
      <div className="space-y-10">
        <Link href="/dashboard/overview">
          <h1 className="text-3xl font-black">Onena Hire</h1>
        </Link>
        <div className="space-y-10">
          <ul className="space-y-2">
            {ASIDE_ROUTES.map((route) => (
              <li key={route.route}>
                <AsideNavItem navItem={route} />
              </li>
            ))}
          </ul>
          <hr />
        </div>
        <div>
          {parsedUserCookie.subscription_type !== "PAID" ? (
            <Link href={ROUTES.upgrade}>
              <Button className="w-full" variant="outline">
                <Stars size={15} />
                Upgrade your plan
              </Button>
            </Link>
          ) : (
            <Badge
              className="bg-primary text-primary-foreground"
              variant="outline"
            >
              Pro user
            </Badge>
          )}
          <UserProfile />
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
  // {
  //   label: "Overview",
  //   route: ROUTES.overview,
  //   icon: <TrendingUp size={20} />,
  // },
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
