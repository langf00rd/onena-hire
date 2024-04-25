import { Button } from "@/components/ui/button";
import { Application } from "@/utils/types";
import PageInfo from "../../components/page-info";
import RenderOnClient from "../../components/render-on-client";
import { ApplicantsTable } from "../../components/tables/dashboardlicants";
import {
  ExternalLink,
  Facebook,
  Linkedin,
  LucideFacebook,
  Share2,
  Twitter,
  TwitterIcon,
} from "lucide-react";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { CopyIcon, TwitterLogoIcon } from "@radix-ui/react-icons";
import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu";

export default function Page() {
  return (
    <>
      <PageInfo
        showBackButton
        title="Senior software engineer job post"
        actionButtons={
          <div className="flex gap-5">
            <Link href="/acme" target="_blank">
              <Button variant="secondary">
                <ExternalLink size={15} />
                View job post
              </Button>
            </Link>
            <Popover>
              <PopoverTrigger>
                <Button variant="secondary">
                  <Share2 size={15} />
                  Share
                </Button>
              </PopoverTrigger>
              <PopoverContent className="space-y-5">
                <div className="flex gap-2">
                  <Input value="https://acme.onenahire.com" />
                  <Button size="icon" variant="ghost">
                    <CopyIcon />
                  </Button>
                </div>
                <hr />
                <div className="flex items-center justify-evenly">
                  <Twitter />
                  <Linkedin />
                  <Facebook />
                </div>
              </PopoverContent>
            </Popover>
          </div>
        }
      />
      <Tabs defaultValue="account" className="mt-5">
        <TabsList>
          <TabsTrigger value="account">Applications</TabsTrigger>
          <TabsTrigger value="password">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <RenderOnClient>
            <ApplicantsTable data={data} />
          </RenderOnClient>
        </TabsContent>
        <TabsContent value="password">
          <div className="mt-5">
            <div className="bg-destructive/10 flex items-center justify-between p-5 rounded-lg">
              <div>
                <h3>Terminate this job post</h3>
                <p>
                  This will permanently delete your job post and remove all related data
                  from our servers, including applications
                </p>
              </div>
              <Dialog>
                <DialogTrigger>
                  <Button variant="destructive">Delete</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                      This action cannot be undone. This will permanently delete your job
                      post and remove all related data from our servers, including
                      applications
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button variant="destructive">Yes, delete</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </TabsContent>
      </Tabs>
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
