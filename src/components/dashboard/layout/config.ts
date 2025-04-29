import type { NavItemConfig } from '@/types/nav';
import { paths } from '@/paths';

export interface NavSection {
  label?: string;
  items: NavItemConfig[];
}

export const navItems: NavSection[] = [
  {
    label: 'General',
    items: [
      { key: 'overview', title: 'Overview', href: paths.dashboard.overview, icon: 'chart-pie' },
    ],
  },
  {
    label: 'Admin',
    items: [
      { key: 'users', title: 'Users', href: paths.dashboard.users, icon: 'users' },
      { key: 'admins', title: 'Admins', href: paths.dashboard.admins, icon: 'users' },
      { key: 'editors', title: 'Editors', href: paths.dashboard.editors, icon: 'users' },
      { key: 'reviewers', title: 'Reviewers', href: paths.dashboard.reviewers, icon: 'users' },
    ],
  },
  {
    label: 'Editor',
    items: [
      { key: 'posts', title: 'Posts', href: paths.dashboard.posts, icon: 'note' },
      { key: 'my-posts', title: 'My Posts', href: paths.dashboard.myPosts, icon: 'note' },
    ],
  },
];

/*
export const navItems = [
  { key: 'overview', title: 'Overview', href: paths.dashboard.overview, icon: 'chart-pie' },
  { key: 'users', title: 'Users', href: paths.dashboard.users, icon: 'users' },
  { key: 'posts', title: 'Posts', href: paths.dashboard.posts, icon: 'note' },
  { key: 'my-posts', title: 'My Posts', href: paths.dashboard.myPosts, icon: 'note' },
] satisfies NavItemConfig[];*/
