'use client';

import { handleGroup } from '@/actions/group-capital';
import { Button } from '@/components/ui/button';
import { useServerAction } from '@/hooks/useServerAction';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader } from '../ui/card';

export function GroupCapitalForm({ className, ...props }: React.ComponentProps<'form'>) {
  const {
    mutateAsync,
    isPending: isSubmitting,
    error: actionError,
    data: results,
    isError,
  } = useServerAction(handleGroup);

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
        <h1 className="text-2xl font-bold">Generate Investor Group&apos;s Average Capital</h1>
        <p className="text-muted-foreground text-sm text-balance">Generate below</p>
      </CardHeader>
      <CardContent className="w-full">
        <form className={cn('flex flex-col gap-6', className)} onSubmit={handleSubmit} {...props}>
          <div className="grid gap-6">
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Generating...' : 'Generate'}
            </Button>
            {isError && <p className="text-sm text-red-500">{actionError}</p>}
          </div>
        </form>
        {results && (
          <div className="mt-6">
            <h2 className="mb-2 text-lg font-bold">All Investor Group:</h2>
            <div className="max-h-64 overflow-y-auto rounded-md border p-3">
              {results.length > 0 ? (
                <ul className="space-y-2">
                  {results.map((group, idx) => (
                    <li key={idx} className="rounded-md border p-3">
                      <strong>{group.name}</strong> | ${Number(group.avg).toFixed(2)}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-300">No groups found.</p>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
