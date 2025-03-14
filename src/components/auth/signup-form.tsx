'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader } from '../ui/card';
import Link from 'next/link';
import { handleSignup } from '@/actions/users/signup-action'; // Import the server action

export function SignupForm({ className, ...props }: React.ComponentProps<'form'>) {
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const clientAction = async (formData: FormData) => {
    setIsSubmitting(true);

    // Call the server action
    const result = await handleSignup(formData);

    if (result.error) {
      setError(result.error);
      setIsSubmitting(false);
    } else {
      // Handle success (e.g., redirect to login page or show success message)
      setIsSubmitting(false);
      window.location.href = '/auth/login';
    }
  };

  const validatePasswords = (e: React.FormEvent) => {
    const form = e.target as HTMLFormElement;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      e.preventDefault();
      return false;
    } else {
      setError('');
      return true;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validatePasswords(e)) {
      const form = e.target as HTMLFormElement;
      const formData = new FormData(form);
      clientAction(formData);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <h1 className="text-2xl font-bold">Create your account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Fill in your details below to create a new account
        </p>
      </CardHeader>
      <CardContent className="w-full">
        <form className={cn('flex flex-col gap-6', className)} onSubmit={handleSubmit} {...props}>
          <div className="grid gap-6">
            <div className="grid gap-3">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" name="name" type="text" placeholder="John Doe" required />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" placeholder="m@example.com" required />
            </div>
            <div className="grid gap-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <span className="text-muted-foreground text-xs">Min. 8 characters</span>
              </div>
              <Input id="password" name="password" type="password" minLength={8} required />
            </div>
            <div className="grid gap-3">
              <div className="flex items-center">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
              </div>
              <Input id="confirmPassword" name="confirmPassword" type="password" required />
              {error && <p className="text-sm text-red-500">{error}</p>}
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Creating Account...' : 'Sign Up'}
            </Button>
          </div>
          <div className="text-center text-sm">
            Already have an account?{' '}
            <Link href="/auth/login" className="underline underline-offset-4">
              Login
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
