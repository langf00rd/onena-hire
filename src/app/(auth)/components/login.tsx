"use client";

import { FormEvent, useState, useTransition } from "react";
import useSupabaseClient from "@/utils/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import PasswordInput from "@/components/ui/password-input";
import { LoaderCircle } from "lucide-react";
import { signInWithEmailAndPassword } from "../../../../actions";
import { toast } from "sonner";

export default function Login() {
  const [isPending, startTransition] = useTransition();
  const supabase = useSupabaseClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (e: FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    startTransition(async () => {
      // try {
      await signInWithEmailAndPassword({ email, password });
      // if (result.error && result.message) {
      //   console.log(result);
      //   toast.error("Oops something happened");
      // }
    });
  };

  const loginWithGoogle = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
    if (error) {
      toast.error("Oops! something happened");
    }
    setLoading(false);
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
        <div className="flex items-center gap-2">
          <div className="h-[1px] bg-gray-300 w-full" />
          or
          <div className="h-[1px] bg-gray-300 w-full" />
        </div>
      </form>
      <Button type="button" onClick={loginWithGoogle} className="w-full">
        {loading ? <LoaderCircle className="animate-spin" /> : "Continue with Google"}
      </Button>
    </div>
  );
}
