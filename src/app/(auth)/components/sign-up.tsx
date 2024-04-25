"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import PasswordInput from "@/components/ui/password-input";
import { LoaderCircle } from "lucide-react";
import React, { ChangeEvent, FormEvent, useState, useTransition } from "react";
import { toast } from "sonner";
import { signUpWithEmailAndPassword } from "../../../../actions";
import useSupabaseClient from "@/utils/supabase/client";

export default function SignUp() {
  const [formData, setFormData] = useState({
    // firstName: "",
    // lastName: "",
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
  const [loading, setLoading] = useState(false);
  const [isPending, startTransition] = useTransition();
  const supabase = useSupabaseClient();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim() || !confirmPassword.trim()) {
      toast.error("One or more fields empty");
      return;
    }
    startTransition(async () => {
      await signUpWithEmailAndPassword({ email, password });
    });
  };

  const signUpWithGoogle = () => {
    setLoading(true);
    supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
    setLoading(false);
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
    <div className="py-4 space-y-4">
      <form onSubmit={handleSubmit}>
        {/* <fieldset className="w-full space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input
            type="text"
            id="firstName"
            name="firstName"
            required
            value={firstName}
            onChange={handleChange}
          />
        </fieldset>
        <fieldset className="w-full space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            type="text"
            id="lastName"
            required
            name="lastName"
            value={lastName}
            onChange={handleChange}
          />
        </fieldset> */}
        <fieldset className="w-full space-y-2">
          <Label htmlFor="email">Email</Label>
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
          {loading ? <LoaderCircle className="animate-spin" /> : "Sign up"}
        </Button>
      </form>
      <div className="flex items-center gap-2">
        <div className="h-[1px] bg-gray-300 w-full" />
        or
        <div className="h-[1px] bg-gray-300 w-full" />
      </div>
      <Button
        type="button"
        className="bg-black w-full text-white"
        onClick={signUpWithGoogle}
      >
        Continue with Google
      </Button>
    </div>
  );
}
