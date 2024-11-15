"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Season, Level, seasons, levels, formatSeason, formatLevel } from "@/app/data";

interface FiltersProps {
  onSeasonChange: (season: Season | "all") => void;
  onLevelChange: (level: Level | "all") => void;
}

export function Filters({ onSeasonChange, onLevelChange }: FiltersProps) {
  return (
    <div className="flex items-center space-x-2">
      <Select defaultValue="all" onValueChange={(value) => onSeasonChange(value as Season | "all")}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Season" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Seasons</SelectItem>
          {seasons.map((season) => (
            <SelectItem key={season} value={season}>
              {formatSeason(season)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select defaultValue="all" onValueChange={(value) => onLevelChange(value as Level | "all")}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Level" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Levels</SelectItem>
          {levels.map((level) => (
            <SelectItem key={level} value={level}>
              {formatLevel(level)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}