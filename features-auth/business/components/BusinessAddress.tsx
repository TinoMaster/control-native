import { MyCard } from "components/ui/cards/MyCard";
import { CustomInput } from "components/ui/inputs/CustomInput";
import { Controller } from "react-hook-form";
import { Text, View } from "react-native";
import { businessFormStyles } from "../styles/businessFormStyles";

interface BusinessAddressProps {
  readonly control: any;
  readonly errors: any;
}

export const BusinessAddress = ({ control, errors }: BusinessAddressProps) => {
  return (
    <MyCard title="Dirección del Negocio">
      <View className="flex-row justify-between gap-2">
        <View className="flex-1">
          <Text style={businessFormStyles.label}>Calle</Text>
          <Controller
            control={control}
            name="addressStreet"
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomInput
                placeholder="Calle Principal"
                icon="📍"
                value={value}
                onChangeText={onChange}
                error={errors.addressStreet?.message}
              />
            )}
          />
        </View>

        <View className="flex-1">
          <Text style={businessFormStyles.label}>Número</Text>
          <Controller
            control={control}
            name="addressNumber"
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomInput
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
          <Text style={businessFormStyles.label}>Municipio</Text>
          <Controller
            control={control}
            name="addressMunicipality"
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomInput icon="🏘️" value={value} onChangeText={onChange} onBlur={onBlur} placeholder="Municipio" />
            )}
          />
        </View>

        <View className="flex-1 ml-2">
          <Text style={businessFormStyles.label}>Ciudad</Text>
          <Controller
            control={control}
            name="addressCity"
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomInput icon="🏙️" value={value} onChangeText={onChange} onBlur={onBlur} placeholder="Ciudad" />
            )}
          />
        </View>
      </View>

      <View>
        <Text style={businessFormStyles.label}>Código Postal</Text>
        <Controller
          control={control}
          name="addressZipCode"
          render={({ field: { onChange, onBlur, value } }) => (
            <CustomInput
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
