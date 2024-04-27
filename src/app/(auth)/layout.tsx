import React, { ReactNode } from "react";
import Header from "../dashboard/components/header";
import { Toaster } from "@/components/ui/toaster";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ROUTES } from "@/utils/constants";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div className="hidden md:block">
        <Header />
      </div>
      <Toaster />
      <div className="hidden md:block">{children}</div>
      <div className="space-y-5 md:hidden px-10 py-32">
        <h1 className="text-2xl">Support for mobile devices coming soon</h1>
        <p>Please use on a larger device</p>
        <Link href={ROUTES.index} className="block">
          <Button>Go home</Button>
        </Link>
      </div>
    </>
  );
};

export default Layout;
