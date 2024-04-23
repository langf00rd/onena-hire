import { Button } from "@/components/ui/button";
import WidthConstraint from "@/components/width-constraint";
import Link from "next/link";
import React from "react";

export default function Header() {
  return (
    <header>
      <WidthConstraint className=" flex gap-4 items-center py-4 justify-between">
        <Link href="/">
          <h1 className="text-3xl font-black">Onena Hire</h1>
        </Link>
        <div className="gap-4 flex">
          <Button className="bg-gray-100 text-black hover:bg-gray-200" asChild>
            <Link href="/sign-in">Login</Link>
          </Button>
          <Button>
            <Link href="/sign-up">Sign up</Link>
          </Button>
        </div>
      </WidthConstraint>
    </header>
  );
}
