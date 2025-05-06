'use client';

import * as React from 'react';
import RouterLink from 'next/link';
import { usePathname } from 'next/navigation';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ArrowSquareUpRight as ArrowSquareUpRightIcon } from '@phosphor-icons/react/dist/ssr/ArrowSquareUpRight';
import { CaretUpDown as CaretUpDownIcon } from '@phosphor-icons/react/dist/ssr/CaretUpDown';

import type { NavItemConfig } from '@/types/nav';
import { paths } from '@/paths';
import { isNavItemActive } from '@/lib/is-nav-item-active';
import { Logo } from '@/components/core/logo';

import { navItems } from './config';
import { navIcons } from './nav-icons';

export function SideNav(): React.JSX.Element {
  const pathname = usePathname();

  return (
    <Box
      sx={{
        '--SideNav-background': 'var(--mui-palette-neutral-950)',
        '--SideNav-color': 'var(--mui-palette-common-white)',
        '--NavItem-color': 'var(--mui-palette-neutral-300)',
        '--NavItem-hover-background': 'rgba(255, 255, 255, 0.04)',
        '--NavItem-active-background': 'var(--mui-palette-primary-main)',
        '--NavItem-active-color': 'var(--mui-palette-primary-contrastText)',
        '--NavItem-disabled-color': 'var(--mui-palette-neutral-500)',
        '--NavItem-icon-color': 'var(--mui-palette-neutral-400)',
        '--NavItem-icon-active-color': 'var(--mui-palette-primary-contrastText)',
        '--NavItem-icon-disabled-color': 'var(--mui-palette-neutral-600)',
        bgcolor: 'var(--SideNav-background)',
        color: 'var(--SideNav-color)',
        display: { xs: 'none', lg: 'flex' },
        flexDirection: 'column',
        height: '100%',
        left: 0,
        maxWidth: '100%',
        position: 'fixed',
        scrollbarWidth: 'none',
        top: 0,
        width: 'var(--SideNav-width)',
        zIndex: 'var(--SideNav-zIndex)',
        '&::-webkit-scrollbar': { display: 'none' },
      }}
    >
      <Stack spacing={2} sx={{ p: 4 }}>
        <Box component={RouterLink} href={paths.home} sx={{ display: 'inline-flex' }}>
          {/* LOGO */}
        </Box>
      </Stack>
      <Divider sx={{ borderColor: 'var(--mui-palette-neutral-700)' }} />
      <Box component="nav" sx={{ flex: '1 1 auto', p: '12px' }}>
        {renderNavItemsNew({ pathname, items: navItems })}
      </Box>
    </Box>
  );
}

function renderNavItemsNew({ items = [], pathname }: { items?: NavItemConfig[]; pathname: string }): React.JSX.Element {
  const children = items.reduce((acc: React.ReactNode[], curr: NavItemConfig): React.ReactNode[] => {
    const { key, ...item } = curr;

    acc.push(<NavItem key={key} pathname={pathname} {...item} />);

    return acc;
  }, []);

  return (
    <Box component="nav" sx={{ flex: '1 1 auto', p: '12px' }}>
      {navItems.map((section, sectionIndex) => (
        <React.Fragment key={section.label || `section-${sectionIndex}`}>
          {section.label && (
            <Typography
              component="div"
              variant="caption"
              sx={{
                color: 'var(--NavItem-color)',
                px: 2,
                py: 1,
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}
            >
              {section.label}
            </Typography>
          )}

          <Stack component="ul" spacing={1} sx={{ listStyle: 'none', m: 0, p: 0 }}>
            {section.items.map((item) => (
              <NavItem key={item.key} pathname={pathname} {...item} />
            ))}
          </Stack>

          {sectionIndex < navItems.length - 1 && (
            <Divider sx={{
              borderColor: 'var(--mui-palette-neutral-700)',
              my: 2
            }} />
          )}
        </React.Fragment>
      ))}
    </Box>
  );
}

interface NavItemProps extends Omit<NavItemConfig, 'items'> {
  pathname: string;
}

function NavItem({
  disabled,
  external,
  href,
  icon,
  matcher,
  pathname,
  title,
  items,
}: NavItemProps): React.JSX.Element {
  const active = isNavItemActive({ disabled, external, href, matcher, pathname });
  const Icon = icon ? navIcons[icon] : null;
  const [open, setOpen] = React.useState(false);
  const hasChildren = items && items.length > 0;

  return (
    <li>
      <Box
        sx={{
          alignItems: 'center',
          borderRadius: 1,
          color: 'var(--NavItem-color)',
          display: 'flex',
          flex: '0 0 auto',
          gap: 1,
          p: '6px 16px',
          position: 'relative',
          textDecoration: 'none',
          whiteSpace: 'nowrap',
          ...(disabled && {
            bgcolor: 'var(--NavItem-disabled-background)',
            color: 'var(--NavItem-disabled-color)',
            cursor: 'not-allowed',
          }),
          ...(active && { bgcolor: 'var(--NavItem-active-background)', color: 'var(--NavItem-active-color)' }),
        }}
      >
        {Icon && (
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon
              fill={active ? 'var(--NavItem-icon-active-color)' : 'var(--NavItem-icon-color)'}
              fontSize="var(--icon-fontSize-md)"
              weight={active ? 'fill' : undefined}
            />
          </Box>
        )}

        {/* Title link */}
        {href && !disabled ? (
          <Typography
            component={external ? 'a' : RouterLink}
            href={href}
            target={external ? '_blank' : undefined}
            rel={external ? 'noreferrer' : undefined}
            sx={{
              color: 'inherit',
              fontSize: '0.875rem',
              fontWeight: 500,
              lineHeight: '28px',
              flexGrow: 1,
              textDecoration: 'none',
            }}
          >
            {title}
          </Typography>
        ) : (
          <Typography
            component="span"
            sx={{ fontSize: '0.875rem', fontWeight: 500, flexGrow: 1 }}
          >
            {title}
          </Typography>
        )}

        {/* Dropdown toggle */}
        {hasChildren && (
          <Box
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation(); // Prevent RouterLink from triggering
              setOpen(!open);
            }}
            sx={{
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              ml: 1,
            }}
          >
            <CaretUpDownIcon
              size={16}
              weight="bold"
              style={{ transform: open ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }}
            />
          </Box>
        )}
      </Box>

      {/* Nested items */}
      {hasChildren && open && (
        <Stack component="ul" spacing={1} sx={{ listStyle: 'none', m: 0, p: 0, pl: 4, pt: 1 }}>
          {items.map((child) => (
            <NavItem key={child.key} pathname={pathname} {...child} />
          ))}
        </Stack>
      )}
    </li>
  );
}

