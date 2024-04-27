"use client";

import { ROUTES } from "@/utils/constants";
import { useEffect } from "react";

export default function Page() {
  useEffect(() => {
    window.location.href = ROUTES.jobs.index;
  }, []);
  return <></>;
}
