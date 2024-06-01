"use client";

import { FormattedApplication } from "@/utils/types";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

export default function Overview(props: { data: FormattedApplication[] }) {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={props.data}>
        <XAxis
          dataKey="month"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <Bar
          dataKey="count"
          fill="currentColor"
          radius={[4, 4, 0, 0]}
          className="fill-primary"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function CLineChart(props: { data: FormattedApplication[] }) {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart width={500} height={300} data={props.data}>
        <XAxis dataKey="month" />
        <YAxis />
        <CartesianGrid stroke="#00000000" />
        <Line type="monotone" dataKey="count" stroke="#000" strokeWidth={1.2} />
      </LineChart>
    </ResponsiveContainer>
  );
}
