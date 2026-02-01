import React, { useState } from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { Heart, Activity, Thermometer, Flame, Upload } from "lucide-react";

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

export function HealthMonitoring({ data }: any) {
  const [selected, setSelected] = useState<{
    field: ChartField;
    color: string;
  }>({
    field: "stress_level",
    color: chartConfig.stress_level.color,
  });

  const [timeframe, setTimeframe] = useState("monthly");

  const handleTabChange = (value: string) => {
    const field = value as ChartField;
    setSelected({
      field,
      color: chartConfig[field].color,
    });
  };

  // Filter data based on timeframe
  const filteredData = (): unknown[] => {
    if (!data) return [];
    if (timeframe === "monthly") {
      return Array.isArray(data.monthly_monitoring) ? data.monthly_monitoring.slice(-4) : [];
    }
    if (timeframe === "weekly") {
      return Array.isArray(data.weekly_monitoring) ? data.weekly_monitoring : [];
    }
    if (timeframe === "daily") {
      return Array.isArray(data.daily_monitoring) ? data.daily_monitoring : [];
    }
    return [];
  };

  const tabIcons: Record<ChartField, React.ReactNode> = {
    stress_level: <Heart className="h-4 w-4" />,
    pulse: <Activity className="h-4 w-4" />,
    temperature: <Thermometer className="h-4 w-4" />,
    calories_burned: <Flame className="h-4 w-4" />,
  };

  return (
    <Card className="col-span-6 bg-white rounded-xl shadow-sm border-0">
      <CardHeader className="md:p-4 p-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <CardTitle className="text-slate-700 text-sm font-semibold uppercase tracking-wide">
            Health Monitoring
          </CardTitle>
          <div className="flex items-center gap-2">
            <Selection timeframe={timeframe} setTimeframe={setTimeframe} />
            <Button
              variant="outline"
              size="sm"
              className="rounded-lg border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
            >
              <Upload className="h-4 w-4 mr-1.5" />
              Export
            </Button>
          </div>
        </div>
        <Tabs defaultValue="stress_level" onValueChange={handleTabChange}>
          <div className="flex items-center md:px-4 md:py-2">
            <TabsList className="m-auto h-11 w-full justify-between gap-1 rounded-lg bg-slate-100 p-1">
              {(Object.keys(chartConfig) as ChartField[]).map((key) => (
                <TabsTrigger
                  key={key}
                  value={key}
                  className="flex items-center gap-1.5 md:text-sm text-xs px-3 py-2 data-[state=active]:bg-violet-600 data-[state=active]:text-white data-[state=active]:shadow-sm data-[state=inactive]:text-slate-500 data-[state=inactive]:bg-transparent rounded-md"
                >
                  {tabIcons[key]}
                  {chartConfig[key].label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
        </Tabs>
      </CardHeader>
      <CardContent className="md:p-4 p-2">
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={filteredData()}
            margin={{ left: 12, right: 12 }}
          >
            <CartesianGrid
              vertical={false}
              strokeDasharray="3 3"
              stroke="#e2e8f0"
            />
            <XAxis
              dataKey={timeframe === "monthly" ? "month" : timeframe === "weekly" ? "week" : "day"}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tick={{ fill: "#64748b", fontSize: 12 }}
              tickFormatter={(value) =>
                typeof value === "string" && timeframe === "monthly" ? value.slice(0, 3) : String(value)
              }
            />
            <YAxis hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" hideLabel />}
            />
            <defs>
              <linearGradient id="healthMonitoringGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={selected.color} stopOpacity={0.4} />
                <stop offset="100%" stopColor={selected.color} stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <Area
              dataKey={selected.field}
              type="monotone"
              fill="url(#healthMonitoringGradient)"
              stroke={selected.color}
              strokeWidth={2}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

function Selection({
  timeframe,
  setTimeframe,
}: {
  timeframe: string;
  setTimeframe: (value: string) => void;
}) {
  return (
    <Select onValueChange={(value) => setTimeframe(value)} value={timeframe}>
      <SelectTrigger className="w-[90px] h-8 rounded-lg border border-slate-200 bg-white text-slate-600 text-xs font-medium shadow-none">
        <SelectValue placeholder="Monthly" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="daily">Daily</SelectItem>
          <SelectItem value="weekly">Weekly</SelectItem>
          <SelectItem value="monthly">Monthly</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
