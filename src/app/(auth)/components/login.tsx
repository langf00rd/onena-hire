"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/config/supabase";
import { EyeOff, Eye, LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";
import { toast } from "sonner";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const loginWithGoogle = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
    if (data) {
      setLoading(false);
      router.push("/app/overview");
    }
    if (error) {
      setLoading(false);
      toast.error("An unexpected error occurred.");
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      toast.error("One or more fields empty");
      return;
    }
    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (data) {
      setLoading(false);
      router.push("/app/overview");
    }
    if (error) {
      setLoading(false);
      toast.error("An unexpected error occurred.");
    }
  };
  return (
    <div className="py-4 space-y-4">
      <form onSubmit={handleSubmit} className="w-full space-y-4">
        <label htmlFor="">Email</label>
        <Input
          type="email"
          id="email"
          name="email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="w-full space-y-2">
          <label htmlFor="">Password</label>
          <div className="w-full relative">
            <Input
              type={showPassword ? "text" : "password"}
              key="password"
              id="password"
              name="password"
              value={password}
              required
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-4 top-2"
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>
        </div>
        <Button className="bg-black w-full text-white">
          {" "}
          {loading ? <LoaderCircle className="animate-spin" /> : "Sign in"}
        </Button>
        <div className="flex items-center gap-2">
          <div className="h-[1px] bg-gray-300 w-full" />
          or
          <div className="h-[1px] bg-gray-300 w-full" />
        </div>
      </form>
      <Button className="bg-black w-full text-white" onClick={loginWithGoogle}>
        Continue with Google
      </Button>
    </div>
  );
}
