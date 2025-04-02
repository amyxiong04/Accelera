import type { Metadata } from 'next';
import { Figtree } from 'next/font/google';

// This should run before the nextjs app is mounted.
import { SchemaUpdater } from '@/components/app/schema-updater';
import { AuthProvider } from '@/context/AuthContext';
import { TopProgressBar } from '@/components/ui/progress-bar';
import { Toaster } from 'sonner';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app/app-sidebar';
import { Separator } from '@/components/ui/separator';

// Schema

const figtreeFont = Figtree({
  variable: '--font-figtree',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Accelera',
  description: 'Startup Accelerator',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${figtreeFont.variable} ${figtreeFont.className} relative h-screen w-screen`}
      >
        <AuthProvider>
          <TopProgressBar />
          <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
              <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                <div className="flex items-center gap-2 px-4">
                  <SidebarTrigger className="-ml-1" />
                  <Separator orientation="vertical" className="mr-2 h-4" />
                </div>
              </header>
              <main className="h-full w-full overflow-hidden">
                <div className="flex h-full w-full items-center justify-center">{children}</div>
              </main>
            </SidebarInset>
          </SidebarProvider>
          <Toaster />
          <SchemaUpdater />
        </AuthProvider>
      </body>
    </html>
  );
}
