import React from "react";
import AuthModal from "../components/auth-modal";

const Page = ({
  searchParams,
}: {
  searchParams: { type: "login" | "signup" };
}): React.JSX.Element => {
  return (
    <div className="flex justify-center p-10 min-h-[calc(100vh-200px)]">
      <AuthModal type={searchParams.type} />
    </div>
  );
};

export default Page;
