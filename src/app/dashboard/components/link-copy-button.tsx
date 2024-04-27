"use client";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { CopyIcon } from "lucide-react";

export function LinkCopyButton(props: { link: string }) {
  return (
    <Button
      size="icon"
      variant="ghost"
      onClick={() => handleCopyText(props.link)}
    >
      <CopyIcon />
    </Button>
  );
}

async function handleCopyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    toast({
      description: "link copied",
    });
  } catch (err) {
    toast({
      description: "copy failed",
    });
  }
}
