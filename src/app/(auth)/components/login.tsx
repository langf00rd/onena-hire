import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EyeOff, Eye } from "lucide-react";
import React, { FormEvent, useState } from "react";
import { toast } from "sonner";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      toast.error("One or more fields empty");
      return;
    }
    setLoading(true);

    // Perform form submission logic here
  };
  return (
    <div className="py-4 space-y-4">
      <form onSubmit={handleSubmit} className="w-full space-y-2">
        <label htmlFor="">Email</label>
        <Input
          type="email"
          id="email"
          name="email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
      </form>
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
