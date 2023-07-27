export interface ICourses {
  id: string;
  coordinatorId: string;
  name: string;
  description: string;
  year: string;
  semester: string;
  startDate: Date;
  endDate: string;
  markersNeeded: number;
  maxNoMarkers: number;
  markingHours: number;
  enrolledStudents: number;
  numberOfAssignments: number;
  responsibilities: string;
  createdAt: string;
  updatedAt: string;
  maxNoTutors: number;
  tutorHours: number;
  tutorsNeeded: number;
}
