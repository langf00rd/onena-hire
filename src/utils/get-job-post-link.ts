export default function getJobPostLink(
  jobPostID: number | string,
  domain: string,
) {
  return `/organization/${domain}/jobs/${jobPostID}`;
}
