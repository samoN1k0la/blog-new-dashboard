'use client';

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import dayjs from 'dayjs';

import { useSelection } from '@/hooks/use-selection';

interface CustomersTableProps {
  count?: number;
  page?: number;
  rows?: Customer[];
  rowsPerPage?: number;
  refreshData?: () => void;
}

export function CustomersTable({
  count = 0,
  rows = [],
  page = 0,
  rowsPerPage = 0,
  refreshData = () => {}
}: CustomersTableProps): React.JSX.Element {
  const [openModal, setOpenModal] = React.useState(false);
  const [selectedCustomer, setSelectedCustomer] = React.useState<Customer | null>(null);

  const rowIds = React.useMemo(() => {
    return rows.map((customer) => customer.id);
  }, [rows]);

  const { selectAll, deselectAll, selectOne, deselectOne, selected } = useSelection(rowIds);

  const selectedSome = (selected?.size ?? 0) > 0 && (selected?.size ?? 0) < rows.length;
  const selectedAll = rows.length > 0 && selected?.size === rows.length;

  return (
    <>
      <Card>
        <Box sx={{ overflowX: 'auto' }}>
          <Table sx={{ minWidth: '800px' }}>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedAll}
                    indeterminate={selectedSome}
                    onChange={(event) => {
                      if (event.target.checked) {
                        selectAll();
                      } else {
                        deselectAll();
                      }
                    }}
                  />
                </TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Profile created</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => {
                const isSelected = selected?.has(row.id);

                return (
                  <TableRow
                    hover
                    key={row.id}
                    selected={isSelected}
                    onClick={() => {
                      setSelectedCustomer(row);
                      setOpenModal(true);
                    }}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                        onChange={(event) => {
                          if (event.target.checked) {
                            selectOne(row.id);
                          } else {
                            deselectOne(row.id);
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: '4px' }}>
                        {row.roles.map((role) => (
                          <Chip key={role} label={role} variant="outlined" size="small" />
                        ))}
                      </Stack>
                    </TableCell>
                    <TableCell>{dayjs(row.createdAt).format('MMM D, YYYY')}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Card>
      <Dialog open={openModal} onClose={() => setOpenModal(false)} maxWidth="md" fullWidth>
        <DialogTitle>Edit Account</DialogTitle>
        <DialogContent dividers sx={{ p: 4 }}>
          {selectedCustomer && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <TextField
                label="Name"
                value={selectedCustomer.name}
                onChange={(e) =>
                  setSelectedCustomer({ ...selectedCustomer, name: e.target.value })
                }
                fullWidth
              />
              <TextField
                label="Email"
                value={selectedCustomer.email}
                onChange={(e) =>
                  setSelectedCustomer({ ...selectedCustomer, email: e.target.value })
                }
                fullWidth
              />
              <Autocomplete
                multiple
                options={['ADMIN', 'EDITOR', 'REVIEWER']}
                value={selectedCustomer.roles}
                onChange={(_, newValue) =>
                  setSelectedCustomer({ ...selectedCustomer, roles: newValue })
                }
                renderInput={(params) => <TextField {...params} label="Roles" />}
              />
              <Divider />
              <TextField
                label="Profile Created"
                value={dayjs(selectedCustomer.createdAt).format('MMM D, YYYY')}
                InputProps={{ readOnly: true, disabled: true }}
                fullWidth
              />
              <TextField
                label="Last Profile Update"
                value={dayjs(selectedCustomer.updatedAt).format('MMM D, YYYY')}
                InputProps={{ readOnly: true, disabled: true }}
                fullWidth
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'space-between', px: 4, py: 2 }}>
          <Button color="error" variant="outlined" onClick={async () => {
            try {
              await fetch(`http://localhost:4000/users/${selectedCustomer.id}`, {
                method: 'DELETE',
              });

              console.log('User deleted');
            } catch (error) {
              console.error('Error deleting user:', error);
            } finally {
              setOpenModal(false);
              refreshData();
            }
          }}>
            Delete
          </Button>
          <Box>
            <Button onClick={() => setOpenModal(false)} sx={{ mr: 1 }}>
              Cancel
            </Button>
            <Button variant="contained" onClick={async () => {
              try {
                const { id, name, email, roles } = selectedCustomer;

                await fetch(`http://localhost:4000/users/${id}`, {
                  method: 'PATCH',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ name, email }),
                });

                await fetch(`http://localhost:4000/users/role/${id}`, {
                  method: 'PATCH',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ roles }),
                });

                console.log('User updated successfully');
              } catch (error) {
                console.error('Error updating user:', error);
              } finally {
                setOpenModal(false);
                refreshData();
              }
            }}>
              Save Changes
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
    </>
  );
}
