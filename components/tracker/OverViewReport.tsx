"use client";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";


const chartConfig = {
  prev_month: {
    label: "Last month",
    color: "#009DFF",
  },
  this_month: {
    label: "This month",
    color: "#07E098",
  },
} satisfies ChartConfig;

export function OverViewReport({ data }: any) {
  return (
    <Card className="col-span-2 bg-white rounded-lg shadow-sm border-0 p-3">
      <CardHeader className="p-0 pb-2">
        <CardTitle className="text-slate-700 text-sm font-semibold">Overview Report</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ChartContainer config={chartConfig} className="h-[140px] w-full">
          <AreaChart
            accessibilityLayer
            data={data ?? []}
            margin={{ left: 8, right: 8, top: 4, bottom: 4 }}
          >
            <CartesianGrid vertical={false} stroke="#f1f5f9" />
            <XAxis
              dataKey="week"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tick={{ fill: "#64748b", fontSize: 12 }}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Area
              dataKey="prev_month"
              type="natural"
              fill="var(--color-prev_month)"
              fillOpacity={0.2}
              stroke="var(--color-prev_month)"
              stackId="a"
            />
            <Area
              dataKey="this_month"
              type="natural"
              fill="var(--color-this_month)"
              fillOpacity={0.2}
              stroke="var(--color-this_month)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex flex-wrap gap-3 pt-2 pb-0 px-0">
        <div className="flex items-center gap-1.5 text-xs text-slate-600">
          <span className="h-2 w-2 rounded-full bg-[#009DFF]" aria-hidden />
          Last month
        </div>
        <div className="flex items-center gap-1.5 text-xs text-slate-600">
          <span className="h-2 w-2 rounded-full bg-[#07E098]" aria-hidden />
          This month
        </div>
      </CardFooter>
    </Card>
  );
}
