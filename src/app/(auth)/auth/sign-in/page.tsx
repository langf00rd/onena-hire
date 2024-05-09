"use client";

import React, { useState, useTransition } from "react";
import { FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import PasswordInput from "@/components/ui/password-input";
import { toast } from "@/components/ui/use-toast";
import { CookieKeys, ROUTES } from "@/utils/constants";
import { createClient } from "@/utils/supabase/client";
import cookie from "js-cookie";
import Link from "next/link";
import { DBUser } from "@/utils/types";

export default function Page() {
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

    let { data: organizations, error: organizationsError } = await supabase
      .from("organizations")
      .select()
      .eq("id", (users[0] as DBUser).organization);

    if (organizationsError || !organizations) {
      return toast({
        description: organizationsError?.message,
      });
    }

    cookie.set(CookieKeys.Organization, JSON.stringify(organizations[0]));
    cookie.set(CookieKeys.User, JSON.stringify(users[0]));

    window.location.href = ROUTES.overview;
  };

  return (
    <>
      <h1 className="text-3xl">Login to Onena</h1>
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
        <div className="flex items-center justify-between">
          <Button>Continue</Button>
          <Link className="underline" href={ROUTES.auth.forgotPassword}>
            Forgot password?
          </Link>
        </div>
      </form>
      <p>
        Don&apos;t have an account?&nbsp;
        <Link className="underline" href={ROUTES.auth.signUp}>
          Sign up
        </Link>
      </p>
    </>
  );
}
