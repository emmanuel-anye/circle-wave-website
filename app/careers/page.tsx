import PageTransition from "@/components/ui/PageTransition";
import Reveal from "@/components/ui/Reveal";
import JobApplicationForm from "@/components/forms/JobApplicationForm";

export default function CareersPage() {
  return (
    <PageTransition>
      <Reveal>
        <JobApplicationForm />
      </Reveal>
    </PageTransition>
  );
}