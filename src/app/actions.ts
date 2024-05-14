"use server";

import { CookieKeys } from "@/utils/constants";
import { cookies } from "next/headers";

export async function create(key: CookieKeys, data: Record<string, string>) {
  console.log({ key });
  cookies().set(key, JSON.stringify(data));
}
