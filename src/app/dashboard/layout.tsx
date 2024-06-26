import type { Metadata } from "next";
import Aside from "./components/aside";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Onena Hire | Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen flex">
      <Toaster />
      <Aside />
      <div className="w-full p-5 overflow-y-scroll">{children}</div>
    </div>
  );
}
