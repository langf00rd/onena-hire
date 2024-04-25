"use client";

import { useFormStatus } from "react-dom";
import { ReactNode, type ComponentProps } from "react";
import { Button } from "@/components/ui/button";

type Props = ComponentProps<"button"> & {
  pendingText?: ReactNode;
  loading?: boolean;
};

export function SubmitButton({ children, pendingText, ...props }: Props) {
  const { pending, action } = useFormStatus();

  const isPending = pending && action === props.formAction;

  return (
    <Button {...props} aria-disabled={pending} className="w-full">
      {isPending ? pendingText : children}
    </Button>
  );
}

export function GoogleButton({ children, pendingText, ...props }: Props) {
  return (
    <Button {...props} aria-disabled={props.loading} className="w-full">
      {props.loading ? pendingText : children}
    </Button>
  );
}
