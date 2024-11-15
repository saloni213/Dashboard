"use client";

import { SkiData } from "@/app/data";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface PriceChartProps {
  data: SkiData[];
}

export default function PriceChart({ data }: PriceChartProps) {
  const chartData = ["été", "hiver", "printemps", "automne"].map((season) => ({
    saison: season,
    averagePrice: Math.round(
      data
        .filter((d) => d.saison === season)
        .reduce((acc, curr) => acc + curr.prix, 0) /
        data.filter((d) => d.saison === season).length
    ),
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="saison" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="averagePrice" fill="hsl(var(--primary))" />
      </BarChart>
    </ResponsiveContainer>
  );
}