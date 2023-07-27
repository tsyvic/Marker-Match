import { useSession } from 'next-auth/react';
import { trpc } from '@/utils/trpc';
import { Applicant, Application } from '@prisma/client';

interface UseApplicantApplicationsResult {
  loading: boolean;
  applicantApplications?: Application[];
  applicant?: Applicant;
}

export const useApplicantApplications = (): UseApplicantApplicationsResult => {
  const { data } = useSession();
  const userId = data?.user?.id as string;

  const { data: applicant, isLoading: isLoadingApplicant } =
    trpc.applicant.getApplicantByUserId.useQuery(userId, {
      enabled: !!userId,
    });

  const applicantId = applicant?.id as string;

  const { data: applicantApplications, isLoading: isLoadingApplications } =
    trpc.application.getApplicationsByApplicantId.useQuery(applicantId, {
      enabled: !!applicantId,
    });

  if (
    isLoadingApplicant ||
    isLoadingApplications ||
    !userId ||
    !applicantId ||
    !applicant
  ) {
    return { loading: true, applicant: {} as Applicant };
  }

  return { loading: false, applicantApplications, applicant };
};
