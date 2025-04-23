import type { NavItemConfig } from '@/types/nav';
import { paths } from '@/paths';

export const navItems = [
  { key: 'overview', title: 'Overview', href: paths.dashboard.overview, icon: 'chart-pie' },
  { key: 'users', title: 'Users', href: paths.dashboard.users, icon: 'users' },
  /*{ key: 'posts', title: 'Posts', href: paths.dashboard.posts, icon: 'note' },
  { key: 'my-posts', title: 'My Posts', href: paths.dashboard.myPosts, icon: 'note' },*/
] satisfies NavItemConfig[];
