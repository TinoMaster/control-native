import { MyCard } from "components/ui/cards/MyCard";
import { CustomInput } from "components/ui/inputs/CustomInput";
import { Controller } from "react-hook-form";
import { View } from "react-native";

interface BusinessInfoProps {
  control: any;
  errors: any;
}

export const BusinessInfo = ({ control, errors }: BusinessInfoProps) => {
  return (
    <MyCard title="Información del Negocio">
      <View>
        <Controller
          control={control}
          name="businessName"
          render={({ field: { onChange, value } }) => (
            <CustomInput
              label="Nombre del Negocio"
              placeholder="Nombre del Negocio"
              icon="🏢"
              value={value}
              onChangeText={onChange}
              error={errors.businessName?.message}
            />
          )}
        />
      </View>

      <View>
        <Controller
          control={control}
          name="businessPhone"
          render={({ field: { onChange, value } }) => (
            <CustomInput
              label="Teléfono del Negocio"
              value={value}
              icon="☎️"
              onChangeText={onChange}
              placeholder="Ej: 12345678"
              keyboardType="phone-pad"
            />
          )}
        />
      </View>

      <View>
        <Controller
          control={control}
          name="businessDescription"
          render={({ field: { onChange, value } }) => (
            <CustomInput
              label="Descripción del Negocio"
              value={value}
              icon="📝"
              onChangeText={onChange}
              placeholder="Describe brevemente tu negocio"
              multiline
              numberOfLines={3}
            />
          )}
        />
      </View>
    </MyCard>
  );
};
