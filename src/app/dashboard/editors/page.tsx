"use client";

import * as React from 'react';
import { useState, useEffect } from 'react';
import type { Metadata } from 'next';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Download as DownloadIcon } from '@phosphor-icons/react/dist/ssr/Download';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import { Upload as UploadIcon } from '@phosphor-icons/react/dist/ssr/Upload';
import dayjs from 'dayjs';
import Divider from '@mui/material/Divider';
import TablePagination from '@mui/material/TablePagination';

import { config } from '@/config';
import { CustomersFilters } from '@/components/dashboard/customer/customers-filters';
import { CustomersTable } from '@/components/dashboard/customer/customers-table';

interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  roles: string[];
}

interface ApiResponse {
  data: User[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export default function Page(): React.JSX.Element {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [users, setUsers] = useState<User[]>([]);
  const [count, setCount] = useState<number>(0);
  const [page, setPage] = useState<number>(0); // MUI uses zero-based index
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  useEffect(() => {
    setPage(0);
  }, [searchQuery]);

  const fetchUsers = async () => {
    try {
      const params = new URLSearchParams({
        page: (page + 1).toString(),
        limit: rowsPerPage.toString(),
        ...(searchQuery && { searchQuery: searchQuery })
      });

      const response = await fetch(`http://localhost:4000/users/editors?${params}`);
      const data: ApiResponse = await response.json();

      setUsers(data.data.map(user => ({
        ...user,
        // Transform to Customer type if needed
        avatar: '', // Add default avatar or map from backend data
        phone: '', // Add phone if available in backend
        address: { // Add address if available in backend
          city: '',
          country: '',
          state: '',
          street: ''
        }
      })));
      setCount(data.meta.total);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page, rowsPerPage, searchQuery]);

  const handlePageChange = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page when changing page size
  };

  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h4">Editors</Typography>
        </Stack>
      </Stack>
      <CustomersFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      <CustomersTable
        count={count}
        page={page}
        rows={users}
        rowsPerPage={rowsPerPage}
        refreshData={fetchUsers}
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

