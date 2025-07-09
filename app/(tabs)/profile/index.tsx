import { CloseSessionButton } from "components/CloseSessionButton";
import { ContentWrapper } from "components/ContentWrapper";
import { GradientBackground } from "components/ui/backgrounds/GradientBackground";
import { CustomHeader } from "components/ui/CustomHeader";
import { MyScrollView } from "components/ui/MyScrollView";
import { ChangePasswordLinkButton } from "features/profile/profile_info/components/ChangePasswordLinkButton";
import { ProfileInfoLinkButton } from "features/profile/profile_info/components/ProfileInfoLinkButton";
import { View } from "react-native";

export default function ProfileScreen() {
  return (
    <GradientBackground>
      <CustomHeader title="Perfil" />

      <MyScrollView>
        <ContentWrapper>
          <View className="p-2 gap-8">
            <ProfileInfoLinkButton />
            <ChangePasswordLinkButton />
            <CloseSessionButton />
          </View>
        </ContentWrapper>
      </MyScrollView>
    </GradientBackground>
  );
}
