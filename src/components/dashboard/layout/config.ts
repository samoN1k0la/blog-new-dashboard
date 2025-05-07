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
      {
        key: 'users',
        title: 'Users',
        icon: 'users',
        href: paths.dashboard.users,
        items: [
          { key: 'admins', title: 'Admins', href: paths.dashboard.admins, icon: 'shield' },
          { key: 'editors', title: 'Editors', href: paths.dashboard.editors, icon: 'pencil-simple' },
          { key: 'reviewers', title: 'Reviewers', href: paths.dashboard.reviewers, icon: 'magnifying-glass' },
        ],
      },
      { key: 'posts', title: 'Posts', href: paths.dashboard.posts, icon: 'note' },
      {
        key: 'heroes',
        title: 'Heroes',
        href: paths.dashboard.posts,
        icon: 'images',
        items: [
          { key: 'createHero', title: 'Create Hero', href: paths.dashboard.createHero, icon: 'pencil-line' },
        ]
      },
    ],
  },
  {
    label: 'Editor',
    items: [
      {
        key: 'my-posts',
        title: 'My Posts',
        href: paths.dashboard.myPosts,
        icon: 'note',
        items: [
          { key: 'createPost', title: 'Create Post', href: paths.dashboard.createPost, icon: 'pencil-line' },
        ]
      },
    ],
  },
];

