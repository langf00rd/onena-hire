"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import { User2 } from "lucide-react";
import { useEffect, useState } from "react";

export default function UserProfile() {
  const supabase = createClient();
  const [user, setUser] = useState<User | null>(null);

  async function handleSignOut() {
    try {
      await supabase.auth.signOut();
      window.location.reload();
    } catch (error: any) {
      toast({ description: error.message });
    }
  }

  useEffect(() => {
    (async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    })();
  }, [supabase]);

  return (
    <Accordion type="single" collapsible className="max-w-full">
      <AccordionItem className="border-0" value="item-1">
        <AccordionTrigger>
          <div className="flex items-center gap-2">
            <div className="bg-accent rounded-full p-2">
              <User2 size={20} />
            </div>
            <p className="max-w-[100px] overflow-auto text-ellipsis">
              {user?.email}
            </p>
          </div>
        </AccordionTrigger>
        <AccordionContent className="space-y-5">
          <Button
            className="w-full"
            variant="destructive"
            onClick={handleSignOut}
          >
            Sign out
          </Button>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
