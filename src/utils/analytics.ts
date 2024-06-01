import moment from "moment";
import { FormattedApplication, JobApplication } from "./types";
import { MONTHS } from "./constants";

/**
 * Get the number of applications by month from a list of applications
 * @param applications - List of applications
 * @returns List of objects with month and count
 */
export function formatApplications(applications: JobApplication[]) {
  return applications.reduce((acc, application) => {
    const month = new Date(application.created_at).toLocaleString("default", {
      month: "short",
    });

    // @ts-ignore
    const monthIndex = acc.findIndex((item) => item.month === month);

    if (monthIndex === -1) {
      // @ts-ignore
      acc.push({ month, count: 1 });
    } else {
      // @ts-ignore
      acc[monthIndex].count += 1;
    }

    return acc.sort((a: FormattedApplication, b: FormattedApplication) => {
      return MONTHS.indexOf(a.month) - MONTHS.indexOf(b.month);
    });
  }, []);
}

/**
 * Get the percentage change in applications between the current month and the previous month
 * @param applications - List of applications
 * @returns Percentage change between the current month and the previous month
 */
export function getApplicationPercentageChangeBetweenMonths(
  applications: FormattedApplication[],
) {
  const currentMonthName = new Date(new Date().toISOString()).toLocaleString(
    "default",
    {
      month: "short",
    },
  );

  const currentMonthApplications: FormattedApplication[] = applications.filter(
    (month: FormattedApplication) => month.month === currentMonthName,
  );

  const previousMonthName = moment().subtract(1, "months").format("MMM");

  const previousMonthApplications: FormattedApplication[] = applications.filter(
    (month: FormattedApplication) => month.month === previousMonthName,
  );

  const currentMonthCount = currentMonthApplications[0]?.count ?? 0;
  const previousMonthCount = previousMonthApplications[0]?.count ?? 0;

  if (previousMonthCount == 0 || currentMonthCount === 0) return 0; // prevent division by zero

  const percentageDifference =
    ((currentMonthCount - previousMonthCount) / previousMonthCount) * 100;

  return percentageDifference === Infinity ? 0 : percentageDifference;
}
