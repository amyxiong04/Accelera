'use client';

import { useServerAction } from '@/hooks/useServerAction';
import {
  getStartupsWithMoreAccesses,
  ResourceAccessResult,
} from '@/actions/resources/nested-aggregation';
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
    <Card className="bg-primary/10 w-full max-w-md text-white">
      <CardHeader>
        <h1 className="text-2xl font-bold">Top Accessed Startups</h1>
        <p className="text-muted-foreground text-sm">
          Startups that accessed more resources than the average.
        </p>
      </CardHeader>
      <CardContent>
        <Button onClick={handleClick} className="mb-4 w-full">
          Run Query
        </Button>

        {isError && <p className="text-red-500">{error}</p>}

        {startups && startups.length > 0 && (
          <ul className="max-h-64 space-y-3 overflow-y-auto">
            {startups.map((s) => (
              <li key={s.startup_id} className="rounded border p-4 text-white">
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
