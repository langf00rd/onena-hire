"use client";

import Link from "next/link";
import { ASIDE_ROUTES } from "./aside";
import { usePathname } from "next/navigation";

export default function AsideNavItem(props: {
  navItem: (typeof ASIDE_ROUTES)[0];
}) {
  const pathname = usePathname();
  return (
    <div key={props.navItem.route}>
      <Link
        href={props.navItem.route}
        className={`flex items-center hover:bg-accent transition-colors rounded-md p-3 gap-3 ${pathname === props.navItem.route && "bg-accent"}`}
      >
        {props.navItem.icon}
        {props.navItem.label}
      </Link>
    </div>
  );
}
