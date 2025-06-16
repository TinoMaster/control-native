import { ContentWrapper } from "components/ContentWrapper";
import { GradientBackground } from "components/ui/backgrounds/GradientBackground";
import { CustomHeader } from "components/ui/CustomHeader";
import { MyScrollView } from "components/ui/MyScrollView";
import { Text } from "react-native";

// TODO: Implementar la pantalla de información personal
export default function PersonalInfoScreen() {
  return (
    <GradientBackground>
      <CustomHeader title="Información Personal" showBackButton />

      <MyScrollView>
        <ContentWrapper>
          <Text>Información Personal</Text>
        </ContentWrapper>
      </MyScrollView>
    </GradientBackground>
  );
}
