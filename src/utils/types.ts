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
