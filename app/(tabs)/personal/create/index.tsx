import { ContentWrapper } from "components/ContentWrapper";
import { GradientBackground } from "components/ui/backgrounds/GradientBackground";
import { CustomHeader } from "components/ui/CustomHeader";
import { MyScrollView } from "components/ui/MyScrollView";
import { FormCreateEmployee } from "features/personal/create/FormCreateEmployee";

export default function CreateEmployee() {
  return (
    <GradientBackground>
      <CustomHeader title="Crear Empleado" showBackButton />

      <MyScrollView>
        <ContentWrapper>
          <FormCreateEmployee />
        </ContentWrapper>
      </MyScrollView>
    </GradientBackground>
  );
}
