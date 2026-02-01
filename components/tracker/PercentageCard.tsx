"use client";

import * as React from "react";
import { useState } from "react";
import { Label, Pie, PieChart } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PercentageCardProps {
  progress: {
    daily: number;
    weekly: number;
    monthly: number;
  };
  color: string;
  title: string;
}

export function PercentageCard({ progress, color, title }: PercentageCardProps) {
  const [selectedPeriod, setSelectedPeriod] = useState<"daily" | "weekly" | "monthly">("daily");
 if(!progress) {
  return (<></>)
 }
  const chartData = [
    { browser: "completed", visitors: progress[selectedPeriod]||0, fill: color },
    { browser: "remaining", visitors: 100 - progress[selectedPeriod]||0, fill: "#E5E7EB" },
  ];

  const chartConfig = {
    completed: { label: "Completed", color },
  } satisfies ChartConfig;

  return (
    <Card className="flex flex-col bg-white rounded-xl shadow-sm border border-gray-100 p-5 h-full">
      <CardHeader className="flex flex-row justify-between items-center p-0 pb-2">
        <CardTitle className="text-slate-600 text-xs font-semibold uppercase tracking-wide">
          {title}
        </CardTitle>
        <Selection selectedPeriod={selectedPeriod} setSelectedPeriod={setSelectedPeriod} />
      </CardHeader>
      <CardContent className="flex-1 p-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-[120px] max-h-[120px]"
        >
          <PieChart>
            <Pie
              data={chartData}
              dataKey="visitors"
              nameKey="browser"
              innerRadius={38}
              strokeWidth={2}
              stroke="none"
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="text-lg font-bold fill-slate-700"
                        >
                          {progress[selectedPeriod].toLocaleString()}%
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

interface SelectionProps {
  selectedPeriod: "daily" | "weekly" | "monthly";
  setSelectedPeriod: React.Dispatch<React.SetStateAction<"daily" | "weekly" | "monthly">>;
}

function Selection({ selectedPeriod, setSelectedPeriod }: SelectionProps) {
  return (
    <Select
      onValueChange={(value) => setSelectedPeriod(value as "daily" | "weekly" | "monthly")}
      value={selectedPeriod}
    >
      <SelectTrigger className="w-[80px] h-7 rounded-md border border-slate-200 bg-white text-slate-600 text-[11px] font-medium shadow-none">
        <SelectValue placeholder="Daily" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Period</SelectLabel>
          <SelectItem value="daily">Daily</SelectItem>
          <SelectItem value="weekly">Weekly</SelectItem>
          <SelectItem value="monthly">Monthly</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
