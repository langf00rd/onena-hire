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

export interface PageProps {
  params: Record<string, unknown>;
  searchParams: Record<string, unknown>;
}

export interface JobPost {
  id: number;
  more: string;
  poster: string;
  description: string;
  created_at: string;
  updated_at: string;
  role: string;
  requirements: string[];
  responsibilities: string[];
  organization: string;
  input_fields: unknown;
}
