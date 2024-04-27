"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import { createClient } from "@/utils/supabase/client";

export default function DeleteJobPostDialog(props: { jobPostID: number }) {
  const supabase = createClient();

  async function handleDeleteJobPost() {
    const { error } = await supabase
      .from("job_posts")
      .delete()
      .eq("id", props.jobPostID);

    if (error) return toast({ description: error.message });

    toast({ description: "Job post deleted" });

    window.history.back();
  }

  return (
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
          <Button variant="destructive" onClick={handleDeleteJobPost}>
            Yes, delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
