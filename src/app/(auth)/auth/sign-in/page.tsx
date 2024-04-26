import React from "react";
import Login from "../../components/login";

export default function Page() {
  return (
    <div className="p-10">
      <div className="max-w-[500px] mx-auto">
        <h1 className="text-2xl">Login to Onena</h1>
        <Login />
      </div>
    </div>
  );
}
