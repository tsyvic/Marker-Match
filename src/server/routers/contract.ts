import { protectedProcedure, router } from '../trpc';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { prisma } from '../prisma';

const UserContract = z.object({
  userId: z.string(),
  contractId: z.string(),
});

const CreateUserContractInput = z.object({
  userId: z.string(),
  contractId: z.string(),
});

export const contractRouter = router({
  getAllUserContracts: protectedProcedure.query(async () => {
    const userContracts = await prisma.userContract.findMany();
    return userContracts;
  }),

  getUserContract: protectedProcedure
    .input(UserContract)
    .query(async ({ input }) => {
      const userContract = await prisma.userContract.findUnique({
        where: {
          userId_contractId: {
            userId: input.userId,
            contractId: input.contractId,
          },
        },
        include: {
          contract: true,
        },
      });
      if (!userContract) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No user contract found for userId '${input.userId}' and contractId '${input.contractId}'`,
        });
      }
      return userContract;
    }),

  getUserContractsByUserId: protectedProcedure
    .input(z.string())
    .query(async ({ input }) => {
      const userContracts = await prisma.userContract.findMany({
        where: {
          userId: input,
        },
        include: {
          contract: true,
        },
      });
      return userContracts;
    }),

  createUserContract: protectedProcedure
    .input(CreateUserContractInput)
    .mutation(async ({ input }) => {
      const userContract = await prisma.userContract.create({
        data: input,
      });
      return userContract;
    }),

  updateUserContract: protectedProcedure
    .input(UserContract)
    .mutation(async ({ input }) => {
      const userContract = await prisma.userContract.update({
        where: {
          userId_contractId: {
            userId: input.userId,
            contractId: input.contractId,
          },
        },
        data: input,
      });
      return userContract;
    }),

  deleteUserContract: protectedProcedure
    .input(UserContract)
    .mutation(async ({ input }) => {
      await prisma.userContract.delete({
        where: {
          userId_contractId: {
            userId: input.userId,
            contractId: input.contractId,
          },
        },
      });
      return true;
    }),
});
