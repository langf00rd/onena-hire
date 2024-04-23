import React from "react";
import SignUp from "../components/signup";

const Page = (): React.JSX.Element => {
  return (
    <div className=" p-10">
      <div className="max-w-[500px] mx-auto">
        <h1 className="text-2xl">Login to Onena</h1>
        <SignUp />
      </div>
    </div>
  );
};

export default Page;
