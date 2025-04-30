/* eslint-disable @typescript-eslint/ban-ts-comment */
'use client';

import type React from 'react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/context/AuthContext';
import { useServerAction } from '@/hooks/useServerAction';
import { updateUser } from '@/actions/users/update-user';
import { toast } from 'sonner';

export default function UserProfile() {
  const { user: currentUser, setAuthState } = useAuth();
  const { mutateAsync, isPending } = useServerAction(updateUser);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    formData.append('oldEmail', currentUser?.email as string);
    formData.append('newEmail', formData.get('email') as string);

    const result = await mutateAsync(formData);
    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success('User updated successfully!');
      //@ts-ignore
      setAuthState((prev) => {
        return {
          ...prev,
          user: {
            ...prev.user,
            name: formData.get('name') as string,
            email: formData.get('email') as string,
          },
        };
      });

      console.log('User updated successfully:', result.data);
    }
  };

  return (
    <Card className="mx-auto w-full max-w-md">
      <CardHeader>
        <CardTitle>User Profile</CardTitle>
        <CardDescription>Update your personal information and password</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" defaultValue={currentUser?.name} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" defaultValue={currentUser?.email} />
          </div>
        </CardContent>
        <CardFooter className="my-4 w-full justify-center">
          <div className="flex w-full items-center justify-center gap-3">
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
}
