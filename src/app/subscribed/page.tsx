"use server";

import { Button } from "@/components/ui/button";
import { CookieKeys, ROUTES } from "@/utils/constants";
import { createClient } from "@/utils/supabase/server";
import { DBUser, PageProps } from "@/utils/types";
import Link from "next/link";
import { Suspense } from "react";
import { cookies } from "next/headers";

export default async function Page(props: PageProps) {
  async function createCookie(key: CookieKeys, data: Record<string, string>) {
    "use server";
    console.log("SERVER CALLED");
    try {
      cookies().set(key, JSON.stringify(data));
    } catch (err) {
      console.log(err);
    }
  }

  const response = await fetch(
    `https://api.paystack.co/transaction/verify/${props.searchParams.reference}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_KEY}`,
      },
    },
  );

  if (response.status !== 200) {
    return (
      <div className="flex flex-col items-center justify-center py-32">
        {response.statusText}
      </div>
    );
  }

  const jsonResponse = (await response.json()) as {
    status: boolean;
    message: string;
    data?: Record<string, any>;
  };

  if (!jsonResponse.status) {
    return (
      <div className="flex flex-col items-center justify-center py-32">
        <p>{jsonResponse.message}</p>
      </div>
    );
  }

  const supabase = createClient();
  const authUserEmail = (await supabase.auth.getUser()).data.user?.email;
  const jsonRepsonseEmail = jsonResponse.data!.customer.email;

  if (authUserEmail !== jsonRepsonseEmail) {
    return (
      <div className="flex flex-col items-center justify-center py-32">
        <p>Invalid payment data</p>
      </div>
    );
  }

  const { error } = await supabase
    .from("users")
    .update({ subscription_type: "PAID", updated_at: new Date().toISOString() })
    .eq("email", authUserEmail);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-32">
        <p>{error?.message}</p>
      </div>
    );
  }

  let { data: users, error: fetchUserError } = await supabase
    .from("users")
    .select()
    .eq("email", authUserEmail);

  if (fetchUserError || !users) {
    return (
      <div className="flex flex-col items-center justify-center py-32">
        <p>{fetchUserError?.message}</p>
      </div>
    );
  }

  await createCookie(CookieKeys.User, users[0]);

  return (
    <Suspense
      fallback={
        <div className="flex flex-col items-center justify-center py-32">
          loading...
        </div>
      }
    >
      <div className="w-screen px-10 h-screen flex gap-5 flex-col items-center justify-center">
        <h1 className="text-2xl">Great! You subscribed to Onena Hire 🎉</h1>
        <Link href={ROUTES.auth.signIn}>
          <Button>Sign in to your account</Button>
        </Link>
      </div>
    </Suspense>
  );
}
