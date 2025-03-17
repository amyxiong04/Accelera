'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader } from '../ui/card';
import Link from 'next/link';
import { handleLogin } from '@/actions/users/login-action';
import { useServerAction } from '@/hooks/useServerAction';
import { useAuth } from '@/context/AuthContext';

export function LoginForm({ className, ...props }: React.ComponentProps<'form'>) {
  const { login } = useAuth();
  const {
    mutateAsync,
    isPending: isSubmitting,
    error: actionError,
    isError,
  } = useServerAction(handleLogin);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    mutateAsync(formData).then((result) => {
      if (!result.error && result.data?.user) {
        login(result.data);
        window.location.href = '/';
      }
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your email below to login to your account
        </p>
      </CardHeader>
      <CardContent className="w-full">
        <form className={cn('flex flex-col gap-6', className)} onSubmit={handleSubmit} {...props}>
          <div className="grid gap-6">
            <div className="grid gap-3">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" placeholder="m@example.com" required />
            </div>
            <div className="grid gap-3">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input id="password" name="password" type="password" required />
            </div>
            {isError && <p className="text-sm text-red-500">{actionError}</p>}

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Logging in...' : 'Login'}
            </Button>
          </div>
          <div className="text-center text-sm">
            Don&apos;t have an account?{' '}
            <Link href={'/auth/signup'} className="underline underline-offset-4">
              Sign up
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
