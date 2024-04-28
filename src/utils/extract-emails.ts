import { JobApplication } from "@/utils/types";

export function extractEmailsFromApplicationInputValues(
  applicationInputValues: JobApplication["input_values"],
): string[] {
  const emails = [];
  for (const application of applicationInputValues) {
    emails.push(application["email"]);
  }
  return Array.from(new Set(emails)) as string[];
}
