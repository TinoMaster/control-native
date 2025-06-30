import { MyCard } from "components/ui/cards/MyCard";
import { CustomInput } from "components/ui/inputs/CustomInput";
import { Controller } from "react-hook-form";
import { View } from "react-native";

interface BusinessAddressProps {
  readonly control: any;
  readonly errors: any;
}

export const BusinessAddress = ({ control, errors }: BusinessAddressProps) => {
  return (
    <MyCard title="Dirección del Negocio">
      <View className="flex-row justify-between gap-2">
        <View className="flex-1">
          <Controller
            control={control}
            name="addressStreet"
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomInput
                label="Calle"
                placeholder="Calle Principal"
                icon="📍"
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                error={errors.addressStreet?.message}
              />
            )}
          />
        </View>

        <View className="flex-1">
          <Controller
            control={control}
            name="addressNumber"
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomInput
                label="Número"
                value={value}
                onChangeText={onChange}
                icon="🔢"
                onBlur={onBlur}
                placeholder="123"
                keyboardType="numeric"
              />
            )}
          />
        </View>
      </View>

      <View className="flex-row justify-between">
        <View className="flex-1 mr-2">
          <Controller
            control={control}
            name="addressMunicipality"
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomInput
                label="Municipio"
                icon="🏘️"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder="Municipio"
              />
            )}
          />
        </View>

        <View className="flex-1 ml-2">
          <Controller
            control={control}
            name="addressCity"
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomInput
                label="Ciudad"
                icon="🏙️"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder="Ciudad"
              />
            )}
          />
        </View>
      </View>

      <View>
        <Controller
          control={control}
          name="addressZipCode"
          render={({ field: { onChange, onBlur, value } }) => (
            <CustomInput
              label="Código Postal"
              icon="zip"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder="Código Postal"
              keyboardType="numeric"
            />
          )}
        />
      </View>
    </MyCard>
  );
};
