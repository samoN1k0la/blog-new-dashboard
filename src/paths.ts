export const paths = {
  home: '/',
  auth: { signIn: '/auth/sign-in', signUp: '/auth/sign-up', resetPassword: '/auth/reset-password' },
  dashboard: {
    overview: '/dashboard',
    account: '/dashboard/account',
    users: '/dashboard/users',
    admins: '/dashboard/admins',
    editors: '/dashboard/editors',
    reviewers: '/dashboard/reviewers',
    posts: '/404',
    createPost: '/dashboard/create-post',
    heroes: '/404',
    createHero: '/404',
    myPosts: '/dashboard/my-posts',
    settings: '/dashboard/settings',
  },
  errors: { notFound: '/errors/not-found' },
} as const;
