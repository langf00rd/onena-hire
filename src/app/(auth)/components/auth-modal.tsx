"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Login from "./login";
import SignUp from "./signup";

const AuthModal = ({ type }: { type: "login" | "signup" }) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"login" | "signup">(type ?? "login");
  const tabs: { name: string; type: "login" | "signup" }[] = [
    {
      name: "Create an account",
      type: "signup",
    },
    {
      name: "Login",
      type: "login",
    },
  ];

  useEffect(() => {
    setActiveTab(type);
  }, [type]);

  const handleClick = (type: "login" | "signup"): void => {
    setActiveTab(type);
    router.push(`/auth?type=${type}`);
  };

  return (
    <div className=" min-w-[450px]">
      <nav className="grid grid-cols-2 gap-4 w-full">
        {tabs.map((tab) => (
          <Button
            key={tab.type}
            className={cn(
              tab.type === activeTab ? "border-black text-black " : "text-foreground",
              "border-b bg-transparent hover:bg-gray-200 rounded-none "
            )}
            onClick={() => handleClick(tab.type)}
          >
            {tab.name}
          </Button>
        ))}
      </nav>
      {activeTab === "signup" ? <SignUp /> : <Login />}
    </div>
  );
};

export default AuthModal;
