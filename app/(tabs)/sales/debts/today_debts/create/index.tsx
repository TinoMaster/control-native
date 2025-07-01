import { GradientBackground } from "components/ui/backgrounds/GradientBackground";
import { CustomHeader } from "components/ui/CustomHeader";
import LoadingPage from "components/ui/loaders/LoadingPage";
import { CreateDebtForm } from "features/sales/debts/components/CreateDebtForm";
import { useDebts } from "hooks/api/useDebts";

export default function CreateDebt() {
  const { loadingSave } = useDebts();

  if (loadingSave) {
    return <LoadingPage />;
  }
  return (
    <GradientBackground>
      <CustomHeader title="Crear Deuda" showBackButton />
      <CreateDebtForm />
    </GradientBackground>
  );
}
