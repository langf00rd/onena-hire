export const ROUTES = {
  index: "/",
  overview: "/dashboard/overview",
  settings: "/dashboard/settings",
  createOrganization: "/organization/new",
  welcome: {
    yourInfo: "/welcome/your-info",
  },
  auth: {
    signIn: "/auth/sign-in",
    signUp: "/auth/sign-up",
    forgotPassword: "/auth/password-reset",
  },
  jobs: {
    index: "/dashboard/jobs",
    new: "/dashboard/jobs/new",
  },
};

export const EMAIL = "stephenokyere621@gmail.com";

export const JOB_POST_SECTIONS = [
  "job title",
  "description",
  "requirements",
  "responsibilities",
  "more",
];

export const NUMBER_OF_EMPLOYEES = ["1-20", "20-60", "60-100", "over 100"];

export const INPUT_FIELD_TYPES = [
  "text",
  "multi-text",
  "file",
  "email",
  "url",
  "tel",
  "time",
  "number",
  "datetime-local",
  // "single-select",
  // "multi-select",
];

export const FILE_TYPES = [
  { label: "PDF", value: "application/pdf" },
  {
    label: "Video (MP4)",
    value: "video/mp4",
  },
  {
    label: "Image (PNG)",
    value: "image/png",
  },
  {
    label: "Image (JPG)",
    value: "image/jpg",
  },
];

export const JOB_LOCATION_TYPE = ["remote", "on-site", "hybrid"];

export enum CookieKeys {
  Organization = "db_organization",
  User = "db_user",
}
