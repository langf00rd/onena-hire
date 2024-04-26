import { FILE_TYPES, INPUT_FIELD_TYPES } from "@/utils/constants";

export interface Application {
  [key: string]: unknown;
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  resume_link: string;
  cover_letter?: string;
  created_at: string;
  time_spent: number;
  location: {
    country: string;
    city: string;
  };
}

export interface JobApplication {
  id: number;
  created_at: string;
  job_post: number;
  input_values: Record<string, unknown>[];
}

export interface PageProps {
  // params: Record<string, unknown>;
  // searchParams: Record<string, unknown>;
  params: Record<string, unknown>;
  searchParams: { [key: string]: string | string[] | undefined };
}

export interface JobPost {
  id: number;
  poster: number;
  description: string;
  created_at: string;
  updated_at?: string;
  role: string;
  requirements: string[];
  responsibilities: string[];
  organization: number;
  organizations: { name: string; domain: string };
  input_fields: InputFieldComponentProps[];
  location_type: string;
  location?: string;
  [key: string]: unknown;
}

export type ApplicationJobPost = Omit<
  JobPost,
  "id" | "updated_at" | "created_at" | "organizations" | "input_fields"
>;

export interface DBUser {
  id: number;
  created_at: string;
  updated_at: string;
  email: string;
  first_name: string;
  last_name: string;
  organization: number;
}

// export interface JobPost {
//   role: string;
//   description: string;
//   responsibilities: string[];
//   requirements: string[];
//   organization: number;
//   custom_sections: string;
//   input_fields: string;
//   poster: number;
// }

export interface InputFieldComponentProps {
  id: string;
  type: string;
  label: string;
  maxChars?: number;
  required?: boolean;
  file_field_type?: string;
}

export interface Organization {
  id: number;
  updated_at?: string;
  created_at: string;
  employees_num: string;
  name: string;
  website?: string;
  domain: string;
}

export interface JobPost {
  id: number;
  poster: number;
  description: string;
  created_at: string;
  updated_at?: string;
  role: string;
  requirements: string[];
  responsibilities: string[];
  organization: number;
  organizations: { name: string; domain: string };
  input_fields: InputFieldComponentProps[];
  [key: string]: unknown;
}

export type ApplicationJobPost = Omit<
  JobPost,
  "id" | "updated_at" | "created_at" | "organizations" | "input_fields"
>;

export interface DBUser {
  id: number;
  created_at: string;
  updated_at: string;
  email: string;
  first_name: string;
  last_name: string;
  organization: number;
}

// export interface JobPost {
//   role: string;
//   description: string;
//   responsibilities: string[];
//   requirements: string[];
//   organization: number;
//   custom_sections: string;
//   input_fields: string;
//   poster: number;
// }

export interface InputFieldComponentProps {
  id: string;
  type: string;
  label: string;
  maxChars?: number;
  required?: boolean;
}

export interface Organization {
  id: number;
  updated_at?: string;
  created_at: string;
  employees_num: string;
  name: string;
  website?: string;
  domain: string;
}
