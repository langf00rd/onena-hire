import React, { ReactNode } from "react";
import Header from "../dashboard/components/header";
import { Toaster } from "@/components/ui/toaster";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header />
      <Toaster />
      {children}
    </>
  );
};

export default Layout;
