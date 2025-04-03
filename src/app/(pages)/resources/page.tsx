/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useAuthentication } from '@/hooks/useAuthentication';
import { useServerAction } from '@/hooks/useServerAction';
import { getResources } from '@/actions/resources/get-resources-action';
import { deleteResource } from '@/actions/resources/delete-resource-action';
import {
  getStartupsWithMoreAccesses,
  ResourceAccessResult,
} from '@/actions/resources/nested-aggregation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, TrendingUp, Award, Trash2 } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { toast } from 'sonner';

export default function ResourcesPage() {
  const { isLoading: authLoading, isLoggedIn } = useAuthentication();
  const [resourceToDelete, setResourceToDelete] = useState<number | null>(null);

  // Get all resources
  const {
    data: resources,
    isPending: resourcesLoading,
    isError: resourcesError,
    error: resourcesErrorMessage,
    mutateAsync: getResourcesAction,
  } = useServerAction(getResources);

  // Get startups with above average resource accesses
  const {
    data: topStartups,
    isPending: topStartupsLoading,
    isError: topStartupsError,
    mutateAsync: getTopStartupsAction,
  } = useServerAction<ResourceAccessResult[], void>(getStartupsWithMoreAccesses);

  // Delete resource action
  const { isPending: isDeleting, mutateAsync: deleteResourceAction } =
    useServerAction(deleteResource);

  useEffect(() => {
    getResourcesAction(undefined);
    getTopStartupsAction(undefined);
  }, []);

  const handleDeleteResource = async () => {
    if (!resourceToDelete) return;

    const result = await deleteResourceAction(resourceToDelete);

    if (result.data) {
      toast.success('Resource deleted', {
        description: 'The resource has been successfully deleted',
      });
      window.location.reload(); // Reload the page to reflect changes
    } else {
      toast.error('Error deleting resource', {
        description: result.error || 'Failed to delete resource',
      });
    }

    // Close dialog
    setResourceToDelete(null);
  };

  if (authLoading || resourcesLoading) {
    return (
      <div className="container mx-auto max-h-full px-6">
        <h1 className="mb-6 text-3xl font-bold">Resources</h1>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="h-[200px] w-full rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-h-screen">
      <ScrollArea className="h-[90vh] w-full px-6 pb-2">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Resources</h1>
          </div>

          {/* Top Performing Startups Card */}
          {!topStartupsLoading && !topStartupsError && topStartups && topStartups.length > 0 && (
            <Card className="">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Award className="text-primary h-5 w-5" />
                  <CardTitle>Top Performing Startups</CardTitle>
                </div>
                <CardDescription>
                  Startups that have accessed more resources than average
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {topStartups.map((startup) => (
                    <div
                      key={startup.startup_id}
                      className="flex flex-col justify-between rounded-lg border p-4 shadow-sm"
                    >
                      <div className="flex items-start justify-between">
                        <h3 className="line-clamp-1 text-lg font-semibold">{startup.name}</h3>
                        <TrendingUp className="text-primary h-4 w-4" />
                      </div>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-muted-foreground text-sm">
                          {startup.access_count} resources
                        </span>
                        <Badge variant="outline" className="bg-primary/10">
                          Above Average
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">All Available Resources</h2>
            {resourcesError ? (
              <Card>
                <CardContent className="pt-6">
                  <p className="text-center text-red-500">
                    {resourcesErrorMessage || 'Failed to load resources. Please try again.'}
                  </p>
                </CardContent>
              </Card>
            ) : resources && resources.length > 0 ? (
              <div className="max-h-[75vh] overflow-y-auto pr-2">
                <div className="grid gap-4 pr-4 md:grid-cols-2 lg:grid-cols-3">
                  <>
                    {resources.map((resource) => (
                      <Card key={resource.resource_id} className="overflow-hidden">
                        <CardHeader className="pb-2">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-xl">{resource.name}</CardTitle>
                            {isLoggedIn && (
                              <Button
                                title="Delete Resource"
                                variant="ghost"
                                size="icon"
                                className="text-destructive hover:bg-destructive/10 h-8 w-8"
                                onClick={() => setResourceToDelete(resource.resource_id)}
                                disabled={isDeleting}
                              >
                                <Trash2 size={16} />
                              </Button>
                            )}
                          </div>
                          <CardDescription className="line-clamp-2">
                            {resource.description}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="mt-2 flex items-center justify-between">
                            <Badge variant="outline" className="bg-primary/10">
                              Resource #{resource.resource_id}
                            </Badge>
                            <a
                              href={resource.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary inline-flex items-center gap-1 text-sm hover:underline"
                            >
                              View Resource <ExternalLink size={14} />
                            </a>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </>
                </div>
              </div>
            ) : (
              <Card>
                <CardContent className="pt-6">
                  <p className="text-muted-foreground text-center">
                    No resources available at the moment.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>

          {!isLoggedIn && (
            <Card>
              <CardContent className="pt-6">
                <p className="text-muted-foreground text-center">
                  Sign in to see personalized resources and create your own startup.
                </p>
                <div className="mt-4 flex justify-center">
                  <Link href="/login">
                    <Button>Sign In</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </ScrollArea>

      {/* Delete confirmation dialog */}
      <AlertDialog
        open={resourceToDelete !== null}
        onOpenChange={(open) => !open && setResourceToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the resource.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteResource}
              disabled={isDeleting}
              className="bg-destructive hover:bg-destructive/90"
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
