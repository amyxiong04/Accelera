import type { Metadata } from 'next';
import { Figtree } from 'next/font/google';
import './globals.css';

// This should run before the nextjs app is mounted.
import '../lib/startup';

import { SchemaUpdater } from '@/components/app/schema-updater';
import { AuthProvider } from '@/context/AuthContext';
import { TopProgressBar } from '@/components/ui/progress-bar';
import { Toaster } from 'sonner';

const figtreeFont = Figtree({
  variable: '--font-figtree',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Accelera - Auth',
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
          <main className="h-full w-full">{children}</main>
          <Toaster />
          <SchemaUpdater />
        </AuthProvider>
      </body>
    </html>
  );
}
