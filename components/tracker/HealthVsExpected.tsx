"use client";

import { HeartPulse, Sparkle } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
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
  health: {
    label: "Your health",
    color: "#4AB58E",
  },
  expected: {
    label: "Expected health",
    color: "#FFCF00",
  },
} satisfies ChartConfig;

export function HealthVsExpected({ data }: any) {
  return (
    <Card className="col-span-2 bg-white rounded-lg shadow-sm border-0 p-3">
      <CardHeader className="p-0 pb-2">
        <CardTitle className="text-slate-700 text-sm font-semibold">Your Health vs Expected</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ChartContainer config={chartConfig} className="h-[140px] w-full">
          <BarChart accessibilityLayer data={data ?? []}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="health" fill="var(--color-health)" radius={4} />
            <Bar dataKey="expected" fill="var(--color-expected)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-1.5 pt-2 pb-0 px-0 text-xs">
        <div className="leading-none items-center font-medium flex gap-1.5">
          <div className="p-1.5 rounded text-[#4AB58E] bg-[#4AB58E]/20 flex items-center">
            <HeartPulse size={12} />
          </div>
          <span>Your health overview</span>
        </div>
        <div className="leading-none items-center font-medium flex gap-1.5">
          <div className="p-1.5 rounded bg-[#FFCF00]/20 text-[#FFCF00] flex items-center">
            <Sparkle size={12} />
          </div>
          <span>Normal health</span>
        </div>
      </CardFooter>
    </Card>
  );
}
