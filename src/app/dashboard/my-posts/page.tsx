'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import TablePagination from '@mui/material/TablePagination';

import { BlogPostsTable } from '@/components/dashboard/post/posts-table';
import { CustomersFilters as PostsFilters } from '@/components/dashboard/customer/customers-filters';

interface Post {
  id: number;
  title: string;
  content: string;
  status: 'draft' | 'published';
  createdAt: string;
  updatedAt: string;
  author: string;
}

interface ApiResponse {
  data: Post[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export default function Page(): React.JSX.Element {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [posts, setPosts] = useState<Post[]>([]);
  const [count, setCount] = useState<number>(0);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  useEffect(() => {
    setPage(0);
  }, [searchQuery]);

  const fetchPosts = async () => {
    try {
      const token = localStorage.getItem('custom-auth-token');
      if (!token) {
        throw new Error('No auth token found in local storage');
      }

      const params = new URLSearchParams({
        page: (page + 1).toString(),
        limit: rowsPerPage.toString(),
        ...(searchQuery && { searchQuery })
      });

      const response = await fetch(`http://localhost:4000/posts/me?${params}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data: ApiResponse = await response.json();

      setPosts(data.data);
      setCount(data.meta.total);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [page, rowsPerPage, searchQuery]);

  const handlePageChange = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Stack spacing={3}>
    <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h4">Posts</Typography>
        </Stack>
      </Stack>

      <PostsFilters searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      <BlogPostsTable
        rows={posts}
        count={count}
        page={page}
        rowsPerPage={rowsPerPage}
        refreshData={fetchPosts}
      />

      <Divider />

      <TablePagination
        component="div"
        count={count}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[2, 5, 10]}
      />
    </Stack>
  );
}

