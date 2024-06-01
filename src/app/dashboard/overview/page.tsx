import { Card, CardTitle } from "@/components/ui/card";
import { getAllApplications } from "@/services/get-all-applications";
import {
  formatApplications,
  getApplicationPercentageChangeBetweenMonths,
} from "@/utils/analytics";
import { FormattedApplication } from "@/utils/types";
import { BarChartIcon, LucideIcon, Users2 } from "lucide-react";
import { CLineChart } from "./components/charts/bar";

export default async function Page() {
  const { applications, jobPosts } = await getAllApplications();

  const formattedApplications: FormattedApplication[] =
    formatApplications(applications);

  const currentMonthName = Date().substring(4, 7);

  const currentMonthApplications: { count: number }[] =
    formattedApplications.filter(
      (month: FormattedApplication) => month.month === currentMonthName,
    );

  const percentageDifference = getApplicationPercentageChangeBetweenMonths(
    formattedApplications,
  );

  return (
    <div className="grid gap-5">
      <ul className="grid grid-cols-3 gap-5">
        {/* <li>
          <AnalyticsCard
            title="Total views"
            value="3,500"
            percentage="+20.1% from last month"
            icon={Eye}
          />
        </li> */}
        <li>
          <AnalyticsCard
            title="Job posts"
            value={jobPosts?.length.toString()}
            icon={Users2}
          />
        </li>
        <li>
          <AnalyticsCard
            title="This month's applications"
            value={currentMonthApplications[0]?.count.toString() ?? 0}
            info={
              percentageDifference > 0
                ? `${getApplicationPercentageChangeBetweenMonths(formattedApplications)}% from last month`
                : ""
            }
            icon={BarChartIcon}
          />
        </li>
        <li>
          <AnalyticsCard
            title="Total applicants"
            value={applications?.length.toString()}
            icon={Users2}
          />
        </li>
        {/* <li>
          <AnalyticsCard
            title="Interview feedback score"
            value="4.5"
            percentage="+20.1% from last month"
            icon={Star}
          />
        </li> */}
        {/* <li>
          <AnalyticsCard
            title="Average application completion time"
            value="3s"
            percentage="+20.1% from last month"
            icon={Timer}
          />
        </li> */}
        {/* <li>
          <AnalyticsCard
            title="Candidate satisfaction score"
            value="3.2"
            percentage="+20.1% from last month"
            icon={Heart}
          />
        </li> */}
      </ul>
      <Card>
        <CardTitle>Application activity</CardTitle>
        <CLineChart data={formattedApplications} />
      </Card>
      <div className="grid grid-cols-2 gap-5">
        {/* <Card>
          <CardTitle>Top locations</CardTitle>
          <CardContent>
            {["Accra", "Lagos", "Johannesburgh"].map((place) => {
              return (
                <li
                  key={place}
                  className="flex items-center justify-between py-3"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-full"></div>
                    <p className="font-medium">{place}</p>
                  </div>
                  <p className="text-sm text-gray-500">12,000 applicants</p>
                </li>
              );
            })}
          </CardContent>
        </Card> */}
        {/* <Card>
          <CardTitle>Overview</CardTitle>
          <Overview data={formattedApplications} />
        </Card> */}
        {/* <Card>
          <CardTitle>Application activity</CardTitle>
          <CLineChart data={formattedApplications} />
        </Card> */}
      </div>
    </div>
  );
}

interface AnalyticsCardProps {
  title: string;
  value: string;
  info?: string;
  icon: LucideIcon;
}

function AnalyticsCard(props: AnalyticsCardProps) {
  return (
    <Card className="p-5 space-y-3 h-full">
      <div className="flex items-center justify-between">
        <p className="font-medium">{props.title}</p>
        <props.icon className="text-gray-500" size={16} />
      </div>
      <div>
        <h2 className="text-2xl font-bold">{props.value}</h2>
        <p className="text-sm text-zinc-400">{props.info}</p>
      </div>
    </Card>
  );
}
