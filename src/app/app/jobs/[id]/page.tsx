import { Button } from "@/components/ui/button";
import PageInfo from "../../components/page-info";
import { ApplicantsTable } from "../../components/tables/applicants";
import {
  PropsWithChildren,
  experimental_useEffectEvent,
  useEffect,
  useState,
} from "react";
import RenderOnClient from "../../components/render-on-client";
import { Application } from "@/utils/types";

export default function Page() {
  return (
    <>
      <PageInfo
        showBackButton
        title="Senior software engineer job post"
        actionButtons={
          <Button variant="secondary">Edit job description</Button>
        }
      />
      <RenderOnClient>
        <ApplicantsTable data={data} />
      </RenderOnClient>
    </>
  );
}

const data: Application[] = [
  {
    id: "123",
    email: "john@acme.co",
    first_name: "John",
    last_name: "Doe",
    resume_link: "https://resu.me/12jnk1",
    time_spent: 12032,
    created_at: "12-03-2024",
    location: {
      country: "Ghana",
      city: "Accra",
    },
  },
  {
    id: "123",
    email: "john@acme.co",
    first_name: "John",
    last_name: "Doe",
    resume_link: "https://resu.me/12jnk1",
    time_spent: 12032,
    created_at: "12-03-2024",
    location: {
      country: "Ghana",
      city: "Accra",
    },
  },
  {
    id: "123",
    email: "john@acme.co",
    first_name: "John",
    last_name: "Doe",
    resume_link: "https://resu.me/12jnk1",
    time_spent: 12032,
    created_at: "12-03-2024",
    location: {
      country: "Ghana",
      city: "Accra",
    },
  },
  {
    id: "123",
    email: "john@acme.co",
    first_name: "John",
    last_name: "Doe",
    resume_link: "https://resu.me/12jnk1",
    time_spent: 12032,
    created_at: "12-03-2024",
    location: {
      country: "Ghana",
      city: "Accra",
    },
  },
  {
    id: "123",
    email: "john@acme.co",
    first_name: "John",
    last_name: "Doe",
    resume_link: "https://resu.me/12jnk1",
    time_spent: 12032,
    created_at: "12-03-2024",
    location: {
      country: "Ghana",
      city: "Accra",
    },
  },
  {
    id: "123",
    email: "john@acme.co",
    first_name: "John",
    last_name: "Doe",
    resume_link: "https://resu.me/12jnk1",
    time_spent: 12032,
    created_at: "12-03-2024",
    location: {
      country: "Ghana",
      city: "Accra",
    },
  },
  {
    id: "123",
    email: "john@acme.co",
    first_name: "John",
    last_name: "Doe",
    resume_link: "https://resu.me/12jnk1",
    time_spent: 12032,
    created_at: "12-03-2024",
    location: {
      country: "Ghana",
      city: "Accra",
    },
  },
  {
    id: "123",
    email: "john@acme.co",
    first_name: "John",
    last_name: "Doe",
    resume_link: "https://resu.me/12jnk1",
    time_spent: 12032,
    created_at: "12-03-2024",
    location: {
      country: "Ghana",
      city: "Accra",
    },
  },
  {
    id: "123",
    email: "john@acme.co",
    first_name: "John",
    last_name: "Doe",
    resume_link: "https://resu.me/12jnk1",
    time_spent: 12032,
    created_at: "12-03-2024",
    location: {
      country: "Ghana",
      city: "Accra",
    },
  },
];
