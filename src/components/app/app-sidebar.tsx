'use client';

import * as React from 'react';
import { Building, Calendar, FileStack, GalleryVerticalEnd, HandCoins, User } from 'lucide-react';

import { NavMain } from '@/components/app/nav-main';
import { NavUser } from '@/components/app/nav-user';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
  SidebarRail,
} from '@/components/ui/sidebar';
import Link from 'next/link';

// This is sample data.
const data = {
  teams: [
    {
      name: 'Accelera',
      logo: GalleryVerticalEnd,
      plan: 'Enterprise',
    },
  ],
  navMain: [
    {
      title: 'Startups',
      url: '/',
      icon: Building,
      isActive: true,
    },
    {
      title: 'Events',
      url: '/events',
      icon: Calendar,
    },
    {
      title: 'Investors',
      url: '/investors',
      icon: HandCoins,
    },
    {
      title: 'Resources',
      url: '/resources',
      icon: FileStack,
    },
    {
      title: 'Account',
      url: '/account',
      icon: User,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenuButton
          asChild
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <Link href="/">
            <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
              <GalleryVerticalEnd className="h-4 w-4" />
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">Accelera</span>
            </div>
          </Link>
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
