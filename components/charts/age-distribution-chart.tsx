"use client";

import { SkiData, Level, levels, formatLevel } from "@/app/data";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

interface AgeDistributionChartProps {
  data: SkiData[];
}

export default function AgeDistributionChart({ data }: AgeDistributionChartProps) {
  const ageGroups = Array.from(new Set(data.map((d) => d.age))).sort((a, b) => a - b);
  
  const chartData = ageGroups.map((age) => {
    const result: { age: number } & Record<Level, number> = {
      age,
      novice: 0,
      moyen: 0,
      pro: 0
    };

    levels.forEach((level) => {
      result[level] = data.filter((d) => d.age === age && d.niveau === level).length;
    });

    return result;
  });

  const colors = {
    novice: "hsl(var(--chart-1))",
    moyen: "hsl(var(--chart-2))",
    pro: "hsl(var(--chart-3))"
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          dataKey="age"
          axisLine={{ strokeWidth: 1 }}
          tickLine={{ strokeWidth: 1 }}
        />
        <YAxis 
          domain={[0, 'auto']}
          axisLine={{ strokeWidth: 1 }}
          tickLine={{ strokeWidth: 1 }}
        />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: 'hsl(var(--background))',
            border: '1px solid hsl(var(--border))',
            borderRadius: '6px'
          }}
        />
        <Legend 
          formatter={(value) => formatLevel(value as Level)}
          iconType="circle"
          wrapperStyle={{
            paddingTop: '10px'
          }}
        />
        {levels.map((level) => (
          <Line
            key={level}
            type="monotone"
            dataKey={level}
            stroke={colors[level]}
            dot={false}
            strokeWidth={2}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}