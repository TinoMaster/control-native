import { BackButtonPlusTitle } from "components/BackButtonPlusTitle";
import { GradientBackground } from "components/ui/backgrounds/GradientBackground";
import LoadingPage from "components/ui/loaders/LoadingPage";
import { CreateDebtForm } from "features/sales/debts/components/CreateDebtForm";
import { useDebts } from "hooks/api/useDebts";

export default function CreateDebtScreen() {
  const { loadingSave } = useDebts();

  if (loadingSave) {
    return <LoadingPage />;
  }

  return (
    <GradientBackground>
      <BackButtonPlusTitle title="Crear Deuda" />
      <CreateDebtForm />
    </GradientBackground>
  );
}
