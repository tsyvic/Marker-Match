import {
  applicationRouter,
  courseRouter,
  applicantRouter,
  contractRouter,
  userRouter,
} from './routers';
import { publicProcedure, router } from './trpc';

export const appRouter = router({
  healthcheck: publicProcedure.query(() => 'yay!'),

  application: applicationRouter,
  applicant: applicantRouter,
  contract: contractRouter,
  courses: courseRouter,
  users: userRouter,
});

export type AppRouter = typeof appRouter;
