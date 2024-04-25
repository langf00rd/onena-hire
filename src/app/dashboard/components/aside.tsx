import { Bolt, BriefcaseBusiness, TrendingUp } from "lucide-react";
import AsideNavItem from "./aside-nav-item";
import { ReactNode } from "react";
import { ROUTES } from "@/utils/constants";
import Support from "./support";
import UserProfile from "./user-profile";
import Link from "next/link";

export default function Aside() {
  return (
    <aside className="h-full w-[370px] p-10 flex flex-col justify-between">
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
        <UserProfile />
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
