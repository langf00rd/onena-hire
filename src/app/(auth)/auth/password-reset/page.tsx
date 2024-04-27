"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { ROUTES } from "@/utils/constants";
import { createClient } from "@/utils/supabase/client";
import { useSearchParams } from "next/navigation";
import { FormEvent, Suspense, useEffect, useState } from "react";

export default function Page() {
  return (
    <Suspense fallback={<>...</>}>
      <PageContent />
    </Suspense>
  );
}

function PageContent() {
  const supabase = createClient();
  const searchParams = useSearchParams();
  const [isEnteringNewPassword, setIsEnteringNewPassword] = useState<
    boolean | null
  >(null);

  async function handleRequestPasswordResetLink(e: FormEvent) {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get("email")!.toString();

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/password-reset`,
    });

    if (error) {
      return toast({
        description: error.message,
      });
    }

    toast({
      description: "A password reset link has been sent to your email",
    });
  }

  async function handleUpdatePassword(e: FormEvent) {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const password = formData.get("password")!.toString();

    const { error } = await supabase.auth.updateUser({
      password,
    });

    if (error) {
      return toast({
        description: error.message,
      });
    }

    toast({
      description: "Your password has been reset. Log in",
    });

    window.location.href = ROUTES.auth.signIn;
  }

  useEffect(() => {
    if (searchParams.get("code")) setIsEnteringNewPassword(true);
    else setIsEnteringNewPassword(false);
  }, [searchParams]);

  if (isEnteringNewPassword === null) return <div>...</div>;

  return (
    <>
      {!isEnteringNewPassword ? (
        <form onSubmit={handleRequestPasswordResetLink}>
          <h1 className="text-3xl">Reset your password</h1>
          <Input
            required
            placeholder="john@acme.co"
            name="email"
            type="email"
          />
          <Button>Send password reset link</Button>
        </form>
      ) : (
        <form onSubmit={handleUpdatePassword}>
          <h1 className="text-3xl">Choose a new password</h1>
          <Input required name="password" type="password" />
          <Button>Update</Button>
        </form>
      )}
    </>
  );
}
