import { CustomInput } from "components/ui/inputs/CustomInput";
import { MyCard } from "components/ui/MyCard";
import { Controller } from "react-hook-form";
import { View } from "react-native";

interface Props {
  readonly control: any;
  readonly errors: any;
}

export const PrincipalInfo = ({ control, errors }: Props) => {
  return (
    <MyCard title="Información Personal">
      <View className="flex-row mb-2 gap-2">
        <View className="flex-1">
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomInput
                label="Nombre"
                placeholder="Ingrese el nombre"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={errors.name?.message}
              />
            )}
          />
        </View>

        <View className="flex-1">
          <Controller
            control={control}
            name="lastName"
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomInput
                label="Apellido"
                placeholder="Ingrese el apellido"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={errors.lastName?.message}
              />
            )}
          />
        </View>
      </View>

      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, onBlur, value } }) => (
          <CustomInput
            label="Email"
            placeholder="Ingrese el correo electrónico"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            keyboardType="email-address"
            autoCapitalize="none"
            error={errors.email?.message}
          />
        )}
      />

      <View className="flex-row mb-2 gap-2">
        <View className="flex-1">
          <Controller
            control={control}
            name="dni"
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomInput
                label="DNI"
                placeholder="Ingrese el DNI"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                keyboardType="numeric"
                error={errors.dni?.message}
              />
            )}
          />
        </View>

        <View className="flex-1">
          <Controller
            control={control}
            name="phone"
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomInput
                label="Teléfono"
                placeholder="Ingrese el teléfono"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                keyboardType="phone-pad"
                error={errors.phone?.message}
              />
            )}
          />
        </View>
      </View>
    </MyCard>
  );
};
