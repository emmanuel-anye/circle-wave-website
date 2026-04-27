import { Suspense } from "react";
import PageTransition from "@/components/ui/PageTransition";
import JobApplicationForm from "@/components/forms/JobApplicationForm";

export default function CareersPage() {
  return (
    <PageTransition>
      <Suspense fallback={<div className="min-h-screen p-8">Loading application form...</div>}>
        <JobApplicationForm />
      </Suspense>
    </PageTransition>
  );
}