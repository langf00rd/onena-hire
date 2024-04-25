"use client";

import { FormEvent, useState, useTransition } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import PasswordInput from "@/components/ui/password-input";
import { LoaderCircle } from "lucide-react";
import { signInWithEmailAndPassword } from "../../../../actions";
import { toast } from "sonner";

export default function Login() {
  const [isPending, startTransition] = useTransition();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e: FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    startTransition(async () => {
      try {
        await signInWithEmailAndPassword({ email, password });
      } catch (error: any) {
        toast.error((error.message as string) ?? "Oops something happened");
      }
    });
  };

  return (
    <div className="py-4 space-y-4">
      <form className="w-full space-y-4" onSubmit={onSubmitHandler}>
        <label htmlFor="">Email</label>
        <Input
          type="email"
          id="email"
          name="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="w-full space-y-2">
          <label htmlFor="">Password</label>
          <PasswordInput
            key="password"
            id="password"
            name="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button className="w-full" type="submit">
          {isPending ? <LoaderCircle className="animate-spin" /> : "Sign In"}
        </Button>
      </form>
    </div>
  );
}
