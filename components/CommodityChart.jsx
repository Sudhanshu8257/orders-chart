"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import React from "react";

const CommodityChart = ({ chartData, noData, overallChange }) => {
  const chartColor = overallChange >= 0 ? "#4CAF50" : "#F44336";
  const chartConfig = {
    price: {
      label: "Price",
      color: chartColor,
    },
  };

  return (
    <ChartContainer className="w-full" config={chartConfig}>
      <ResponsiveContainer height="320px" className="relative">
        {noData && (
          <div className="absolute text-lg w-full h-full top-0 left-0 flex items-center justify-center">
            No data available. Add some prices to see the chart.
          </div>
        )}
        <LineChart accessibilityLayer data={chartData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="time"
            tickFormatter={(time) => new Date(time).toLocaleTimeString()}
          />
          <YAxis />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Line
            dataKey="price"
            type="natural"
            strokeWidth={2}
            stroke={chartColor}
            dot={{
              fill: chartColor,
            }}
            activeDot={{
              r: 6,
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export default CommodityChart;
