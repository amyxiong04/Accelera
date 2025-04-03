'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useServerAction } from '@/hooks/useServerAction';
import { useAuthentication } from '@/hooks/useAuthentication';
import { createStartup } from '@/actions/startup/create-startup';
import { CalendarIcon, Loader2, PlusIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { toast } from 'sonner';

export function CreateStartupDialog() {
  const { user } = useAuthentication();
  const userId = user?.id;

  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date>();

  const { mutateAsync, isPending, error } = useServerAction(createStartup);

  // Reset form state when dialog closes
  const handleDialogChange = (open: boolean) => {
    setOpen(open);
    if (!open) {
      setDate(undefined);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!userId) {
      toast.error('Authentication Error', {
        description: 'You must be logged in to create a startup.',
      });
      return;
    }

    if (!date) {
      toast.error('Validation Error', {
        description: 'Founded date is required.',
      });
      return;
    }

    const formData = new FormData(event.currentTarget);

    // Add the date in the format expected by the server
    formData.set('foundedDate', format(date, 'yyyy-MM-dd'));
    formData.set('userId', userId.toString());

    const result = await mutateAsync(formData);

    if (result.error) {
      toast.error('Error Creating Startup', {
        description: result.error,
      });
    } else {
      toast.success('Startup created, please refresh the page!', {
        description: `${result.data?.startup.name} has been successfully created.`,
      });
      setOpen(false);

      // Dispatch a custom event to trigger refresh
      window.dispatchEvent(new CustomEvent('startup-created'));
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleDialogChange}>
      <DialogTrigger asChild>
        <Button>
          <PlusIcon className="mr-2 h-4 w-4" />
          New Startup
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create New Startup</DialogTitle>
            <DialogDescription>
              Fill in the details to create your new startup. Click save when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name" className="required">
                Startup Name
              </Label>
              <Input id="name" name="name" placeholder="Enter startup name" required />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Describe your startup"
                className="resize-none"
                rows={3}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="pitchDeckUrl">Pitch Deck URL</Label>
              <Input
                id="pitchDeckUrl"
                name="pitchDeckUrl"
                type="url"
                placeholder="https://example.com/pitch-deck"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="stage" className="required">
                  Stage
                </Label>
                <Select name="stage" required>
                  <SelectTrigger id="stage">
                    <SelectValue placeholder="Select stage" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Seed">Seed</SelectItem>
                    <SelectItem value="Pre-seed">Pre-seed</SelectItem>
                    <SelectItem value="Series A">Series A</SelectItem>
                    <SelectItem value="Series B">Series B</SelectItem>
                    <SelectItem value="Series C">Series C</SelectItem>
                    <SelectItem value="Growth">Growth</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label className="required">Founded Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        'justify-start text-left font-normal',
                        !date && 'text-muted-foreground',
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, 'PPP') : 'Select date'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="role" className="required">
                Your Role
              </Label>
              <Select name="role" required>
                <SelectTrigger id="role">
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Founder">Founder</SelectItem>
                  <SelectItem value="Co-founder">Co-founder</SelectItem>
                  <SelectItem value="CEO">CEO</SelectItem>
                  <SelectItem value="CTO">CTO</SelectItem>
                  <SelectItem value="Other">Advisor</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {error && <div className="text-destructive mb-4 text-sm">{error}</div>}

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                'Create Startup'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
