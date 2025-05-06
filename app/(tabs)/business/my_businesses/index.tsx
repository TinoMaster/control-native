import { BackButtonPlusTitle } from "components/BackButtonPlusTitle";
import { useRouter } from "expo-router";
import { BusinessCard } from "features/business/myBusinesses/BusinessCard";
import { BusinessesResume } from "features/business/myBusinesses/BusinessesResume";
import useColors from "hooks/useColors";
import { ScrollView, Text, View } from "react-native";
import { useBusinessStore } from "store/business.store";

export default function MyBusinesses() {
  const defaultColors = useColors();
  const { businessList } = useBusinessStore();
  const router = useRouter();
  return (
    <ScrollView
      className="flex-1"
      style={{
        backgroundColor: defaultColors.background
      }}
    >
      <BackButtonPlusTitle title="Gestión de Negocios" />
      <View className="px-4">
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
      </View>
    </ScrollView>
  );
}
