"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";

const SUPPORT_CATEGORIES = ["Feedback", "Issue"];

const Support = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [issue, setIssue] = useState(SUPPORT_CATEGORIES[0]);
  const [loading, setLoading] = useState(false);
  const sendEmail = async (emailData: {
    email: string;
    subject: string;
    message: string;
  }) => {
    if (!email || !issue) {
      toast.error("Email is required");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch("/api/send-mail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emailData),
      });

      if (response.ok) {
        toast.success("Email sent successfully");
      } else {
        toast.error("Failed to send email");
      }
      setLoading(false);
    } catch (err) {
      toast.error("Something went wrong");
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <Card className="p-5 space-y-5 shadow-md">
      <p>Got Feedback or need support?</p>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="w-full">Send us a message</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Talk to us</DialogTitle>
          <DialogDescription>
            Someone from our team will contact you via your email
          </DialogDescription>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendEmail({
                email,
                subject: `${issue}-Onena Hire`,
                message: `Sender Email:${email} \n
                    ${message}`,
              });
            }}
          >
            <fieldset>
              <Label>Choose category</Label>
              <Select
                required
                onValueChange={(value) => setIssue(value)}
                defaultValue={SUPPORT_CATEGORIES[0]}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={SUPPORT_CATEGORIES[0]} />
                </SelectTrigger>
                <SelectContent>
                  {SUPPORT_CATEGORIES.map((item) => (
                    <SelectItem key={item} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </fieldset>
            <fieldset>
              <Label>Your email</Label>
              <Input
                required
                type="email"
                placeholder="john@acme.co"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </fieldset>
            <fieldset>
              <Label>Message</Label>
              <Textarea
                required
                placeholder="Type your message here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </fieldset>
            <DialogFooter>
              <Button>
                {loading ? <LoaderCircle className="animate-spin" /> : "Send"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default Support;
