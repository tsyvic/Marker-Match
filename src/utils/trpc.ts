import { httpBatchLink } from '@trpc/client';
import { createTRPCNext } from '@trpc/next';
import superjson from 'superjson';

import type { AppRouter } from '@/server/endpoints';

function getBaseUrl() {
  if (typeof window !== 'undefined') {
    return '';
  } else if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  } else {
    return `http://localhost:${process.env.PORT ?? 3000}`;
  }
}

// type RouterOutputs = inferRouterOutputs<AppRouter>;

// export type CoursesResponse = RouterOutputs['getAllCourses'];

export const trpc = createTRPCNext<AppRouter>({
  config(opts) {
    return {
      transformer: superjson,
      links: [
        httpBatchLink({
          url: `${getBaseUrl()}/api/trpc`,
        }),
      ],
    };
  },
  ssr: false,
});
