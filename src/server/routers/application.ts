import { protectedProcedure, router } from '../trpc';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { prisma } from '../prisma';
import { ApplicationRole, ApplicationStatus, Grade } from './util';
import { Semester } from '@prisma/client';
import { getUpcomingSemester } from './courses';

const ApplicationInput = z.object({
  applicantId: z.string(),
  courseId: z.string(),
  status: ApplicationStatus,
  relevantExperience: z.string(),
  previousCourseGrade: Grade,
  createdAt: z.date(),
  updatedAt: z.date(),
  desiredRole: ApplicationRole,
});

const UpdateApplicationInput = z.object({
  id: z.string(),
  applicantId: z.string(),
  courseId: z.string(),
  status: ApplicationStatus,
  relevantExperience: z.string(),
  previousCourseGrade: Grade,
  createdAt: z.date(),
  updatedAt: z.date(),
  desiredRole: ApplicationRole,
});

const ApplicationData = z.object({
  courseId: z.string(),
  status: ApplicationStatus,
  relevantExperience: z.string(),
  previousCourseGrade: Grade,
  createdAt: z.date(),
  updatedAt: z.date(),
  desiredRole: ApplicationRole,
  year: z.string(),
  semester: z.enum([
    Semester.Semester1,
    Semester.Semester2,
    Semester.Summer_School,
  ]),
});

const CreateBulkApplicationsInput = z.object({
  applicantId: z.string(),
  applications: z.array(ApplicationData),
});

export const applicationRouter = router({
  getAllApplications: protectedProcedure.query(async () => {
    const applications = await prisma.application.findMany();
    return applications;
  }),

  createApplication: protectedProcedure
    .input(ApplicationInput)
    .mutation(async ({ input }) => {
      const application = await prisma.application.create({
        data: input,
      });
      return application;
    }),

  createBulkApplications: protectedProcedure
    .input(CreateBulkApplicationsInput)
    .mutation(async ({ input }) => {
      const { applications, ...otherData } = input;

      const createdApplications = [];
      for (const application of applications) {
        const existingApplication = await prisma.application.findUnique({
          where: {
            courseId_year_semester: {
              courseId: application.courseId,
              year: application.year,
              semester: application.semester,
            },
          },
        });

        if (existingApplication) {
          const updatedApplication = await prisma.application.update({
            where: { id: existingApplication.id },
            data: {
              ...application,
              ...otherData,
            },
          });
          createdApplications.push(updatedApplication);
        } else {
          const newApplication = await prisma.application.create({
            data: {
              ...application,
              ...otherData,
            },
          });
          createdApplications.push(newApplication);
        }
      }

      return createdApplications;
    }),

  getCurrentAppliedStudents: protectedProcedure.query(async () => {
    const upcomingSemester = getUpcomingSemester();
    const currentYear = new Date().getFullYear();

    const appliedStudents = await prisma.application.findMany({
      where: {
        AND: [
          {
            semester: upcomingSemester,
          },
          {
            year: String(currentYear),
          },
        ],
      },
      include: {
        Applicant: {
          include: {
            user: true,
          },
        },
        courses: {
          include: {
            course: true,
          },
        },
      },
    });

    return appliedStudents;
  }),

  getApplication: protectedProcedure
    .input(z.string())
    .query(async ({ input }) => {
      const application = await prisma.application.findUnique({
        where: { id: input },
      });
      if (!application) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No application with id '${input}'`,
        });
      }
      return application;
    }),

  getApplicationsByApplicantId: protectedProcedure
    .input(z.string())
    .query(async ({ ctx: { prisma }, input }) => {
      const applications = await prisma.application.findMany({
        where: {
          applicantId: input,
        },
      });
      return applications;
    }),

  updateApplication: protectedProcedure
    .input(UpdateApplicationInput)
    .mutation(async ({ input }) => {
      const application = await prisma.application.update({
        where: { id: input.id },
        data: input,
      });
      return application;
    }),

  deleteApplication: protectedProcedure
    .input(z.string())
    .mutation(async ({ input }) => {
      await prisma.application.delete({ where: { id: input } });
      return true;
    }),
});
