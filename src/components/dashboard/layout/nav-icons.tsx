import type { Icon } from '@phosphor-icons/react/dist/lib/types';
import { ChartPie as ChartPieIcon } from '@phosphor-icons/react/dist/ssr/ChartPie';
import { GearSix as GearSixIcon } from '@phosphor-icons/react/dist/ssr/GearSix';
import { PlugsConnected as PlugsConnectedIcon } from '@phosphor-icons/react/dist/ssr/PlugsConnected';
import { User as UserIcon } from '@phosphor-icons/react/dist/ssr/User';
import { Users as UsersIcon } from '@phosphor-icons/react/dist/ssr/Users';
import { XSquare } from '@phosphor-icons/react/dist/ssr/XSquare';
import { Note } from '@phosphor-icons/react/dist/ssr/Note';
import { Shield } from '@phosphor-icons/react/dist/ssr/Shield';
import { PenNibStraight } from '@phosphor-icons/react/dist/ssr/PenNibStraight';
import { MagnifyingGlass } from '@phosphor-icons/react/dist/ssr/MagnifyingGlass';

export const navIcons = {
  'chart-pie': ChartPieIcon,
  'gear-six': GearSixIcon,
  'plugs-connected': PlugsConnectedIcon,
  'x-square': XSquare,
  'note': Note,
  'shield': Shield,
  'pencil-simple': PenNibStraight,
  'magnifying-glass': MagnifyingGlass,
  user: UserIcon,
  users: UsersIcon,
} as Record<string, Icon>;
