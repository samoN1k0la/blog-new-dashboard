'use client';

import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Unstable_Grid2';
import Stack from '@mui/material/Stack';

const states = [
  { value: 'alabama', label: 'Alabama' },
  { value: 'new-york', label: 'New York' },
  { value: 'san-francisco', label: 'San Francisco' },
  { value: 'los-angeles', label: 'Los Angeles' },
] as const;

const username = "NikolaLukic" as any;
const email = "nikola.lukic@gmail.com" as any;

export function AccountDetailsForm(): React.JSX.Element {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <Card>
        <CardHeader subheader="The information can be edited" title="Account info" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid md={6} xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Username</InputLabel>
                <OutlinedInput defaultValue={username} label="Username" name="username" />
              </FormControl>
            </Grid>
            <Grid md={6} xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Email address</InputLabel>
                <OutlinedInput defaultValue={email} label="Email address" name="email" />
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Stack spacing={3} sx={{ maxWidth: 'sm' }} p={3}>
          <FormControl fullWidth>
            <InputLabel>Password</InputLabel>
            <OutlinedInput label="Password" name="password" type="password" />
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Confirm password</InputLabel>
            <OutlinedInput label="Confirm password" name="confirmPassword" type="password" />
          </FormControl>
        </Stack>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button variant="contained">Save details</Button>
        </CardActions>
      </Card>
    </form>
  );
}
