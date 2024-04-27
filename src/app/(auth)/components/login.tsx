"use client";

import { FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import PasswordInput from "@/components/ui/password-input";
import { toast } from "@/components/ui/use-toast";
import { ROUTES } from "@/utils/constants";
import { createClient } from "@/utils/supabase/client";
import cookie from "js-cookie";

export default function Login() {
  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get("email")!.toString();
    const password = formData.get("password")!.toString();

    const supabase = createClient();

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      return toast({
        description: signInError.message,
      });
    }

    let { data: users, error } = await supabase
      .from("users")
      .select()
      .eq("email", email);

    if (error || !users) {
      return toast({
        description: error?.message,
      });
    }

    cookie.set("db_user", JSON.stringify(users[0]));

    window.location.href = ROUTES.overview;
  };

  return (
    <div className="py-4 space-y-4">
      <form className="w-full space-y-4" onSubmit={handleFormSubmit}>
        <label htmlFor="">Email</label>
        <Input type="email" id="email" name="email" required />
        <div className="w-full space-y-2">
          <label htmlFor="">Password</label>
          <PasswordInput
            key="password"
            id="password"
            name="password"
            required
          />
        </div>
        <Button>Continue</Button>
      </form>
    </div>
  );
}
