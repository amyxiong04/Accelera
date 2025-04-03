'use client';

import * as React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Loader2, Calendar } from 'lucide-react';
import { handleEventParticipation } from '@/actions/events/participate-event-action';
import { useServerAction } from '@/hooks/useServerAction';
import { toast } from 'sonner';
import { projectEvents } from '@/actions/events/project-events';

interface EventParticipationDialogProps {
  startupId: number;
  startupName: string;
}

type Event = {
  event_id: number;
  name: string;
  event_type: string;
  description?: string;
  date: string;
  location: string;
};

export function EventParticipationDialog({
  startupId,
  startupName,
}: EventParticipationDialogProps) {
  const [open, setOpen] = React.useState(false);
  const [selectedEventId, setSelectedEventId] = React.useState<string>('');

  // Fetch available events
  const {
    data: eventsData,
    error: eventsError,
    isPending: eventsLoading,
    mutateAsync,
  } = useServerAction(projectEvents);

  // Handle event participation mutation
  const { mutateAsync: participateEvent, isPending: participationPending } =
    useServerAction(handleEventParticipation);

  React.useEffect(() => {
    if (open) {
      const formData = new FormData();
      const selectedFields = ['event_id', 'name', 'location', 'event_type'];
      selectedFields.forEach((field) => {
        formData.append('attributes', field);
      });

      mutateAsync(formData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const handleParticipation = async () => {
    if (!selectedEventId) {
      toast.error('No event selected', {
        description: 'Please select an event to participate',
      });
      return;
    }

    const formData = new FormData();
    formData.append('event_id', selectedEventId);
    formData.append('startup_id', startupId.toString());
    formData.append('registration_date', Math.round(Date.now() / 1000).toString());

    const result = await participateEvent(formData);

    if (result.error) {
      toast.error('Failed to register for event', {
        description: result.error,
      });
    } else {
      toast.success('Successfully registered', {
        description: `${startupName} is now registered for the selected event.`,
      });
      setOpen(false);
      setSelectedEventId('');
    }
  };

  const selectedEvent = eventsData?.find((e) => e.event_id.toString() === selectedEventId) as
    | Event
    | undefined;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Calendar className="mr-2 h-4 w-4" />
          Participate in Event
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Event Registration</DialogTitle>
          <DialogDescription>Register {startupName} for an upcoming event.</DialogDescription>
        </DialogHeader>

        {eventsLoading ? (
          <div className="flex justify-center py-4">
            <Loader2 className="text-primary h-6 w-6 animate-spin" />
          </div>
        ) : eventsError ? (
          <div className="py-2 text-sm text-red-500">Error loading events: {eventsError}</div>
        ) : !eventsData?.length ? (
          <div className="text-muted-foreground py-2 text-sm">No events available</div>
        ) : (
          <div className="py-4">
            <Select onValueChange={setSelectedEventId} value={selectedEventId}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select an event" />
              </SelectTrigger>
              <SelectContent>
                {eventsData?.map((event) => (
                  <SelectItem key={event.event_id as string} value={event.event_id.toString()}>
                    {event.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {selectedEvent && (
              <div className="mt-4 space-y-3 text-sm">
                <div>
                  <p className="font-medium">Description:</p>
                  <p className="text-muted-foreground">
                    {selectedEvent.description || 'No description available'}
                  </p>
                </div>
                <div>
                  <p className="font-medium">Date:</p>
                  <p className="text-muted-foreground">{selectedEvent.date}</p>
                </div>
                <div>
                  <p className="font-medium">Location:</p>
                  <p className="text-muted-foreground">{selectedEvent.location}</p>
                </div>
              </div>
            )}
          </div>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleParticipation} disabled={participationPending || !selectedEventId}>
            {participationPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Register
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
