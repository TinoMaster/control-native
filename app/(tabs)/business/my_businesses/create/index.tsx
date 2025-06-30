import { zodResolver } from "@hookform/resolvers/zod";
import { ContentWrapper } from "components/ContentWrapper";
import { GradientBackground } from "components/ui/backgrounds/GradientBackground";
import { CustomHeader } from "components/ui/CustomHeader";
import { MyScrollView } from "components/ui/MyScrollView";
import { useNotification } from "contexts/NotificationContext";
import { useRouter } from "expo-router";
import { BusinessAddress } from "features-auth/business/components/BusinessAddress";
import { BusinessInfo } from "features-auth/business/components/BusinessInfo";
import useColors from "hooks/useColors";
import { BusinessModel } from "models/api";
import {
  RegisterBusinessDataModel,
  registerBusinessSchema,
  zBusinessDefaultValues
} from "models/zod/business.schema";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { businessService } from "services/business.service";
import { useAuthStore } from "store/auth.store";
import { useBusinessStore } from "store/business.store";

export default function CreateBusiness() {
  const [isLoading, setIsLoading] = useState(false);

  const defaultColors = useColors();
  const router = useRouter();

  const { showNotification } = useNotification();
  const addBusinessToBusinessList = useBusinessStore((state) => state.addBusinessToBusinessList);
  const { user } = useAuthStore();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<RegisterBusinessDataModel>({
    resolver: zodResolver(registerBusinessSchema),
    defaultValues: zBusinessDefaultValues
  });

  const onSubmit = async (data: RegisterBusinessDataModel) => {
    setIsLoading(true);
    const businessToSave: BusinessModel = {
      name: data.businessName,
      description: data.businessDescription,
      address: {
        street: data.addressStreet,
        number: data.addressNumber,
        municipality: data.addressMunicipality,
        city: data.addressCity,
        zip: data.addressZipCode
      },
      phone: data.businessPhone,
      owner: user?.id
    };

    const response = await businessService.saveBusiness(businessToSave);

    if (response.status === 200) {
      showNotification("Negocio registrado exitosamente", "success");
      addBusinessToBusinessList(response.data as BusinessModel);
      reset();
      router.replace("/(tabs)/business/my_businesses");
    } else {
      showNotification("Error al registrar el negocio", "error");
    }
    setIsLoading(false);
  };

  return (
    <GradientBackground>
      <CustomHeader title="Nuevo Negocio" showBackButton />

      <MyScrollView>
        <ContentWrapper>
          <View>
            <Text className="text-2xl font-bold text-center" style={{ color: defaultColors.text }}>
              Registrar Nuevo Negocio
            </Text>
            <Text
              className="text-base text-center mb-6"
              style={{ color: defaultColors.textSecondary }}
            >
              Completa la información requerida para registrar tu negocio
            </Text>
          </View>

          <BusinessInfo control={control} errors={errors} />

          <BusinessAddress control={control} errors={errors} />

          <TouchableOpacity
            onPress={handleSubmit(onSubmit)}
            disabled={isLoading}
            className="rounded-xl py-4 w-full items-center justify-center shadow-lg"
            style={{ backgroundColor: defaultColors.primary, opacity: isLoading ? 0.7 : 1 }}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color="#ffffff" />
            ) : (
              <Text className="text-white font-semibold">Registrar Negocio</Text>
            )}
          </TouchableOpacity>
        </ContentWrapper>
      </MyScrollView>
    </GradientBackground>
  );
}
