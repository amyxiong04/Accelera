'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader } from '../ui/card';
import Link from 'next/link';
import { handleSignup } from '@/actions/users/signup-action';
import { useServerAction } from '@/hooks/useServerAction';

export function JoinForm({ className, ...props }: React.ComponentProps<'form'>) {
  const {
    mutateAsync,
    isPending: isSubmitting,
    error: actionError,
    isError,
  } = useServerAction(handleSignup);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    mutateAsync(formData).then((result) => {
      if (!result.error) {
        window.location.href = '/auth/login'; // Redirect to login after successful signup
      }
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <h1 className="text-2xl font-bold">Create an account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your details below to create your account
        </p>
      </CardHeader>
      <CardContent className="w-full">
        <form className={cn('flex flex-col gap-6', className)} onSubmit={handleSubmit} {...props}>
          <div className="grid gap-6">
            <div className="grid gap-3">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" type="text" placeholder="John Doe" required />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" placeholder="m@example.com" required />
            </div>
            {isError && <p className="text-sm text-red-500">{actionError}</p>}

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Creating account...' : 'Sign up'}
            </Button>
          </div>
          <div className="text-center text-sm">
            Already have an account?{' '}
            <Link href={'/auth/login'} className="underline underline-offset-4">
              Login
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
