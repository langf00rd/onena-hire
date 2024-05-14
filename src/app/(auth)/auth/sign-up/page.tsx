"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import PasswordInput from "@/components/ui/password-input";
import { toast } from "@/components/ui/use-toast";
import { CookieKeys, ROUTES } from "@/utils/constants";
import { createClient } from "@/utils/supabase/client";
import { ChangeEvent, FormEvent, useState } from "react";
import cookie from "js-cookie";
import Link from "next/link";

export default function Page() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    invalidLength: "",
    unmatchedPassword: "",
  });
  const { email, password, confirmPassword } = formData;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get("email")!.toString();
    const password = formData.get("password")!.toString();
    const firstName = formData.get("first-name")!.toString();
    const lastName = formData.get("last-name")!.toString();

    const supabase = createClient();

    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signUpError) {
      return toast({
        description: signUpError.message,
      });
    }

    const { data, error } = await supabase
      .from("users")
      .insert([{ email, first_name: firstName, last_name: lastName }])
      .select();

    if (error) {
      return toast({
        description: error.message,
      });
    }

    cookie.set(CookieKeys.User, JSON.stringify(data[0]));

    window.location.href = ROUTES.createOrganization;
  };

  const validatePassword = (password: string) => {
    if (password.length < 6) {
      setErrors((prev) => ({
        ...prev,
        invalidLength: "Password should be at least 6 characters long",
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        invalidLength: "",
      }));
    }
  };

  const matchPassword = (confirmPassword: string) => {
    if (password.trim() !== confirmPassword.trim()) {
      setErrors((prev) => ({
        ...prev,
        unmatchedPassword: "Passwords do not match",
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        unmatchedPassword: "",
      }));
    }
  };
  return (
    <>
      <h1 className="text-3xl">Create an account</h1>
      <form onSubmit={handleFormSubmit}>
        <div className="flex gap-5">
          <fieldset>
            <Label htmlFor="first-name">First name</Label>
            <Input required className="w-full" name="first-name" />
          </fieldset>
          <fieldset>
            <Label htmlFor="last-name">Last name</Label>
            <Input required className="w-full" name="last-name" />
          </fieldset>
        </div>
        <fieldset className="w-full space-y-2">
          <Label htmlFor="email">Email (personal or company email)</Label>
          <Input
            type="email"
            id="email"
            name="email"
            required
            value={email}
            onChange={handleChange}
          />
        </fieldset>
        <fieldset className="w-full space-y-2">
          <Label htmlFor="password">Password</Label>
          <PasswordInput
            key="password"
            id="password"
            name="password"
            value={password}
            required
            onBlur={(e) => validatePassword(e.target.value)}
            onChange={(e) => {
              handleChange(e);
              validatePassword(e.target.value);
            }}
          />
          {errors.invalidLength && (
            <small className="text-red-500">{errors.invalidLength}</small>
          )}
        </fieldset>
        <fieldset className="w-full space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <PasswordInput
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            required
            onBlur={(e) => matchPassword(e.target.value)}
            onChange={(e) => {
              handleChange(e);
              matchPassword(e.target.value);
            }}
          />
          {errors.unmatchedPassword && (
            <small className="text-red-500">{errors.unmatchedPassword}</small>
          )}
        </fieldset>
        <Button type="submit" className="bg-black w-full text-white">
          Sign up
        </Button>
      </form>
      <p>
        Already have an account?&nbsp;
        <Link className="underline" href={ROUTES.auth.signIn}>
          Sign in
        </Link>
      </p>
    </>
  );
}
