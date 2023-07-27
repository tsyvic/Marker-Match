import { protectedProcedure, router } from '../trpc';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { ResidencyStatus } from './util';

// Define your input validation schemas here, for example:
const CreateApplicantInput = z.object({
  userId: z.string(),
  upi: z.string(),
  auid: z.string(),
  overseas: z.boolean(),
  overseasReturnDate: z.date().optional(),
  residencyStatus: ResidencyStatus,
  altContact: z.string().optional(),
  maxHours: z.number().int(),
  cv: z.string().optional(),
  unofficialTranscript: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
const UpdateApplicantInput = z.object({
  id: z.string(),
  userId: z.string(),
  overseas: z.boolean(),
  overseasReturnDate: z.date().optional(),
  residencyStatus: ResidencyStatus,
  altContact: z.string().optional(),
  maxHours: z.number().int(),
  cv: z.string().optional(),
  unofficialTranscript: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const applicantRouter = router({
  getOrCreateApplicant: protectedProcedure
    .input(CreateApplicantInput)
    .mutation(async ({ ctx, input }) => {
      const applicant = await ctx.prisma.applicant.upsert({
        where: { userId: input.userId },
        update: {
          overseas: input.overseas,
          overseasReturnDate: input.overseasReturnDate,
          residencyStatus: input.residencyStatus,
          altContact: input.altContact,
          maxHours: input.maxHours,
          cv: input.cv,
          unofficialTranscript: input.unofficialTranscript,
          updatedAt: new Date(),
        },
        create: {
          userId: input.userId,
          overseas: input.overseas,
          overseasReturnDate: input.overseasReturnDate,
          residencyStatus: input.residencyStatus,
          altContact: input.altContact,
          maxHours: input.maxHours,
          cv: input.cv,
          unofficialTranscript: input.unofficialTranscript,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });

      console.log({ applicant });
      return applicant;
    }),
  getAllApplicants: protectedProcedure.query(async ({ ctx }) => {
    const applicants = await ctx.prisma.applicant.findMany();
    return applicants;
  }),

  createApplicant: protectedProcedure
    .input(CreateApplicantInput)
    .mutation(async ({ ctx, input }) => {
      const applicant = await ctx.prisma.applicant.create({
        data: input,
      });
      return applicant;
    }),

  getApplicant: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      const applicant = await ctx.prisma.applicant.findUnique({
        where: { id: input },
      });
      if (!applicant) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No applicant with id '${input}'`,
        });
      }
      return applicant;
    }),

  getApplicantByUserId: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      const applicant = await ctx.prisma.applicant.findUnique({
        where: { userId: input },
      });
      return applicant;
    }),

  updateApplicant: protectedProcedure
    .input(UpdateApplicantInput)
    .mutation(async ({ ctx, input }) => {
      const applicant = await ctx.prisma.applicant.update({
        where: { id: input.id },
        data: input,
      });
      return applicant;
    }),

  deleteApplicant: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.applicant.delete({ where: { id: input } });
      return true;
    }),
});
