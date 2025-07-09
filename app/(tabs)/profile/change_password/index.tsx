import { ContentWrapper } from "components/ContentWrapper";
import { GradientBackground } from "components/ui/backgrounds/GradientBackground";
import { CustomHeader } from "components/ui/CustomHeader";
import { Text, View } from "react-native";

const ChangePasswordScreen = () => {
  return (
    <GradientBackground>
      <CustomHeader title="Cambiar contraseña" showBackButton />
      <ContentWrapper>
        <View className="p-2 gap-8">
          <Text>ChangePasswordScreen</Text>
        </View>
      </ContentWrapper>
    </GradientBackground>
  );
};

export default ChangePasswordScreen;
