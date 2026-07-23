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
import { Loader2, FolderOpen } from 'lucide-react';
import { getResources } from '@/actions/resources/get-resources-action';
import { handleResourceAccess } from '@/actions/resources/access-resource-action';
import { useServerAction } from '@/hooks/useServerAction';
import { toast } from 'sonner';

interface ResourceAccessDialogProps {
  startupId: number;
  startupName: string;
}

export function ResourceAccessDialog({ startupId, startupName }: ResourceAccessDialogProps) {
  const [open, setOpen] = React.useState(false);
  const [selectedResourceId, setSelectedResourceId] = React.useState<string>('');

  // Fetch available resources
  const {
    data: resourcesData,
    error: resourcesError,
    isPending: resourcesLoading,
    mutateAsync,
  } = useServerAction(getResources);

  console.log(resourcesData);

  // Handle resource access mutation
  const { mutateAsync: accessResource, isPending: accessPending } =
    useServerAction(handleResourceAccess);

  // Load resources when dialog opens
  React.useEffect(() => {
    if (open) {
      mutateAsync(undefined);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const handleAccessResource = async () => {
    if (!selectedResourceId) {
      toast.error('No resource selected', {
        description: 'Please select a resource to continue',
      });
      return;
    }

    const formData = new FormData();
    formData.append('resource_id', selectedResourceId);
    formData.append('startup_id', startupId.toString());
    formData.append('access_date', Math.round(Date.now() / 1000).toString());
    formData.append('download_date', new Date().toLocaleDateString());

    const result = await accessResource(formData);

    if (result.error) {
      toast.error('Failed to grant resource access', {
        description: result.error,
      });
    } else {
      toast.success('Resource access granted', {
        description: `${startupName} now has access to the selected resource.`,
      });
      setOpen(false);
      setSelectedResourceId('');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <FolderOpen className="mr-2 h-4 w-4" />
          Access Resources
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Grant Resource Access</DialogTitle>
          <DialogDescription>Select a resource to grant access to {startupName}.</DialogDescription>
        </DialogHeader>

        {resourcesLoading ? (
          <div className="flex justify-center py-4">
            <Loader2 className="text-primary h-6 w-6 animate-spin" />
          </div>
        ) : resourcesError ? (
          <div className="py-2 text-sm text-red-500">Error loading resources: {resourcesError}</div>
        ) : (
          <div className="py-4">
            <Select onValueChange={setSelectedResourceId} value={selectedResourceId}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a resource" />
              </SelectTrigger>
              <SelectContent>
                {resourcesData?.map((resource) => (
                  <SelectItem key={resource.resource_id} value={resource.resource_id.toString()}>
                    {resource.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {selectedResourceId && resourcesData && (
              <div className="mt-4 text-sm">
                <p className="font-medium">Description:</p>
                <p className="text-muted-foreground">
                  {resourcesData.find((r) => r.resource_id.toString() === selectedResourceId)
                    ?.description || 'No description available'}
                </p>
              </div>
            )}
          </div>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleAccessResource} disabled={accessPending || !selectedResourceId}>
            {accessPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Grant Access
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
