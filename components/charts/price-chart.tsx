"use client";

import { SkiData, Season, seasons, formatSeason } from "@/app/data";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface PriceChartProps {
  data: SkiData[];
}

export default function PriceChart({ data }: PriceChartProps) {
  const chartData = seasons.map((season) => {
    const seasonData = data.filter((d) => d.saison === season);
    const averagePrice = seasonData.length > 0
      ? Math.round(seasonData.reduce((acc, curr) => acc + curr.prix, 0) / seasonData.length)
      : 0;

    return {
      saison: formatSeason(season),
      averagePrice,
    };
  });

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          dataKey="saison"
          axisLine={{ strokeWidth: 1 }}
          tickLine={{ strokeWidth: 1 }}
        />
        <YAxis 
          domain={[0, 'auto']}
          axisLine={{ strokeWidth: 1 }}
          tickLine={{ strokeWidth: 1 }}
        />
        <Tooltip 
          formatter={(value) => `$${value}`}
          contentStyle={{ 
            backgroundColor: 'hsl(var(--background))',
            border: '1px solid hsl(var(--border))',
            borderRadius: '6px'
          }}
        />
        <Bar 
          dataKey="averagePrice" 
          fill="hsl(var(--primary))"
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}