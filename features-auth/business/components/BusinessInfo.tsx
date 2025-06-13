import { GlassCard } from "components/ui/cards/GlassCard";
import { CustomInput } from "components/ui/inputs/CustomInput";
import { Controller } from "react-hook-form";
import { Text, View } from "react-native";
import { businessFormStyles } from "../styles/businessFormStyles";

interface BusinessInfoProps {
  control: any;
  errors: any;
}

export const BusinessInfo = ({ control, errors }: BusinessInfoProps) => {
  return (
    <GlassCard>
      <Text style={businessFormStyles.title}>Información del Negocio</Text>

      <View className="mb-4">
        <Text style={businessFormStyles.label}>Nombre del Negocio</Text>
        <Controller
          control={control}
          name="businessName"
          render={({ field: { onChange, value } }) => (
            <CustomInput
              placeholder="Nombre del Negocio"
              icon="🏢"
              value={value}
              onChangeText={onChange}
              error={errors.businessName?.message}
            />
          )}
        />
      </View>

      <View className="mb-4">
        <Text style={businessFormStyles.label}>Teléfono del Negocio</Text>
        <Controller
          control={control}
          name="businessPhone"
          render={({ field: { onChange, value } }) => (
            <CustomInput
              value={value}
              icon="☎️"
              onChangeText={onChange}
              placeholder="Ej: 12345678"
              keyboardType="phone-pad"
            />
          )}
        />
      </View>

      <View className="mb-4">
        <Text style={businessFormStyles.label}>Descripción del Negocio</Text>
        <Controller
          control={control}
          name="businessDescription"
          render={({ field: { onChange, value } }) => (
            <CustomInput
              value={value}
              onChangeText={onChange}
              placeholder="Describe brevemente tu negocio"
              multiline
              numberOfLines={3}
            />
          )}
        />
      </View>
    </GlassCard>
  );
};
