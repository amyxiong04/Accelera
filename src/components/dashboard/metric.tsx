import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
}

export const MetricCard: React.FC<MetricCardProps> = ({ title, value, icon: Icon }) => {
  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-md">
      <CardContent className="p-6 py-2">
        <div className="flex items-center gap-4">
          <div className="bg-primary/10 rounded-lg p-3">
            <Icon className="text-primary h-8 w-8" />
          </div>
          <div className="space-y-1 text-left">
            <h2 className="text-3xl font-bold tracking-tight">{value}</h2>
            <p className="text-muted-foreground text-sm font-medium">{title}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
