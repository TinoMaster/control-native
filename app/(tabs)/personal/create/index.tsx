import { BackButtonPlusTitle } from "components/BackButtonPlusTitle";
import { ContentWrapper } from "components/ContentWrapper";
import { GradientBackground } from "components/ui/backgrounds/GradientBackground";
import { MyScrollView } from "components/ui/MyScrollView";
import { FormCreateEmployee } from "features/personal/create/FormCreateEmployee";

export default function CreateEmployee() {
  return (
    <GradientBackground>
      <BackButtonPlusTitle title="Crear Empleado" />

      <MyScrollView>
        <ContentWrapper>
          <FormCreateEmployee />
        </ContentWrapper>
      </MyScrollView>
    </GradientBackground>
  );
}
