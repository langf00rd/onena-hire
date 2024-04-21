"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import PageInfo from "../components/page-info";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

export default function Page() {
  const [domain, setDomain] = useState("");
  return (
    <>
      <PageInfo title="Settings" />
      <div className="max-w-xl">
        <Accordion type="single" collapsible>
          <AccordionItem value="domain-management" className="border-0">
            <AccordionTrigger className="hover:no-underline">
              Domain management
            </AccordionTrigger>
            <AccordionContent className="space-y-3">
              <p className="text-foreground">
                Choose a domain name that represents your company. No symbols or
                spaces are allowed
              </p>
              <form>
                <div className="gap-2 items-center flex">
                  <Input
                    placeholder="acmecorp"
                    className="w-max"
                    onChange={(e) => setDomain(e.target.value)}
                  />
                  <p className="text-blue-400 underline">
                    {domain.trim() ? domain : "mycompany"}.onenahire.co
                  </p>
                </div>
                <DialogFooter>
                  <Button>Save</Button>
                </DialogFooter>
              </form>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="branding" className="border-0">
            <AccordionTrigger className="hover:no-underline">
              Branding
            </AccordionTrigger>
            <AccordionContent>
              <form>
                <fieldset>
                  <Label>Theme color</Label>
                  <Input type="color" />
                </fieldset>
                <fieldset>
                  <Label>Logo</Label>
                  <Input type="file" />
                </fieldset>
              </form>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="layout" className="border-0">
            <AccordionTrigger className="hover:no-underline">
              Design &amp; Layout
            </AccordionTrigger>
            <AccordionContent>
              <form>
                <fieldset>
                  <Label>Choose a layout</Label>
                </fieldset>
              </form>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </>
  );
}
