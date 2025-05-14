'use client';

import * as React from 'react';
import {
  Avatar, Box, Card, Checkbox, Divider, Stack, Table, TableBody, TableCell,
  TableHead, TablePagination, TableRow, Typography, Chip, Dialog,
  DialogTitle, DialogContent, DialogActions, Button, TextField, Autocomplete
} from '@mui/material';
import dayjs from 'dayjs';
import { useSelection } from '@/hooks/use-selection';

interface Author {
  id: string;
  name: string;
  email: string;
  roles: string[];
}

interface CoverImage {
  url: string;
  type: string;
}

interface BlogPost {
  id: string;
  title: string;
  content: string;
  status: 'draft' | 'published' | 'pending';
  author: Author | null;
  coverImage: CoverImage | null;
  createdAt: string;
  updatedAt: string;
}

interface BlogPostsTableProps {
  count?: number;
  page?: number;
  rows?: BlogPost[];
  rowsPerPage?: number;
  refreshData?: () => void;
}

export function BlogPostsTable({
  count = 0,
  rows = [],
  page = 0,
  rowsPerPage = 0,
  refreshData = () => {}
}: BlogPostsTableProps): React.JSX.Element {
  const [openModal, setOpenModal] = React.useState(false);
  const [selectedPost, setSelectedPost] = React.useState<BlogPost | null>(null);

  const rowIds = React.useMemo(() => rows.map((post) => post.id), [rows]);

  const { selectAll, deselectAll, selectOne, deselectOne, selected } = useSelection(rowIds);
  const selectedSome = selected.size > 0 && selected.size < rows.length;
  const selectedAll = rows.length > 0 && selected.size === rows.length;

  return (
    <>
      <Card>
        <Box sx={{ overflowX: 'auto' }}>
          <Table sx={{ minWidth: '900px' }}>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedAll}
                    indeterminate={selectedSome}
                    onChange={(event) => {
                      if (event.target.checked) selectAll();
                      else deselectAll();
                    }}
                  />
                </TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Author</TableCell>
                <TableCell>Created</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => {
                const isSelected = selected.has(row.id);

                return (
                  <TableRow
                    hover
                    key={row.id}
                    selected={isSelected}
                    onClick={() => {
                      setSelectedPost(row);
                      setOpenModal(true);
                    }}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                        onChange={(e) => {
                          if (e.target.checked) selectOne(row.id);
                          else deselectOne(row.id);
                        }}
                      />
                    </TableCell>
                    <TableCell>{row.title}</TableCell>
                    <TableCell>
                      <Chip label={row.status} color={
                        row.status === 'published' ? 'success' :
                        row.status === 'draft' ? 'default' : 'warning'
                      } />
                    </TableCell>
                    <TableCell>{row.author?.name ?? '—'}</TableCell>
                    <TableCell>{dayjs(row.createdAt).format('MMM D, YYYY')}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Card>

      <Dialog open={openModal} onClose={() => setOpenModal(false)} maxWidth="md" fullWidth>
        <DialogTitle>Edit Blog Post</DialogTitle>
        <DialogContent dividers sx={{ p: 4 }}>
          {selectedPost && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <TextField
                label="Title"
                value={selectedPost.title}
                onChange={(e) =>
                  setSelectedPost({ ...selectedPost, title: e.target.value })
                }
                fullWidth
              />
              <TextField
                label="Content"
                value={selectedPost.content}
                multiline
                rows={4}
                onChange={(e) =>
                  setSelectedPost({ ...selectedPost, content: e.target.value })
                }
                fullWidth
              />
              <Autocomplete
                options={['draft', 'published', 'pending']}
                value={selectedPost.status}
                onChange={(_, newStatus) =>
                  setSelectedPost({ ...selectedPost, status: newStatus as any })
                }
                renderInput={(params) => <TextField {...params} label="Status" />}
              />
              <Divider />
              <TextField
                label="Author"
                value={selectedPost.author?.name ?? '—'}
                InputProps={{ readOnly: true, disabled: true }}
                fullWidth
              />
              <TextField
                label="Created At"
                value={dayjs(selectedPost.createdAt).format('MMM D, YYYY')}
                InputProps={{ readOnly: true, disabled: true }}
                fullWidth
              />
              <TextField
                label="Last Updated"
                value={dayjs(selectedPost.updatedAt).format('MMM D, YYYY')}
                InputProps={{ readOnly: true, disabled: true }}
                fullWidth
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'space-between', px: 4, py: 2 }}>
          <Button color="error" variant="outlined" onClick={async () => {
            if (!selectedPost) return;
            try {
              const token = localStorage.getItem("custom-auth-token");
              await fetch(`http://localhost:4000/posts/${selectedPost.id}`, {
                method: 'DELETE',
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
              console.log('Post deleted');
            } catch (error) {
              console.error('Error deleting post:', error);
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
              if (!selectedPost) return;
              const token = localStorage.getItem("custom-auth-token");
              try {
                const { id, title, content, status } = selectedPost;

                // Update title and content
                await fetch(`http://localhost:4000/posts/${id}`, {
                  method: 'PATCH',
                  headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                  },
                  body: JSON.stringify({ title, content }),
                });

                // Update status separately
                await fetch(`http://localhost:4000/posts/status/${id}`, {
                  method: 'PATCH',
                  headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                  },
                  body: JSON.stringify({ status }),
                });

                console.log('Post updated successfully');
              } catch (error) {
                console.error('Error updating post:', error);
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

