import { ContentWrapper } from "components/ContentWrapper";
import { GradientBackground } from "components/ui/backgrounds/GradientBackground";
import { CustomHeader } from "components/ui/CustomHeader";
import { MyScrollView } from "components/ui/MyScrollView";
import { useRouter } from "expo-router";
import { BusinessCard } from "features/business/myBusinesses/BusinessCard";
import { BusinessesResume } from "features/business/myBusinesses/BusinessesResume";
import useColors from "hooks/useColors";
import { Text } from "react-native";
import { useBusinessStore } from "store/business.store";

export default function MyBusinesses() {
  const defaultColors = useColors();
  const { businessList } = useBusinessStore();
  const router = useRouter();
  return (
    <GradientBackground>
      <CustomHeader title="Gestión de Negocios" showBackButton />
      <MyScrollView>
        <ContentWrapper>
          <Text className="mb-4" style={{ color: defaultColors.textSecondary }}>
            Administra tus negocios. Puedes crear, editar y gestionar todos los negocios desde esta sección.
          </Text>

          {/* Lista de negocios */}
          {businessList.map((business) => (
            <BusinessCard
              key={business.id}
              business={business}
              onPress={() => router.push(`/business/my_businesses/${business.id}`)}
            />
          ))}

          {/* Resumen de los negocios */}
          <BusinessesResume />
        </ContentWrapper>
      </MyScrollView>
    </GradientBackground>
  );
}
