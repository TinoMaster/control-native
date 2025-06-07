import { BackButtonPlusTitle } from "components/BackButtonPlusTitle";
import { PageWrapper } from "components/PageWrapper";
import LoadingPage from "components/ui/loaders/LoadingPage";
import { CreateDebtForm } from "features/sales/debts/components/CreateDebtForm";
import { useDebts } from "hooks/api/useDebts";

export default function CreateDebtScreen() {
  const { loadingSave } = useDebts();

  if (loadingSave) {
    return <LoadingPage />;
  }

  return (
    <PageWrapper>
      <BackButtonPlusTitle title="Crear Deuda" />
      <CreateDebtForm />
    </PageWrapper>
  );
}
