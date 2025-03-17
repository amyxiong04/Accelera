/* eslint-disable @typescript-eslint/ban-ts-comment */
'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useServerAction } from '@/hooks/useServerAction';
import { createSchemaAction } from '@/actions/schema/create-schema';
import { toast } from 'sonner';

export const SchemaUpdater = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  //@ts-ignore
  const { data, isPending, mutateAsync, error } = useServerAction(createSchemaAction);

  React.useEffect(() => {
    if (data && !isPending) {
      toast.success('Schema recreated successfully!');
    }
  }, [data, isPending]);

  React.useEffect(() => {
    if (error && !isPending) {
      toast.error('Failed to recreate schema!');
    }
  }, [error, isPending]);

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button className="absolute top-2 right-2">Recreate Schema</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action will recreate the database schema. All existing data may be lost. This
            action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => mutateAsync(undefined)} disabled={isPending}>
            {isPending ? 'Processing...' : 'Continue'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
