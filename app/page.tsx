"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, DollarSign, Users, Snowflake } from "lucide-react";
import dynamic from "next/dynamic";
import { data, Season, Level } from "./data";
import { Filters } from "@/components/filters";
import { StatsCard } from "@/components/ui/stats-card";

const PriceChart = dynamic(() => import("@/components/charts/price-chart"), { ssr: false });
const AgeDistributionChart = dynamic(() => import("@/components/charts/age-distribution-chart"), { ssr: false });

export default function Dashboard() {
  const [selectedSeason, setSelectedSeason] = useState<Season | "all">("all");
  const [selectedLevel, setSelectedLevel] = useState<Level | "all">("all");

  const filteredData = data.filter((item) => {
    const matchesSeason = selectedSeason === "all" || item.saison === selectedSeason;
    const matchesLevel = selectedLevel === "all" || item.niveau === selectedLevel;
    return matchesSeason && matchesLevel;
  });

  const averagePrice = Math.round(
    filteredData.reduce((acc, curr) => acc + curr.prix, 0) / filteredData.length
  );
  const totalUsers = filteredData.length;
  const proUsers = filteredData.filter((user) => user.niveau === "pro").length;

  return (
    <div className="flex min-h-screen flex-col bg-background p-8">
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <Filters
          onSeasonChange={setSelectedSeason}
          onLevelChange={setSelectedLevel}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-3 mt-4">
        <StatsCard title="Average Price" value={`$${averagePrice}`} icon={DollarSign} />
        <StatsCard title="Total Users" value={totalUsers} icon={Users} />
        <StatsCard title="Pro Users" value={proUsers} icon={Snowflake} />
      </div>

      <Tabs defaultValue="charts" className="mt-6">
        <TabsList>
          <TabsTrigger value="charts" className="flex items-center">
            <BarChart3 className="mr-2 h-4 w-4" />
            Charts
          </TabsTrigger>
        </TabsList>
        <TabsContent value="charts" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
            <Card className="p-6">
              <h4 className="text-lg font-semibold mb-4">Price Distribution by Season</h4>
              <PriceChart data={filteredData} />
            </Card>
            <Card className="p-6">
              <h4 className="text-lg font-semibold mb-4">Age Distribution by Level</h4>
              <AgeDistributionChart data={filteredData} />
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}