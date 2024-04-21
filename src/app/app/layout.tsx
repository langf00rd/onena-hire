import type { Metadata } from "next";
import Aside from "./components/aside";

export const metadata: Metadata = {
  title: "app",
  description: "dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen flex">
      <Aside />
      <div className="w-full p-10">{children}</div>
    </div>
  );
}
