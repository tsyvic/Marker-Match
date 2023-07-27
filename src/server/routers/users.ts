import { protectedProcedure, router } from '../trpc';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { Role } from './util';

// Define your input validation schemas here, for example:
const CreateUserInput = z.object({
  id: z.string(),
  email: z.string().email(),
  password: z.string(),
  access_token: z.string(),
  refresh_token: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  role: Role,
  created_at: z.date(),
  updated_at: z.date(),
});

const UpdateUserInput = z.object({
  id: z.string(),
  email: z.string().email(),
  password: z.string(),
  access_token: z.string(),
  refresh_token: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  role: Role,
  created_at: z.date(),
  updated_at: z.date(),
});

export const userRouter = router({
  getAllUsers: protectedProcedure.query(async ({ ctx }) => {
    const users = await ctx.prisma.user.findMany({
      include: {
        accounts: true,
        sessions: true,
        applications: true,
        contracts: true,
        courses: true,
        applicants: true,
        admins: true,
        courseCoordinators: true,
        tutors: true,
        markers: true,
      },
    });
    return users;
  }),

  getAllStudentUsers: protectedProcedure.query(async ({ ctx }) => {
    const users = await ctx.prisma.user.findMany({
      where: {
        role: 'Student',
      },
      include: {
        accounts: true,
        sessions: true,
        applications: true,
        contracts: true,
        courses: true,
        applicants: true,
        admins: true,
        courseCoordinators: true,
        tutors: true,
        markers: true,
      },
    });
    return users;
  }),

  createUser: protectedProcedure
    .input(CreateUserInput)
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.create({
        data: input,
      });
      return user;
    }),

  getUserById: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findUnique({
        where: { id: input },
      });
      if (!user) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No user with id '${input}'`,
        });
      }
      return user;
    }),

  updateUser: protectedProcedure
    .input(UpdateUserInput)
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.update({
        where: { id: input.id },
        data: input,
      });
      return user;
    }),

  deleteUser: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.user.delete({ where: { id: input } });
      return true;
    }),
});
