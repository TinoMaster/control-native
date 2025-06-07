import { zodResolver } from "@hookform/resolvers/zod";
import { useNotification } from "contexts/NotificationContext";
import { router } from "expo-router";
import { registerOwnerSchema, TRegisterOwnerDataModel, zRegisterDefaultValues } from "models/zod/registerOwner.schema";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { ActivityIndicator, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { authService } from "services/auth.service";
import { getEmailExistsErrorMessage, isEmailExistsError } from "utilities/helpers/errorPatterns";

export default function BusinessRegistration() {
  const [isLoading, setIsLoading] = useState(false);
  const { showNotification } = useNotification();

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<TRegisterOwnerDataModel>({
    resolver: zodResolver(registerOwnerSchema),
    defaultValues: zRegisterDefaultValues
  });

  const onSubmit = async (data: TRegisterOwnerDataModel) => {
    try {
      setIsLoading(true);
      const response = await authService.registerOwner(data);

      console.log(response);

      if (response.status === 200) {
        showNotification("Negocio registrado exitosamente", "success");
        router.replace("/");
      } else if (response.status === 400) {
        // Check if the error is related to an existing email
        if (isEmailExistsError(response.message)) {
          showNotification(getEmailExistsErrorMessage(), "error");
        } else {
          showNotification("Error al registrar el negocio", "error");
        }
      } else {
        showNotification("Error al registrar el negocio", "error");
      }
    } catch (error) {
      console.error("Error registering business:", error);
      showNotification("Ocurrió un error al registrar el negocio", "error");
    } finally {
      setIsLoading(false);
    }
  };

  // Common input style
  const inputBaseClasses = "border p-3 rounded-md text-base h-12 bg-white";
  const inputErrorClasses = "border-red-500";
  const labelClasses = "text-sm font-medium text-gray-700 mb-1";
  const errorTextClasses = "text-red-500 text-xs mt-1";
  const sectionClasses = "mb-6 bg-gray-50 p-4 rounded-lg shadow-md";
  const sectionTitleClasses = "text-xl font-semibold mb-4 text-gray-800";

  return (
    <ScrollView
      className="bg-gray-100 flex-1"
      contentContainerStyle={{ paddingBottom: 64, paddingHorizontal: 16 }} // Equivalent to styles.scrollContent
    >
      <Text className="text-3xl font-bold text-center my-6 text-gray-900">Registrar Nuevo Negocio</Text>
      <Text className="text-base text-center mb-8 text-gray-600">
        Completa la información requerida para registrar tu negocio
      </Text>

      {/* Personal Information Section */}
      <View className={sectionClasses}>
        <Text className={sectionTitleClasses}>Información Personal</Text>

        <View className="flex-row justify-between mb-1">
          <View className="flex-1 mr-2">
            <Text className={labelClasses}>Nombre</Text>
            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  className={`${inputBaseClasses} ${errors.name ? inputErrorClasses : "border-gray-300"}`}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  placeholder="Nombre"
                  autoCapitalize="words"
                />
              )}
            />
            {errors.name && <Text className={errorTextClasses}>{errors.name.message}</Text>}
          </View>

          <View className="flex-1 ml-2">
            <Text className={labelClasses}>Apellido</Text>
            <Controller
              control={control}
              name="lastName"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  className={`${inputBaseClasses} ${errors.lastName ? inputErrorClasses : "border-gray-300"}`}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  placeholder="Apellido"
                  autoCapitalize="words"
                />
              )}
            />
            {errors.lastName && <Text className={errorTextClasses}>{errors.lastName.message}</Text>}
          </View>
        </View>

        <View className="mb-4">
          <Text className={labelClasses}>Teléfono Personal</Text>
          <Controller
            control={control}
            name="phone"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                className={`${inputBaseClasses} ${errors.phone ? inputErrorClasses : "border-gray-300"}`}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder="Ej: 12345678"
                keyboardType="phone-pad"
              />
            )}
          />
          {errors.phone && <Text className={errorTextClasses}>{errors.phone.message}</Text>}
        </View>

        <View className="mb-4">
          <Text className={labelClasses}>Correo Electrónico</Text>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                className={`${inputBaseClasses} ${errors.email ? inputErrorClasses : "border-gray-300"}`}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder="correo@ejemplo.com"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            )}
          />
          {errors.email && <Text className={errorTextClasses}>{errors.email.message}</Text>}
        </View>

        <View className="flex-row justify-between mb-1">
          <View className="flex-1 mr-2">
            <Text className={labelClasses}>Contraseña</Text>
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  className={`${inputBaseClasses} ${errors.password ? inputErrorClasses : "border-gray-300"}`}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  placeholder="••••••••"
                  secureTextEntry
                />
              )}
            />
            {errors.password && <Text className={errorTextClasses}>{errors.password.message}</Text>}
          </View>

          <View className="flex-1 ml-2">
            <Text className={labelClasses}>Confirmar Contraseña</Text>
            <Controller
              control={control}
              name="confirmPassword"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  className={`${inputBaseClasses} ${errors.confirmPassword ? inputErrorClasses : "border-gray-300"}`}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  placeholder="••••••••"
                  secureTextEntry
                />
              )}
            />
            {errors.confirmPassword && <Text className={errorTextClasses}>{errors.confirmPassword.message}</Text>}
          </View>
        </View>
      </View>

      {/* Business Information Section */}
      <View className={sectionClasses}>
        <Text className={sectionTitleClasses}>Información del Negocio</Text>

        <View className="mb-4">
          <Text className={labelClasses}>Nombre del Negocio</Text>
          <Controller
            control={control}
            name="businessName"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                className={`${inputBaseClasses} ${errors.businessName ? inputErrorClasses : "border-gray-300"}`}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder="Ej: Mi Negocio S.A."
              />
            )}
          />
          {errors.businessName && <Text className={errorTextClasses}>{errors.businessName.message}</Text>}
        </View>

        <View className="mb-4">
          <Text className={labelClasses}>Teléfono del Negocio</Text>
          <Controller
            control={control}
            name="businessPhone"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                className={`${inputBaseClasses} ${errors.businessPhone ? inputErrorClasses : "border-gray-300"}`}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder="Ej: 12345678"
                keyboardType="phone-pad"
              />
            )}
          />
          {errors.businessPhone && <Text className={errorTextClasses}>{errors.businessPhone.message}</Text>}
        </View>

        <View className="mb-4">
          <Text className={labelClasses}>Descripción del Negocio</Text>
          <Controller
            control={control}
            name="businessDescription"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                className={`${inputBaseClasses} ${
                  errors.businessDescription ? inputErrorClasses : "border-gray-300"
                } h-24`}
                style={{ textAlignVertical: "top" }}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder="Describe brevemente tu negocio"
                multiline
                numberOfLines={3}
              />
            )}
          />
          {errors.businessDescription && <Text className={errorTextClasses}>{errors.businessDescription.message}</Text>}
        </View>
      </View>

      {/* Business Address Section */}
      <View className={sectionClasses}>
        <Text className={sectionTitleClasses}>Dirección del Negocio</Text>

        <View className="flex-row justify-between mb-1">
          <View className="flex-2 mr-2">
            <Text className={labelClasses}>Calle</Text>
            <Controller
              control={control}
              name="addressStreet"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  className={`${inputBaseClasses} ${errors.addressStreet ? inputErrorClasses : "border-gray-300"}`}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  placeholder="Calle Principal"
                />
              )}
            />
            {errors.addressStreet && <Text className={errorTextClasses}>{errors.addressStreet.message}</Text>}
          </View>

          <View className="flex-1 ml-2">
            <Text className={labelClasses}>Número</Text>
            <Controller
              control={control}
              name="addressNumber"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  className={`${inputBaseClasses} ${errors.addressNumber ? inputErrorClasses : "border-gray-300"}`}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  placeholder="123"
                  keyboardType="numeric"
                />
              )}
            />
            {errors.addressNumber && <Text className={errorTextClasses}>{errors.addressNumber.message}</Text>}
          </View>
        </View>

        <View className="flex-row justify-between mb-1">
          <View className="flex-1 mr-2">
            <Text className={labelClasses}>Municipio</Text>
            <Controller
              control={control}
              name="addressMunicipality"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  className={`${inputBaseClasses} ${
                    errors.addressMunicipality ? inputErrorClasses : "border-gray-300"
                  }`}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  placeholder="Municipio"
                />
              )}
            />
            {errors.addressMunicipality && (
              <Text className={errorTextClasses}>{errors.addressMunicipality.message}</Text>
            )}
          </View>

          <View className="flex-1 ml-2">
            <Text className={labelClasses}>Ciudad</Text>
            <Controller
              control={control}
              name="addressCity"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  className={`${inputBaseClasses} ${errors.addressCity ? inputErrorClasses : "border-gray-300"}`}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  placeholder="Ciudad"
                />
              )}
            />
            {errors.addressCity && <Text className={errorTextClasses}>{errors.addressCity.message}</Text>}
          </View>
        </View>

        <View className="mb-4">
          <Text className={labelClasses}>Código Postal</Text>
          <Controller
            control={control}
            name="addressZipCode"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                className={`${inputBaseClasses} ${errors.addressZipCode ? inputErrorClasses : "border-gray-300"}`}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder="Código Postal"
                keyboardType="numeric"
              />
            )}
          />
          {errors.addressZipCode && <Text className={errorTextClasses}>{errors.addressZipCode.message}</Text>}
        </View>
      </View>

      <TouchableOpacity
        onPress={handleSubmit(onSubmit)}
        disabled={isLoading}
        className={`py-3 px-4 rounded-md items-center justify-center mt-4 mb-8 ${
          isLoading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {isLoading ? (
          <ActivityIndicator size="small" color="#ffffff" />
        ) : (
          <Text className="text-white text-lg font-semibold">Registrar Negocio</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}
