'use client';

import { handleGroupInvestor } from '@/actions/group/group-investor';
import { Button } from '@/components/ui/button';
import { useServerAction } from '@/hooks/useServerAction';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

export function GroupInvestorForm({ className, ...props }: React.ComponentProps<'form'>) {
  const {
    mutateAsync,
    isPending: isSubmitting,
    error: actionError,
    data: results,
    isError,
  } = useServerAction(handleGroupInvestor);

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
        <h1 className="text-2xl font-bold">Generate Investor</h1>
        <p className="text-muted-foreground text-sm text-balance">Generate below</p>
      </CardHeader>
      <CardContent className="w-full">
        <form className={cn('flex flex-col gap-6', className)} onSubmit={handleSubmit} {...props}>
          <div className="grid gap-6">
            <div className="grid gap-3">
              <Label htmlFor="minimum" className="mb-1 block text-sm">
                Minimum Number of Startup
              </Label>
              <Input
                id="minimum"
                name="minimum"
                type="number"
                placeholder="Put a number (e.g. 2)"
              />
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Generating...' : 'Generate'}
            </Button>
            {isError && <p className="text-sm text-red-500">{actionError}</p>}
          </div>
        </form>
        {results && (
          <div className="mt-6">
            <h2 className="mb-2 text-lg font-bold">All Investors:</h2>
            <div className="max-h-64 overflow-y-auto rounded-md border p-3">
              {results.length > 0 ? (
                <ul className="space-y-2">
                  {results.map((group, idx) => (
                    <li key={idx} className="rounded-md border p-3">
                      <strong>{group.name}</strong> | {group.count}
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
