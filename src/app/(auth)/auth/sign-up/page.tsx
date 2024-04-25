import React from "react";
import SignUp from "../../components/sign-up";

const Page = (): React.JSX.Element => {
  return (
    <div className=" p-10">
      <div className="max-w-[500px] mx-auto">
        <h1 className="text-2xl">Create an account</h1>
        <SignUp />
      </div>
    </div>
  );
};

export default Page;