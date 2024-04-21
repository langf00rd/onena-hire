import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { ReactNode } from "react";
import BackButton from "./back-button";

export default function PageInfo(props: {
  title: string;
  description?: string;
  actionButtons?: ReactNode;
  showBackButton?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-5">
        {props.showBackButton && <BackButton />}
        <div className="space-y-1">
          <h1 className="text-xl font-bold">{props.title}</h1>
          <p>{props.description}</p>
        </div>
      </div>
      {props.actionButtons}
    </div>
  );
}
