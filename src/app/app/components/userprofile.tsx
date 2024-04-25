"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { supabase } from "@/config/supabase";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function UserProfile() {
  const [currentUser, setCurrentUser] = useState<User>();
  const router = useRouter();
  async function getProfile() {
    const session = await supabase.auth.getSession();
    if (session && session.data && session.data.session?.user) {
      setCurrentUser(session.data.session.user);
    }
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    router.push("/");
    toast.success("Successfully signed out");
    if (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1" className="border-0 px-3 -mt-6">
          <AccordionTrigger>
            <div className="flex items-center gap-2">
              <Avatar className="w-7 h-7">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <p>{currentUser?.email}</p>
            </div>
          </AccordionTrigger>
          <AccordionContent className="p-0">
            <Button className="w-full" variant="ghost" onClick={signOut}>
              Sign out
            </Button>
            <Button variant="ghost" className="w-full">
              Referral
            </Button>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
