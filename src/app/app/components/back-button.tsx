"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const { back } = useRouter();
  return (
    <Button
      onClick={back}
      variant="outline"
      className="rounded-full w-8 h-8"
      size="icon"
    >
      <ArrowLeft size={20} />
    </Button>
  );
}
