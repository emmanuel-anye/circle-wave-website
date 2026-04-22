import PageTransition from "@/components/ui/PageTransition";
import Reveal from "@/components/ui/Reveal";
import EmployerRequestForm from "@/components/forms/EmployerRequestForm";

export default function EmployersPage() {
  return (
    <PageTransition>
      <Reveal>
        <EmployerRequestForm />
      </Reveal>
    </PageTransition>
  );
}