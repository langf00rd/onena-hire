"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { logout, getUser } from "../../../../actions";
import { toast } from "@/components/ui/use-toast";

export default function UserProfile() {
  const [currentUser, setCurrentUser] = useState<User>();
  async function getProfile() {
    const user = await getUser();
    if (user && user.data && user.data?.user) {
      setCurrentUser(user.data?.user);
    }
  }

  const signOut = async () => {
    try {
      await logout();
      toast({ description: "Successfully signed out" });
    } catch (error: any) {
      toast({ description: error.message });
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
