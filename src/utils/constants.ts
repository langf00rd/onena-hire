export const ROUTES = {
  index: "/",
  overview: "/dashboard/overview",
  settings: "/dashboard/settings",
  upgrade: "/#upgrade",
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

export enum FileFieldTypes {
  VideoMP4 = "video/mp4",
  ImagePNG = "image/png",
  ImageJPG = "image/jpg",
  ApplicationPDF = "image/PDF",
}

export const IMAGE_FILE_TYPES = [
  FileFieldTypes.ImageJPG,
  FileFieldTypes.ImagePNG,
];

export const VIDEO_FILE_TYPES = [FileFieldTypes.VideoMP4];

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

export const FREE_JOB_POST_CREDITS = 3;
export const MAX_FREE_APPLICATION_RECORDS = 5000;
