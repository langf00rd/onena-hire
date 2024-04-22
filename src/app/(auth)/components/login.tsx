import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";

export default function Login() {
  return (
    <div className="py-4 space-y-4">
      <div className="w-full space-y-2">
        <label htmlFor="">Email</label>
        <Input />
      </div>
      <div className="w-full space-y-2">
        <label htmlFor="">Password</label>
        <Input />
      </div>
      <Button className="bg-black w-full text-white">Sign in</Button>
      <div className="flex items-center gap-2">
        <div className="h-[1px] bg-gray-300 w-full" />
        or
        <div className="h-[1px] bg-gray-300 w-full" />
      </div>
      <Button className="bg-black w-full text-white">Continue with Google</Button>
    </div>
  );
}
