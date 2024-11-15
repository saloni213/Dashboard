"use client";

import { SkiData } from "@/app/data";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface AgeDistributionChartProps {
  data: SkiData[];
}

export default function AgeDistributionChart({ data }: AgeDistributionChartProps) {
  const ageGroups = Array.from(new Set(data.map((d) => d.age))).sort((a, b) => a - b);
  
  const chartData = ageGroups.map((age) => ({
    age,
    novice: data.filter((d) => d.age === age && d.niveau === "novice").length,
    moyen: data.filter((d) => d.age === age && d.niveau === "moyen").length,
    pro: data.filter((d) => d.age === age && d.niveau === "pro").length,
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="age" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="novice" stroke="hsl(var(--chart-1))" />
        <Line type="monotone" dataKey="moyen" stroke="hsl(var(--chart-2))" />
        <Line type="monotone" dataKey="pro" stroke="hsl(var(--chart-3))" />
      </LineChart>
    </ResponsiveContainer>
  );
}