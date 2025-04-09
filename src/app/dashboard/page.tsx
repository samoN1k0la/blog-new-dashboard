import * as React from 'react';
import type { Metadata } from 'next';
import Grid from '@mui/material/Unstable_Grid2';
import dayjs from 'dayjs';

import { config } from '@/config';
import { SummaryContainer } from '@/components/dashboard/overview/summary-component';
import { NewestUsers } from '@/components/dashboard/overview/newest-users';
import { LatestPosts } from '@/components/dashboard/overview/latest-posts';

export const metadata = { title: `Overview | Dashboard | ${config.site.name}` } satisfies Metadata;

export default function Page(): React.JSX.Element {
  return (
    <Grid container spacing={3}>
      <Grid lg={3} sm={6} xs={12}>
        <SummaryContainer
          diff="12%"
          diffMessage="vs prior week"
          trend="up"
          sx={{ height: '100%' }}
          icon="ikonica"
          title="Active Contributors"
          value="142"
        />
      </Grid>
      <Grid lg={3} sm={6} xs={12}>
        <SummaryContainer
          diff="650"
          diffMessage="words/post on average"
          trend="down"
          sx={{ height: '100%' }}
          icon="ikonica"
          title="Posts published this week"
          value="48"
        />
      </Grid>
      <Grid lg={3} sm={6} xs={12}>
        <SummaryContainer
          diff="4.8k engagements"
          diffMessage="(top post)"
          trend="up"
          sx={{ height: '100%' }}
          icon="ikonica"
          title="AEI (engagements)"
          value="23k"
        />
      </Grid>
      <Grid lg={3} sm={6} xs={12}>
        <SummaryContainer
          diff=" "
          diffMessage="(12 posts, 84 comments received)"
          trend="up"
          sx={{ height: '100%' }}
          icon="ikonica"
          title="Top contributor"
          value="@Ognjen"
        />
      </Grid>
      <Grid lg={4} md={6} xs={12}>
        <LatestPosts
          posts={[
            {
              id: '1',
              name: 'Prvi blog',
              image: '/assets/product-5.png',
              updatedAt: dayjs().subtract(18, 'minutes').subtract(1, 'hour').toDate(),
            },
            {
              id: '2',
              name: 'Drugi blog',
              image: '/assets/product-4.png',
              updatedAt: dayjs().subtract(41, 'minutes').subtract(30, 'hour').toDate(),
            },
            {
              id: '3',
              name: 'Treći blog',
              image: '/assets/product-3.png',
              updatedAt: dayjs().subtract(5, 'minutes').subtract(62, 'hour').toDate(),
            },
            {
              id: '4',
              name: 'Četvrti blog',
              image: '/assets/product-2.png',
              updatedAt: dayjs().subtract(23, 'minutes').subtract(62, 'hour').toDate(),
            },
            {
              id: '5',
              name: 'Peti blog',
              image: '/assets/product-1.png',
              updatedAt: dayjs().subtract(10, 'minutes').subtract(100, 'hour').toDate(),
            },
          ]}
          sx={{ height: '100%' }}
        />
      </Grid>
      <Grid lg={8} md={12} xs={12}>
        <NewestUsers
          users={[
            {
              id: '1',
              fullName: 'Pero Perić',
              status: 'editor',
              createdAt: dayjs().subtract(10, 'minutes').toDate(),
            },
            {
              id: '2',
              fullName: 'Marko Marković',
              status: 'admin',
              createdAt: dayjs().subtract(10, 'minutes').toDate(),
            },
            {
              id: '3',
              fullName: 'Nikola Nikolić',
              status: 'editor',
              createdAt: dayjs().subtract(10, 'minutes').toDate(),
            },
            {
              id: '4',
              fullName: 'Luka Lukić',
              status: 'editor',
              createdAt: dayjs().subtract(10, 'minutes').toDate(),
            },
            {
              id: '5',
              fullName: 'Jovan Jovanović',
              status: 'moderator',
              createdAt: dayjs().subtract(10, 'minutes').toDate(),
            },
            {
              id: '6',
              fullName: 'Mirko Mirković',
              status: 'moderator',
              createdAt: dayjs().subtract(10, 'minutes').toDate(),
            },
          ]}
          sx={{ height: '100%' }}
        />
      </Grid>
    </Grid>
  );
}
