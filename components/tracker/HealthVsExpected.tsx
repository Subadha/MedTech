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
const healthVsexpected = [
  { month: "January", health: 186, expected: 80 },
  { month: "February", health: 305, expected: 200 },
  { month: "March", health: 237, expected: 120 },
  { month: "April", health: 73, expected: 190 },
  { month: "May", health: 209, expected: 130 },
  { month: "June", health: 214, expected: 140 },
];

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

export function HealthVsExpected() {
  return (
    <Card className="col-span-2 ">
      <CardHeader>
        <CardTitle>Your Health vs Expected</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={healthVsexpected}>
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
