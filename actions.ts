"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function signUpWithEmailAndPassword(data: any) {
  const supabase = await createClient();
  const { error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
  });
  if (error) {
    console.log(error);
    return redirect("/sign-up?message=Could not authenticate user");
  }
  return redirect("/app/overview");
}

export async function signInWithEmailAndPassword(data: any) {
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.password,
  });
  if (error) {
    console.log(error);
    return JSON.stringify({ error: { code: error.code, message: error.message } });
  }

  return redirect("/app/overview");
}

export async function getUserSession() {
  const supabase = await createClient();
  return supabase.auth.getSession();
}

export async function getUser() {
  const supabase = await createClient();
  return supabase.auth.getUser();
}

export async function logout() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.log(error);
  }
  return redirect("/");
}
