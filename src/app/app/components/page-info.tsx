import { ReactNode } from "react";
import BackButton from "./back-button";

export default function PageInfo(props: {
  title: string;
  description?: string;
  actionButtons?: ReactNode;
  showBackButton?: boolean;
}) {
  return (
    <div className="flex md:flex-row flex-col gap-y-5 md:items-center justify-between">
      <div className="flex items-center gap-5">
        {props.showBackButton && <BackButton />}
        <div className="grid gap-1">
          <h1 className="text-2xl">{props.title}</h1>
          {props.description && <p>{props.description}</p>}
        </div>
      </div>
      {props.actionButtons}
    </div>
  );
}
