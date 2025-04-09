import * as React from 'react';
import Link from 'next/link';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import type { SxProps } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { ArrowRight as ArrowRightIcon } from '@phosphor-icons/react/dist/ssr/ArrowRight';
import dayjs from 'dayjs';

const statusMap = {
  editor: { label: 'Editor', color: 'default', variant: 'outlined' },
  moderator: { label: 'Moderator', color: 'default', variant: 'outlined' },
  admin: { label: 'ADMIN', color: 'primary', variant: 'filled' },
} as const;

export interface User {
  id: string;
  fullName: string;
  status: 'editor' | 'moderator' | 'admin';
  createdAt: Date;
}

export interface NewestUsersProps {
  users?: User[];
  sx?: SxProps;
}

export function NewestUsers({ users = [], sx }: NewestUsersProps): React.JSX.Element {
  return (
    <Card sx={sx}>
      <CardHeader title="Newest users" />
      <Divider />
      <Box sx={{ overflowX: 'auto' }}>
        <Table sx={{ minWidth: 800 }}>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Full name</TableCell>
              <TableCell sortDirection="desc">Account created</TableCell>
              <TableCell>Role</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => {
              const { label, color, variant } = statusMap[user.status] ?? { label: 'Unknown', color: 'default', variant: 'filled' };

              return (
                <TableRow hover key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.fullName}</TableCell>
                  <TableCell>{dayjs(user.createdAt).format('MMM D, YYYY')}</TableCell>
                  <TableCell>
                    <Chip color={color} variant={variant} label={label} size="small" />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Box>
      <Divider />
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button
          component={Link}
          href="/dashboard/users"
          color="inherit"
          endIcon={<ArrowRightIcon fontSize="var(--icon-fontSize-md)" />}
          size="small"
          variant="text"
        >
          View all
        </Button>
      </CardActions>
    </Card>
  );
}
