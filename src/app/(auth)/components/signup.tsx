"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EyeOff, Eye, LoaderCircle } from "lucide-react";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "sonner";

export default function Signup() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
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
  const { firstName, lastName, email, password, confirmPassword } = formData;
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (
      !firstName.trim() ||
      !lastName.trim() ||
      !email.trim() ||
      !password.trim() ||
      !confirmPassword.trim()
    ) {
      toast.error("One or more fields empty");
      return;
    }
    setLoading(true);
    console.log(formData);
    // Perform form submission logic here
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
        <fieldset className="w-full space-y-2">
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
        </fieldset>
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
          <div className="w-full relative">
            <Input
              type={showPassword ? "text" : "password"}
              key="password"
              id="password"
              required
              name="password"
              onBlur={(e) => validatePassword(e.target.value)}
              value={password}
              onChange={(e) => {
                handleChange(e);
                validatePassword(e.target.value);
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

          {errors.invalidLength && (
            <small className="text-red-500">{errors.invalidLength}</small>
          )}
        </fieldset>
        <fieldset className="w-full space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <div className="w-full relative">
            <Input
              type={showPassword ? "text" : "password"}
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
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-4 top-2"
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>
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
      <Button type="button" className="bg-black w-full text-white">
        Continue with Google
      </Button>
    </div>
  );
}
