import { AppSidebar } from '@/components/app/app-sidebar';
import DashboardMetrics from '@/components/dashboard/dashboard-metrics';
import { UserStartups } from '@/components/dashboard/user-startups';
import { MostActiveStartups } from '@/components/dashboard/most-active-startups';

import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <DashboardMetrics />
          <div className="flex h-full w-full items-center justify-center gap-4">
            <Card className="h-full w-2/3">
              <CardContent className="h-full w-full">
                <UserStartups />
              </CardContent>
            </Card>
            <Card className="h-full w-1/3">
              <CardContent className="h-full w-full">
                <MostActiveStartups />
              </CardContent>
            </Card>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
