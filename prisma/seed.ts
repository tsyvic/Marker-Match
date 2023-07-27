import {
  PrismaClient,
  Role,
  ResidencyStatus,
  User,
  Course,
  Semester,
  Grade,
} from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function createFakeData() {
  // Generate fake data for the user table
  const users: User[] = [];

  const allGrades = [
    Grade.B_Minus,
    Grade.B,
    Grade.B_Plus,
    Grade.A_Minus,
    Grade.A,
    Grade.A_Plus,
  ];

  for (let i = 0; i < 150; i++) {
    const email = faker.internet.email();
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const role = faker.helpers.arrayElement([
      Role.Student,
      Role.Admin,
      Role.CourseCoordinator,
      Role.MarkerCoordinator,
      Role.TutorCoordinator,
    ]);
    const createdAt = faker.date.past();
    const updatedAt = faker.date.recent();

    const newUser = await prisma.user.create({
      data: {
        email,
        name: `${firstName} ${lastName}`,
        role,
        createdAt: createdAt,
        updatedAt: updatedAt,
      },
    });

    await prisma.account.create({
      data: {
        userId: newUser.id,
        access_token: faker.string.uuid(),
        provider: 'google',
        providerAccountId: faker.string.alpha(10),
        type: 'oauth',
      },
    });

    await prisma.session.create({
      data: {
        userId: newUser.id,
        expires: faker.date.future(),
        sessionToken: faker.string.uuid(),
      },
    });

    users.push(newUser);
  }
  console.error('Finished creating users');

  // Generate fake data for the applicant table
  for (const user of users) {
    const existingApplicant = await prisma.applicant.findUnique({
      where: { userId: user.id },
    });

    if (!existingApplicant) {
      const overseas = faker.datatype.boolean();
      const overseasReturnDate = overseas
        ? faker.date.future().toISOString()
        : null;
      const residencyStatus = faker.helpers.arrayElement([
        ResidencyStatus.Resident,
        ResidencyStatus.Non_Resident,
      ]);
      const altContact = faker.phone.number();
      const maxHours = faker.number.int(40);
      const cv = faker.lorem.paragraph();
      const unofficialTranscript = faker.lorem.paragraph();
      const createdAt = faker.date.past();
      const updatedAt = faker.date.recent();

      await prisma.applicant.create({
        data: {
          user: { connect: { id: user.id } },
          overseas,
          overseasReturnDate: overseasReturnDate,
          residencyStatus: residencyStatus,
          altContact: altContact,
          maxHours: maxHours,
          cv,
          unofficialTranscript: unofficialTranscript,
          createdAt: createdAt,
          updatedAt: updatedAt,
        },
      });
    }
  }
  console.error('Finished creating applicants');

  // Generate seed data for admins
  const adminUsers = users.slice(0, 10); // First 10 users are admins
  for (const user of adminUsers) {
    await prisma.admin.create({
      data: {
        user: { connect: { id: user.id } },
      },
    });
  }

  // Generate seed data for course coordinators
  const coordinatorUsers = users.slice(10, 20); // Next 10 users are course coordinators
  for (const user of coordinatorUsers) {
    await prisma.courseCoordinator.create({
      data: {
        user: { connect: { id: user.id } },
      },
    });
  }

  // Generate seed data for tutors
  const tutorUsers = users.slice(20, 30); // Next 10 users are tutors
  for (const user of tutorUsers) {
    await prisma.tutor.create({
      data: {
        user: { connect: { id: user.id } },
      },
    });
  }
  // Generate seed data for markers
  const markerUsers = users.slice(30, 40); // Next 10 users are markers
  for (const user of markerUsers) {
    await prisma.marker.create({
      data: {
        user: { connect: { id: user.id } },
      },
    });
  }

  // Generate fake data for the course table
  const courses: Course[] = [];

  for (let i = 0; i < 10; i++) {
    const coordinator = await prisma.courseCoordinator.findFirst();
    const name = [
      'COMPSCI 339',
      'COMPSCI 340',
      'COMPSCI 341',
      'COMPSCI 342',
      'COMPSCI 220',
      'COMPSCI 225',
      'COMPSCI 230',
      'COMPSCI 235',
      'COMPSCI 101',
      'COMPSCI 130',
    ][i];
    const description = faker.lorem.sentence();
    let year = '2023';
    const startDate = faker.date.future().toISOString();
    const endDate = faker.date.future({ years: 2 }).toISOString();
    const markersNeeded = faker.number.int(5);
    const maxNoMarkers = faker.number.int(10);
    const markingHours = faker.number.int(20);
    const maxNoTutors = faker.number.int(10);
    const tutorsNeeded = faker.number.int(5);
    const tutorHours = faker.number.int(20);
    const enrolledStudents = faker.number.int(50);
    const numberOfAssignments = faker.number.int(5);
    const responsibilities = faker.lorem.paragraph();
    const createdAt = faker.date.past();
    const updatedAt = faker.date.recent();

    if (coordinator) {
      const semester = faker.helpers.arrayElement([
        Semester.Semester1,
        Semester.Semester2,
        Semester.Summer_School,
      ]);

      // Find course with same name, year and semester
      let existingCourse = await prisma.course.findUnique({
        where: {
          name_year_semester: {
            name: name,
            year: year,
            semester: semester,
          },
        },
      });

      // Continue trying to update the year until the course does not exist
      while (existingCourse) {
        year = (parseInt(year) + 1).toString();
        existingCourse = await prisma.course.findUnique({
          where: {
            name_year_semester: {
              name: name,
              year: year,
              semester: semester,
            },
          },
        });
      }

      const newCourse = await prisma.course.create({
        data: {
          Coordinator: {
            connect: { userId: coordinator.userId },
          },
          name,
          description,
          year,
          semester: semester,
          startDate: startDate,
          endDate: endDate,
          markersNeeded: markersNeeded,
          maxNoMarkers: maxNoMarkers,
          markingHours: markingHours,
          maxNoTutors: maxNoTutors,
          tutorsNeeded: tutorsNeeded,
          tutorHours: tutorHours,
          enrolledStudents: enrolledStudents,
          numberOfAssignments: numberOfAssignments,
          responsibilities,
          createdAt: createdAt,
          updatedAt: updatedAt,
          minGrade: faker.helpers.arrayElement(allGrades),
        },
      });
      courses.push(newCourse);
    }
  }

  console.error('Finished creating courses');

  // Generate fake data for the contract and user_contract tables

  for (const user of users) {
    const contract = await prisma.contract.create({
      data: {},
    });

    await prisma.userContract.create({
      data: {
        user: { connect: { id: user.id } },
        contract: { connect: { id: contract.id } },
      },
    });
  }
  console.error('Finished creating contracts');

  // Generate seed data for applications
  for (const user of users) {
    const applicant = await prisma.applicant.findUnique({
      where: { userId: user.id },
    });

    const course = faker.helpers.arrayElement(courses);
    if (!applicant) {
      console.error(`No applicant found for user with ID ${user.id}`);
    } else {
      // Set initial year
      let year = '2023';

      // Define the semester
      const semester = faker.helpers.arrayElement([
        Semester.Semester1,
        Semester.Semester2,
        Semester.Summer_School,
      ]);

      // Check if application already exists
      let existingApplication = await prisma.application.findUnique({
        where: {
          courseId_year_semester: {
            courseId: course.id,
            year: year,
            semester: semester,
          },
        },
      });

      // Continue trying to update the year until the application does not exist
      while (existingApplication) {
        year = (parseInt(year) + 1).toString();
        existingApplication = await prisma.application.findUnique({
          where: {
            courseId_year_semester: {
              courseId: course.id,
              year: year,
              semester: semester,
            },
          },
        });
      }

      // Now you can use the unique year and create the application
      const application = await prisma.application.create({
        data: {
          Applicant: { connect: { id: applicant.id } },
          status: faker.helpers.arrayElement([
            'Accepted',
            'Rejected',
            'Pending',
          ]),
          relevantExperience: faker.lorem.sentences(3),
          previousCourseGrade: faker.helpers.arrayElement(allGrades),
          desiredRole: faker.helpers.arrayElement([
            'Tutor',
            'Marker',
            'CourseCoordinator',
          ]),
          courseId: course.id,
          year: year,
          semester: semester,
        },
      });

      await prisma.userCourse.create({
        data: {
          userId: user.id,
          courseId: course.id,
        },
      });

      await prisma.userApplication.create({
        data: {
          userId: user.id,
          applicationId: application.id,
        },
      });

      await prisma.applicationCourse.create({
        data: {
          courseId: course.id,
          applicationId: application.id,
        },
      });
    }
  }

  console.log('Fake data created successfully.');
}

createFakeData()
  .catch((error) => {
    console.error('Error creating fake data:', error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
