"use client";
import React, { useState } from "react";
import { Input } from "./input";
import { EyeOff, Eye } from "lucide-react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const PasswordInput = (props: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="w-full relative">
      <Input type={showPassword ? "text" : "password"} {...props} />
      <button
        type="button"
        onClick={togglePasswordVisibility}
        className="absolute right-4 top-2"
      >
        {showPassword ? <EyeOff /> : <Eye />}
      </button>
    </div>
  );
};

export default PasswordInput;
