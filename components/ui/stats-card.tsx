import { LucideIcon } from "lucide-react";
import { Card } from "./card";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
}

export function StatsCard({ title, value, icon: Icon }: StatsCardProps) {
  return (
    <Card className="p-6">
      <div className="flex items-center space-x-4">
        <Icon className="h-8 w-8 text-primary" />
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <h3 className="text-2xl font-bold">{value}</h3>
        </div>
      </div>
    </Card>
  );
}