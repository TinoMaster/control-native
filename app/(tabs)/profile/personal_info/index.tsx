import { ContentWrapper } from "components/ContentWrapper";
import { GradientBackground } from "components/ui/backgrounds/GradientBackground";
import { CustomHeader } from "components/ui/CustomHeader";
import { MyScrollView } from "components/ui/MyScrollView";
import { UserAddressInfo } from "features/profile/profile_info/components/Personal_info/UserAddressInfo";
import { UserBusinesses } from "features/profile/profile_info/components/Personal_info/UserBusinesses";
import { UserContactInfo } from "features/profile/profile_info/components/Personal_info/UserContactInfo";
import { UserPrincipalInfo } from "features/profile/profile_info/components/Personal_info/UserPrincipalInfo";
import { UserSalaryInfo } from "features/profile/profile_info/components/Personal_info/UserSalaryInfo";
import { useAuthStore } from "store/auth.store";

// --- Main Exported Component ---
export default function PersonalInfoScreen() {
  const { employee } = useAuthStore();

  return (
    <GradientBackground>
      <CustomHeader title="Información Personal" showBackButton />
      <MyScrollView>
        <ContentWrapper>
          {!!employee && <UserPrincipalInfo employee={employee} />}
          {!!employee && <UserContactInfo phone={employee.phone} email={employee.user.email} />}
          {!!employee?.address && <UserAddressInfo address={employee.address} />}
          {!!(employee?.percentSalary !== undefined || employee?.fixedSalary !== undefined) && (
            <UserSalaryInfo
              percentSalary={employee.percentSalary}
              fixedSalary={employee.fixedSalary}
            />
          )}
          {!!employee && <UserBusinesses employee={employee} />}
        </ContentWrapper>
      </MyScrollView>
    </GradientBackground>
  );
}
