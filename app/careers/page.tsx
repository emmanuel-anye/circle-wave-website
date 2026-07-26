import PageTransition from "@/components/ui/PageTransition";
import JobApplicationForm from "@/components/forms/JobApplicationForm";
import { z } from "zod";
import { getPublicJobById } from "@/lib/admin-data";
import type { JobPosting } from "@/lib/jobs";

type CareersPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function CareersPage({
  searchParams,
}: CareersPageProps) {
  const rawJobId = (await searchParams).jobId;
  const jobId = (Array.isArray(rawJobId) ? rawJobId[0] : rawJobId)?.trim() ?? "";
  const job = z.uuid().safeParse(jobId).success
    ? ((await getPublicJobById(jobId)) as JobPosting | null)
    : null;

  return (
    <PageTransition>
      <JobApplicationForm
        jobId={job?.id ?? ""}
        jobTitle={job?.title?.trim() ?? ""}
      />
    </PageTransition>
  );
}
