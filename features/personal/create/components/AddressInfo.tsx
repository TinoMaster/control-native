import { CustomInput } from "components/ui/inputs/CustomInput";
import { MyCard } from "components/ui/MyCard";
import { Controller } from "react-hook-form";
import { View } from "react-native";

interface Props {
  readonly control: any;
  readonly errors: any;
}

export const AddressInfo = ({ control, errors }: Props) => {
  return (
    <MyCard title="Información de Domicilio">
      <View className="flex-1">
        <Controller
          control={control}
          name="addressStreet"
          render={({ field: { onChange, onBlur, value } }) => (
            <CustomInput
              label="Calle"
              placeholder="Ingrese la calle"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={errors.addressStreet?.message}
            />
          )}
        />
      </View>

      <View className="flex-row mb-2 gap-2">
        <View className="flex-1">
          <Controller
            control={control}
            name="addressNumber"
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomInput
                label="Número"
                placeholder="Ingrese el número"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                keyboardType="numeric"
                error={errors.addressNumber?.message}
              />
            )}
          />
        </View>

        <View className="flex-1">
          <Controller
            control={control}
            name="addressMunicipality"
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomInput
                label="Municipio"
                placeholder="Ingrese el municipio"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={errors.addressMunicipality?.message}
              />
            )}
          />
        </View>
      </View>

      <View className="flex-row mb-2 gap-2">
        <View className="flex-1">
          <Controller
            control={control}
            name="addressCity"
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomInput
                label="Ciudad"
                placeholder="Ingrese la ciudad"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={errors.addressCity?.message}
              />
            )}
          />
        </View>

        <View className="flex-1">
          <Controller
            control={control}
            name="addressZipCode"
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomInput
                label="Código Postal"
                placeholder="Ingrese el código postal"
                keyboardType="numeric"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={errors.addressZipCode?.message}
              />
            )}
          />
        </View>
      </View>
    </MyCard>
  );
};
