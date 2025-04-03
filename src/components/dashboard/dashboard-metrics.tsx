'use client';

import React, { useState, useEffect } from 'react';
import { Calendar, FileText, Briefcase } from 'lucide-react';
import { MetricCard } from './metric';
import { countUserItems } from '@/actions/users/count-user-items';
import { useServerAction } from '@/hooks/useServerAction';
import { useAuthentication } from '@/hooks/useAuthentication';

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

  const { user, isAuthenticated } = useAuthentication();
  const { mutateAsync, data } = useServerAction(countUserItems);

  useEffect(() => {
    const fetchUserCounts = async () => {
      if (isAuthenticated && user?.id) {
        await mutateAsync(user.id.toString());
      }
    };

    fetchUserCounts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, user]);

  useEffect(() => {
    if (data) {
      setMetrics({
        events: { count: data.events, trend: 0 },
        resources: { count: data.resources, trend: 0 },
        startups: { count: data.startups, trend: 0 },
      });
    }
  }, [data]);

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      <MetricCard title="Total Events" value={metrics.events.count} icon={Calendar} />
      <MetricCard title="Total Resources" icon={FileText} value={metrics.resources.count} />
      <MetricCard title="Total Startups" value={metrics.startups.count} icon={Briefcase} />
    </div>
  );
};

export default DashboardMetrics;
