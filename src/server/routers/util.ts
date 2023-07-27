import { z } from 'zod';

export const Role = z.enum([
  'Student',
  'Admin',
  'MarkerCoordinator',
  'TutorCoordinator',
  'CourseCoordinator',
]);
export const Grade = z.enum([
  'B_Minus',
  'B',
  'B_Plus',
  'A_Minus',
  'A',
  'A_Plus',
]);
export const ResidencyStatus = z.enum(['Resident', 'Non_Resident']);
export const ApplicationRole = z.enum(['Tutor', 'Marker']);
export const ApplicationStatus = z.enum(['Accepted', 'Rejected', 'Pending']);
