'use client';

import { useServerAction } from '@/hooks/useServerAction';
import { getStartupsWithMoreAccesses, ResourceAccessResult } from '@/actions/nested-aggregation/nested-aggregation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

export default function ResourceAccessQuery() {
  const {
    mutateAsync,
    data: startups,
    isError,
    error,
  } = useServerAction<ResourceAccessResult[], void>(getStartupsWithMoreAccesses);

  const handleClick = async () => {
    await mutateAsync();
  };

  return (
    <Card className="w-full max-w-md text-white bg-primary/10">
      <CardHeader>
        <h1 className="text-2xl font-bold">Top Accessed Startups</h1>
        <p className="text-muted-foreground text-sm">
          Startups that accessed more resources than the average.
        </p>
      </CardHeader>
      <CardContent>
        <Button onClick={handleClick} className="w-full mb-4">
          Run Query
        </Button>

        {isError && <p className="text-red-500">{error}</p>}

        {startups && startups.length > 0 && (
          <ul className="space-y-3 max-h-64 overflow-y-auto">
            {startups.map((s) => (
              <li key={s.startup_id} className="border p-4 rounded text-white">
                <p className="font-semibold">{s.name}</p>
                <p>Resource Accesses: {s.access_count}</p>
              </li>
            ))}
          </ul>
        )}

        {startups && startups.length === 0 && (
          <p className="text-sm text-white">No startups found.</p>
        )}
      </CardContent>
    </Card>
  );
}


