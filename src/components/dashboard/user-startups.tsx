/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import * as React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { fetchUserStartups } from '@/actions/startup/startups-manage-by-current-user';
import { useServerAction } from '@/hooks/useServerAction';
import { Loader2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { useAuth } from '@/context/AuthContext';
import { CreateStartupDialog } from '../startup/create-startup-dialog';
import { ResourceAccessDialog } from './resource-access-dialog';
import { EventParticipationDialog } from './event-participation-dialog';

export const UserStartups = () => {
  const { user } = useAuth();
  const user_id = user?.id || '';

  const { mutateAsync, data, error, isPending } = useServerAction(fetchUserStartups);

  React.useEffect(() => {
    if (user_id) {
      mutateAsync(user_id);
    }
  }, [user_id]);

  const refreshStartups = () => {
    if (user_id) {
      mutateAsync(user_id);
    }
  };

  React.useEffect(() => {
    // Add event listener for custom event
    const handleStartupCreated = () => refreshStartups();
    window.addEventListener('startup-created', handleStartupCreated);

    return () => {
      window.removeEventListener('startup-created', handleStartupCreated);
    };
  }, []);

  if (isPending) {
    return (
      <div className="flex h-48 items-center justify-center">
        <Loader2 className="text-primary h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-md bg-red-50 p-4 text-red-600">
        <p>Error: {error}</p>
      </div>
    );
  }

  if (!data?.startups || data.startups.length === 0) {
    return (
      <div className="bg-muted rounded-lg p-6 text-center">
        <h3 className="text-lg font-medium">No startups found</h3>
        <p className="text-muted-foreground mt-2">
          You don&apos;t have any startups associated with your account yet.
        </p>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full flex-col space-y-6 overflow-hidden">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Your Startups</h2>
        <CreateStartupDialog />
      </div>

      <div className="grid max-h-[calc(100%-4rem)] flex-1 grid-cols-1 gap-4 overflow-y-auto md:grid-cols-2">
        {data.startups.map((startup) => (
          <Card key={startup.startup_id} className="flex h-full flex-col">
            <CardHeader>
              <CardTitle>{startup.name}</CardTitle>
              <CardDescription>
                <Badge>{startup.stage}</Badge>
                <span className="text-muted-foreground ml-2 text-sm">
                  Founded {format(new Date(startup.founded_date), 'MMM yyyy')}
                </span>
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-muted-foreground text-sm">
                {startup.description || 'No description available'}
              </p>
            </CardContent>
            <CardFooter className="flex flex-col gap-3 border-t pt-4">
              <div className="flex w-full justify-between">
                <Badge variant="outline">{startup.role}</Badge>
                {startup.pitch_deck_url && (
                  <a
                    href={startup.pitch_deck_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary text-sm hover:underline"
                  >
                    View Pitch Deck
                  </a>
                )}
              </div>
              <div className="flex w-full justify-end">
                <ResourceAccessDialog startupId={startup.startup_id} startupName={startup.name} />
                <EventParticipationDialog
                  startupId={startup.startup_id}
                  startupName={startup.name}
                />
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};
