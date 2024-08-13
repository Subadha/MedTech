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
const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];

const chartConfig = {
  desktop: {
    label: "Your health",
    color: "#4AB58E",
  },
  mobile: {
    label: "Expected health",
    color: "#FFCF00",
  },
} satisfies ChartConfig;

export function HealthVsExpected() {
  return (
    <Card className="col-span-2 ">
      <CardHeader>
        <CardTitle>Your Health vs Expected</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
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
            <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
            <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="leading-none items-center  font-semibold flex gap-2">
          <div className="p-2 rounded-md text-[#4AB58E] bg-[#4AB58E]/20 flex items-center gap-2">
            <HeartPulse size={16} />
          </div>
          <span>Your health overview</span>
        </div>
        <div className="leading-none items-center  font-semibold flex gap-2">
          <div className="p-2 rounded-md bg-[#FFCF00]/20 text-[#FFCF00] flex items-center gap-2">
            <Sparkle size={16} />
          </div>
          <span>Normal health</span>
        </div>
      </CardFooter>
    </Card>
  );
}
