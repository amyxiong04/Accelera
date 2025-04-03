'use client';

import { handleJoin } from '@/actions/join/join-event';
import { EventsData } from '@/app/api/get-events/route';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useServerAction } from '@/hooks/useServerAction';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import useSWR from 'swr';
import { Card, CardContent, CardHeader } from '../ui/card';

export function EventParticipationForm({ className, ...props }: React.ComponentProps<'form'>) {
  const [eventName, setEventName] = useState('');
  const {
    mutateAsync,
    isPending: isSubmitting,
    error: actionError,
    data: results,
    isError,
  } = useServerAction(handleJoin);

  const fetcher = async (url: string) => {
    return await fetch(url).then((res) => res.json());
  };

  const { data: events } = useSWR<EventsData>('/api/get-events', fetcher);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    mutateAsync(formData).then((result) => {
      if (!result.error) {
        console.log(result.data);
      }
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <h1 className="text-2xl font-bold">Find the event&apos;s participants</h1>
        <p className="text-muted-foreground text-sm text-balance">Enter the event name below</p>
      </CardHeader>
      <CardContent className="w-full">
        <form className={cn('flex flex-col gap-6', className)} onSubmit={handleSubmit} {...props}>
          <div className="grid gap-6">
            <div className="grid gap-3">
              <Label htmlFor="eventName" className="mb-1 block text-sm">
                Event Name
              </Label>
              <Select
                defaultValue={eventName}
                onValueChange={(e) => setEventName(e)}
                name="eventName"
              >
                <SelectTrigger className="w-full">
                  <SelectValue defaultValue={''} placeholder="Select Event..." />
                </SelectTrigger>
                <SelectContent>
                  {events &&
                    events.map((e, idx) => (
                      <SelectItem key={idx} value={e.name}>
                        {e.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
            {isError && <p className="text-sm text-red-500">{actionError}</p>}
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Finding...' : 'Find Participants'}
            </Button>
          </div>
        </form>
        {results && (
          <div className="mt-6">
            <h2 className="mb-2 text-lg font-bold">The Startups that are participating:</h2>
            <div className="max-h-64 overflow-y-auto rounded-md border p-3">
              {results.length > 0 ? (
                <ul className="space-y-2">
                  {results.map((event, idx) => (
                    <li key={idx} className="rounded-md border p-3">
                      <strong>{event.name}</strong>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-300">No startups found.</p>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
