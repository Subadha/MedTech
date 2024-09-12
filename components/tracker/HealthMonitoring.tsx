"use client";

import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { useState } from "react";

const chartConfig = {
  stress_level: {
    label: "Stress level",
    color: "#3788E5",
  },
  pulse: {
    label: "Pulse",
    color: "#EC594D",
  },
  temperature: {
    label: "Temperature",
    color: "#F79500",
  },
  calories_burned: {
    label: "Calories burned",
    color: "#3B0058",
  },
};

type ChartField = keyof typeof chartConfig;
export function HealthMonitoring({data}:any) {

  const [selected, setSelected] = useState<{
    field: ChartField;
    color: string;
  }>({
    field: "stress_level",
    color: chartConfig.stress_level.color,
  });

  const handleTabChange = (value: string) => {
    const field = value as ChartField;
    setSelected({
      field,
      color: chartConfig[field].color,
    });
  };

  
  return (
    <Card className="col-span-6">
      <CardHeader className=" md:p-4 p-2 ">
        <CardTitle>Health Monitoring</CardTitle>
        <Tabs defaultValue="stress_level" onValueChange={handleTabChange}>
          <div className="flex items-center md:px-4 md:py-2">
            <TabsList className="m-auto h-12 w-full justify-between " >
              <TabsTrigger value="stress_level" className="md:text-base text-[12px] p-2 w-1/4 data-[state=active]:bg-[#3788E5] data-[state=active]:text-white ">
                Stress level
              </TabsTrigger>
              <TabsTrigger value="pulse" className="md:text-base text-[12px] p-2 w-1/4 data-[state=active]:bg-[#EC594D] data-[state=active]:text-white ">
                Pulse
              </TabsTrigger>
              <TabsTrigger
                value="temperature"
                className={`p-2 w-1/4 md:text-base text-[12px] data-[state=active]:bg-[#F79500] data-[state=active]:text-white `}
              >
                Temp<span className=" hidden md:block">erature</span>
              </TabsTrigger>
              <TabsTrigger value="calories_burned" className=" md:text-base text-[12px] w-1/4 p-2 data-[state=active]:bg-[#3B0058] data-[state=active]:text-white ">
                <p className=" whitespace-nowrap flex">Cal<span className=" hidden md:block">ories</span>&nbsp;burned</p>
              </TabsTrigger>
            </TabsList>
          </div>
        </Tabs>
      </CardHeader>
      <CardContent className=" md:p-4 p-2 ">
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={data}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" hideLabel />}
            />
            <Area
              dataKey={selected.field}
              type="linear"
              fill={`var(--color-${selected.field})`}
              fillOpacity={0.4}
              stroke={`var(--color-${selected.field})`}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      
    </Card>
  );
}
