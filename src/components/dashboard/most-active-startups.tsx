'use client';

import { getStartupAllEvents } from '@/actions/division/get-startup-all-events';
import { Button } from '@/components/ui/button';
import { useServerAction } from '@/hooks/useServerAction';
import { cn } from '@/lib/utils';

export function MostActiveStartups({ className, ...props }: React.ComponentProps<'form'>) {
  const {
    mutateAsync,
    isPending: isSubmitting,
    error: actionError,
    data: results,
    isError,
  } = useServerAction(getStartupAllEvents);

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
      <div>
        <h1 className="text-2xl font-bold">Find the most active Startup</h1>
        <p className="text-muted-foreground text-sm text-balance">Generate below</p>
      </div>
      <div className="mt-4 w-full">
        <form className={cn('flex flex-col gap-6', className)} onSubmit={handleSubmit} {...props}>
          <div className="grid gap-6">
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Finding...' : 'Find Active Startups'}
            </Button>
            {isError && <p className="text-sm text-red-500">{actionError}</p>}
          </div>
        </form>
        {results && (
          <div className="mt-6">
            <h2 className="mb-2 text-lg font-bold">
              The Startups that are participating in all events:
            </h2>
            <div className="max-h-64 overflow-y-auto rounded-md border p-3">
              {results.length > 0 ? (
                <ul className="divide-border divide-y">
                  {results.map((event, idx) => (
                    <li
                      key={idx}
                      className="hover:bg-accent/50 flex items-center justify-between rounded-sm px-2 py-3 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="bg-primary/10 flex h-8 w-8 items-center justify-center rounded-full">
                          <span className="text-sm font-medium">{idx + 1}</span>
                        </div>
                        <div>
                          <p className="font-medium">{event.name}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted-foreground py-4 text-center">
                  No startups found participating in all events.
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
