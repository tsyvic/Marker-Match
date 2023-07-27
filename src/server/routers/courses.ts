import { Semester } from '@prisma/client';
import { protectedProcedure, router } from '../trpc';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';

const CreateCourseInput = z.object({
  id: z.string(),
  coordinatorId: z.string(),
  name: z.string(),
  description: z.string(),
  year: z.string(),
  startDate: z.date(),
  endDate: z.date(),
  markersNeeded: z.number().int(),
  maxNoMarkers: z.number().int(),
  markingHours: z.number().int(),
  maxNoTutors: z.number().int(),
  tutorHours: z.number().int(),
  enrolledStudents: z.number().int(),
  numberOfAssignments: z.number().int(),
  responsibilities: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  tutorsNeeded: z.number().int(),
  semester: z.enum([
    Semester.Semester1,
    Semester.Semester2,
    Semester.Summer_School,
  ]),
});

const UpdateCourseInput = z.object({
  id: z.string(),
  coordinatorId: z.string(),
  name: z.string(),
  description: z.string(),
  year: z.string(),
  startDate: z.date(),
  endDate: z.date(),
  markersNeeded: z.number().int(),
  maxNoMarkers: z.number().int(),
  markingHours: z.number().int(),
  maxNoTutor: z.number().int(),
  enrolledStudents: z.number().int(),
  numberOfAssignments: z.number().int(),
  responsibilities: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  tutorHours: z.number().int(),
  tutorsNeeded: z.number().int(),
  maxNoTutors: z.number().int(),
  semester: z.enum([
    Semester.Semester1,
    Semester.Semester2,
    Semester.Summer_School,
  ]),
});

function getCurrentSemester() {
  const currentDate = new Date();

  const currentYear = currentDate.getFullYear();

  // Define semester dates
  const summerSchoolStart = new Date(currentYear, 0, 5); // months are 0-indexed in JS
  const summerSchoolEnd = new Date(currentYear, 1, 15);

  const semesterOneStart = new Date(currentYear, 1, 27);
  const semesterOneEnd = new Date(currentYear, 5, 26);

  const semesterTwoStart = new Date(currentYear, 6, 17);
  const semesterTwoEnd = new Date(currentYear, 10, 13);

  // Determine the current semester
  if (currentDate >= summerSchoolStart && currentDate <= summerSchoolEnd) {
    return 'Summer School';
  } else if (currentDate >= semesterOneStart && currentDate <= semesterOneEnd) {
    return 'Semester One';
  } else if (currentDate >= semesterTwoStart && currentDate <= semesterTwoEnd) {
    return 'Semester Two';
  } else {
    return 'No active semester';
  }
}

export function getUpcomingSemester() {
  const currentSemester = getCurrentSemester();

  switch (currentSemester) {
    case 'Summer School':
      return Semester.Semester1;
    case 'Semester One':
      return Semester.Semester2;
    case 'Semester Two':
      return Semester.Summer_School;
    default:
      return Semester.Semester1;
  }
}

export const courseRouter = router({
  getAllCourses: protectedProcedure.query(async ({ ctx: { prisma } }) => {
    const courses = await prisma.course.findMany({
      orderBy: {
        name: 'desc',
      },
    });
    return courses;
  }),

  getCurrentCourses: protectedProcedure.query(async ({ ctx }) => {
    const currentDate = new Date();
    const upcomingSemester = getUpcomingSemester();
    const currentYear = currentDate.getFullYear();

    const courses = await ctx.prisma.course.findMany({
      orderBy: {
        name: 'desc',
      },
      where: {
        AND: [
          {
            startDate: {
              gte: currentDate,
            },
          },
          {
            semester: upcomingSemester,
          },
          {
            year: String(currentYear),
          },
        ],
      },
    });

    return courses;
  }),
  searchCourses: protectedProcedure
    .input(z.string())
    .query(async ({ ctx: { prisma }, input }) => {
      const currentDate = new Date();
      const upcomingSemester = getUpcomingSemester();
      const currentYear = currentDate.getFullYear();

      const courses = await prisma.course.findMany({
        orderBy: {
          name: 'desc',
        },
        where: {
          name: {
            contains: input,
            mode: 'insensitive',
          },
          AND: [
            {
              startDate: {
                gte: currentDate,
              },
            },
            {
              semester: upcomingSemester,
            },
            {
              year: String(currentYear),
            },
          ],
        },
      });
      return courses;
    }),

  createCourse: protectedProcedure
    .input(CreateCourseInput)
    .mutation(async ({ ctx: { prisma }, input }) => {
      const course = await prisma.course.create({
        data: input,
      });
      return course;
    }),

  getCourse: protectedProcedure
    .input(z.array(z.string()))
    .query(async ({ ctx: { prisma }, input }) => {
      const courses = await prisma.course.findMany({
        where: {
          id: {
            in: input,
          },
        },
        orderBy: {
          name: 'desc',
        },
      });
      if (courses.length === 0) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No course found for the provided ids`,
        });
      }
      return courses;
    }),

  updateCourse: protectedProcedure
    .input(UpdateCourseInput)
    .mutation(async ({ ctx: { prisma }, input }) => {
      const course = await prisma.course.update({
        where: { id: input.id },
        data: input,
      });
      return course;
    }),

  deleteCourse: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx: { prisma }, input }) => {
      await prisma.course.delete({ where: { id: input } });
      return true;
    }),
});
