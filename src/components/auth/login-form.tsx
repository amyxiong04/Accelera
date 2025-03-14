'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader } from '../ui/card';
import Link from 'next/link';
import { handleLogin } from '@/actions/users/login-action';

export function LoginForm({ className, ...props }: React.ComponentProps<'form'>) {
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const clientAction = async (formData: FormData) => {
    setIsSubmitting(true);
    setError('');

    try {
      // Call the server action
      const result = await handleLogin(formData);

      if (result.error) {
        setError("Couldn't log in. Please check your credentials.");
      } else {
        window.location.href = '/';
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    clientAction(formData);
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
            {error && <p className="text-sm text-red-500">{error}</p>}

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
