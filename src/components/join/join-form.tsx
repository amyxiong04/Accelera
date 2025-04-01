'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader } from '../ui/card';
import { handleJoin } from '@/actions/join/join-event';
import { useServerAction } from '@/hooks/useServerAction';

export function JoinForm({ className, ...props }: React.ComponentProps<'form'>) {
  const {
    mutateAsync,
    isPending: isSubmitting,
    error: actionError,
    data: events,
    isError,
  } = useServerAction(handleJoin);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    mutateAsync(formData).then((result) => {
      if (!result.error) {
        console.log(result);
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
              <Label htmlFor="email">Event Name</Label>
              <Input id="eventName" name="eventName" type="text" placeholder="name" required />
            </div>
            {isError && <p className="text-sm text-red-500">{actionError}</p>}
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Finding...' : 'Find Participants'}
            </Button>
          </div>
        </form>
        {events && (
          <div className="mt-6">
            <h2 className="mb-2 text-lg font-bold">Search Results:</h2>
            <div className="max-h-64 overflow-y-auto rounded-md border p-3">
              {events.length > 0 ? (
                <ul className="space-y-2">
                  {events.map((event, idx) => (
                    <li key={idx} className="rounded-md border bg-white p-3 text-pink-50">
                      <strong>{event.startup_name}</strong>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-300">No events found.</p>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
