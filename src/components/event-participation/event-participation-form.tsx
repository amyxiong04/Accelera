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
    <div className="w-full">
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
          <div className="max-h-64 overflow-y-auto rounded-md">
            {results.length > 0 ? (
              <ul className="space-y-2">
                {results.map((event, idx) => (
                  <li
                    key={idx}
                    className="rounded-md border p-3 shadow-sm transition-all hover:bg-white/10 hover:shadow"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="bg-primary/10 text-primary flex h-8 w-8 items-center justify-center rounded-full">
                          {idx + 1}
                        </div>
                        <strong>{event.name}</strong>
                      </div>
                      <Button variant="ghost" size="sm" className="text-xs">
                        View details
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="flex items-center justify-center py-8 text-gray-500">
                No startups found for this event.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
