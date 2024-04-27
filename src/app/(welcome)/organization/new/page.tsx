"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { NUMBER_OF_EMPLOYEES, ROUTES } from "@/utils/constants";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";
import cookie from "js-cookie";
import { DBUser } from "@/utils/types";

export default function Page() {
  async function handleFormSubmit(e: FormEvent) {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const name = formData.get("name");
    const website = formData.get("website");
    const numberOfEmployees = formData.get("number-of-employees");

    const supabase = createClient();
    const userCookie = cookie.get("db_user");

    if (!userCookie) {
      return toast({
        description: "please login again",
      });
    }

    const parsedUserCookie: DBUser = JSON.parse(userCookie);

    const organizationQuery = await supabase
      .from("organizations")
      .insert([
        {
          name,
          website,
          employees_num: numberOfEmployees,
          domain: name?.toString().toLowerCase().replace(" ", "-"),
        },
      ])
      .select();

    if (organizationQuery.error) {
      return toast({
        description: organizationQuery.error.message,
      });
    }

    const userQuery = await supabase
      .from("users")
      .update({ organization: organizationQuery.data[0].id })
      .eq("email", parsedUserCookie.email)
      .select();

    if (userQuery.error) {
      return toast({
        description: userQuery.error.message,
      });
    }

    cookie.set("db_user", JSON.stringify(userQuery.data[0]));

    window.location.href = ROUTES.jobs.index;
  }

  return (
    <form onSubmit={handleFormSubmit} className="max-w-xl mx-auto py-32">
      <h1 className="text-3xl">Company details</h1>
      <fieldset>
        <Label>Organization name</Label>
        <Input required name="name" />
      </fieldset>
      <fieldset>
        <Label>Website</Label>
        <Input type="url" name="website" />
      </fieldset>
      <fieldset>
        <Label>Number of employees</Label>
        <Select required name="number-of-employees">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={NUMBER_OF_EMPLOYEES[0]} />
          </SelectTrigger>
          <SelectContent>
            {NUMBER_OF_EMPLOYEES.map((value) => (
              <SelectItem key={value} value={value}>
                {value}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </fieldset>
      <Button>Continue</Button>
    </form>
  );
}
