'use client';

import React, { useState, useEffect } from 'react';
import { Calendar, FileText, Briefcase } from 'lucide-react';
import { MetricCard } from './metric';

// TypeScript interfaces
interface MetricData {
  count: number;
  trend: number;
}

interface Metrics {
  events: MetricData;
  resources: MetricData;
  startups: MetricData;
}

const DashboardMetrics: React.FC = () => {
  const [metrics, setMetrics] = useState<Metrics>({
    events: { count: 0, trend: 0 },
    resources: { count: 0, trend: 0 },
    startups: { count: 0, trend: 0 },
  });

  useEffect(() => {
    // In a real application, you would fetch this data from your API
    // This is simulated data for demonstration
    const fetchData = async (): Promise<void> => {
      try {
        // Simulating API response
        setMetrics({
          events: { count: 5, trend: 8.2 },
          resources: { count: 5, trend: 12.5 },
          startups: { count: 5, trend: -3.1 },
        });
      } catch (error) {
        console.error('Error fetching metrics:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      <MetricCard title="Total Events" value={metrics.events.count} icon={Calendar} />
      <MetricCard title="Total Resources" icon={FileText} value={metrics.resources.count} />
      <MetricCard title="Total Startups" value={metrics.startups.count} icon={Briefcase} />
    </div>
  );
};

export default DashboardMetrics;
