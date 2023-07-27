type Course = {
  wantToTutor: boolean;
  wantToMark: boolean;
  grade: string;
  explanation: string;
  previousExperience: string;
};

type PersonalDetails = {
  name: string;
  upi: string;
  AUID: string;
  email: string;
  currentSemesterDetails: string;
  currentlyOverseas: boolean | string;
  arrivalDate: Date;
  citizenOrPermanentResident: boolean | string;
  validWorkPermitOrVisa: boolean | string;
  otherContracts: boolean | string;
  otherContractsDescription: string;
  hasPreviousGTAContract: boolean;
  maxHoursPerWeek: number;
};

export type Applicant = {
  personalDetails: PersonalDetails;
  courses: Course[];
};
