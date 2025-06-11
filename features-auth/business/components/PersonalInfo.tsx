import { GlassCard } from "components/ui/cards/GlassCard";
import { CustomInput } from "components/ui/inputs/CustomInput";
import React from "react";
import { Controller } from "react-hook-form";
import { Text, View } from "react-native";
import { businessFormStyles } from "../styles/businessFormStyles";

interface PersonalInfoProps {
  readonly control: any;
  readonly errors: any;
}

export const PersonalInfo = ({ control, errors }: PersonalInfoProps) => {
  return (
    <GlassCard>
      <Text style={businessFormStyles.title}>Información Personal</Text>

      <View className="flex-row justify-between gap-4">
        <View className="flex-1">
          <Text style={businessFormStyles.label}>Nombre</Text>
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
              <CustomInput
                placeholder="Nombre"
                icon="🙋"
                value={value}
                onChangeText={onChange}
                error={errors.name?.message}
              />
            )}
          />
        </View>

        <View className="flex-1">
          <Text style={businessFormStyles.label}>Apellido</Text>
          <Controller
            control={control}
            name="lastName"
            render={({ field: { onChange, value } }) => (
              <CustomInput
                placeholder="Apellido"
                icon="🙎"
                value={value}
                onChangeText={onChange}
                error={errors.lastName?.message}
              />
            )}
          />
        </View>
      </View>

      <View>
        <Text style={businessFormStyles.label}>Teléfono Personal</Text>
        <Controller
          control={control}
          name="phone"
          render={({ field: { onChange, value } }) => (
            <CustomInput
              placeholder="Ej: 12345678"
              icon="📞"
              value={value}
              onChangeText={onChange}
              error={errors.phone?.message}
            />
          )}
        />
      </View>

      <View>
        <Text style={businessFormStyles.label}>Correo Electrónico</Text>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <CustomInput
              placeholder="correo@ejemplo.com"
              icon="📧"
              value={value}
              onChangeText={onChange}
              error={errors.email?.message}
            />
          )}
        />
      </View>

      <View className="flex-1">
        <Text style={businessFormStyles.label}>Contraseña</Text>
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value } }) => (
            <CustomInput
              placeholder="••••••••"
              icon="🔒"
              value={value}
              isPassword
              onChangeText={onChange}
              error={errors.password?.message}
            />
          )}
        />
      </View>

      <View className="flex-1">
        <Text style={businessFormStyles.label}>Confirmar Contraseña</Text>
        <Controller
          control={control}
          name="confirmPassword"
          render={({ field: { onChange, value } }) => (
            <CustomInput
              placeholder="••••••••"
              icon="🔒"
              value={value}
              isPassword
              onChangeText={onChange}
              error={errors.confirmPassword?.message}
            />
          )}
        />
      </View>
    </GlassCard>
  );
};
