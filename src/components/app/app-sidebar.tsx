'use client';

import * as React from 'react';
import { Bot, Building, Frame, GalleryVerticalEnd, Map, PieChart, Settings2 } from 'lucide-react';

import { NavMain } from '@/components/app/nav-main';
import { NavResources } from '@/components/app/nav-resources';
import { NavUser } from '@/components/app/nav-user';
import { TeamSwitcher } from '@/components/app/team-switcher';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar';

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
      url: '#',
      icon: Building,
      isActive: true,
    },
    {
      title: 'Investors',
      url: '#',
      icon: Bot,
    },
    {
      title: 'Settings',
      url: '#',
      disabled: true,
      icon: Settings2,
      items: [
        {
          title: 'General',
          url: '#',
        },
        {
          title: 'Team',
          url: '#',
        },
        {
          title: 'Billing',
          url: '#',
        },
        {
          title: 'Limits',
          url: '#',
        },
      ],
    },
  ],
  resources: [
    {
      name: 'Resource 1',
      url: '#',
      icon: Frame,
    },
    {
      name: 'Resource 2',
      url: '#',
      icon: PieChart,
    },
    {
      name: 'Resource 3',
      url: '#',
      icon: Map,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavResources projects={data.resources} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
