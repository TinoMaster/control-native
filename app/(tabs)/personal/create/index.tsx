import { zodResolver } from "@hookform/resolvers/zod";
import { Picker } from "@react-native-picker/picker";
import { BackButtonPlusTitle } from "components/BackButtonPlusTitle";
import Checkbox from "expo-checkbox";
import { useRouter } from "expo-router";
import { useEmployees } from "hooks/api/useEmployees";
import useColors from "hooks/useColors";
import { zodEmployeeToEmployeeMapper } from "mappers/global.mapper";
import { ERole } from "models/api";
import { EmployeeModel } from "models/api/employee.model";
import { registerEmployeeSchema, TRegisterEmployeeDataModel, zEmployeeDefaultValues } from "models/zod/employee.schema";
import { useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { ActivityIndicator, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useBusinessStore } from "store/business.store";
import colors from "styles/colors";

export default function CreateEmployee() {
  const router = useRouter();
  const defaultColors = useColors();
  const businessList = useBusinessStore((state) => state.businessList);
  const business = useBusinessStore((state) => state.business);
  const { saveEmployee, loadingSave } = useEmployees();

  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
    reset,
    watch
  } = useForm<TRegisterEmployeeDataModel>({
    resolver: zodResolver(registerEmployeeSchema),
    defaultValues: {
      ...zEmployeeDefaultValues,
      businesses: business?.id ? [business.id] : []
    },
    mode: "onChange"
  });

  const selectedBusinesses = watch("businesses") ?? [];

  const onSubmit: SubmitHandler<TRegisterEmployeeDataModel> = async (data) => {
    const businessesToSave = businessList.filter((b) => b.id && data.businesses.includes(b.id));

    const dataToSave: EmployeeModel = zodEmployeeToEmployeeMapper(data, businessesToSave);

    saveEmployee(dataToSave, {
      onSuccess: () => {
        router.back();
      }
    });
  };

  useEffect(() => {
    if (business?.id) {
      reset({
        ...zEmployeeDefaultValues,
        businesses: [business.id]
      });
    } else {
      reset({
        ...zEmployeeDefaultValues,
        businesses: []
      });
    }
  }, [business, reset]);

  return (
    <View style={[styles.container, { backgroundColor: defaultColors.background }]}>
      <BackButtonPlusTitle title="Crear Empleado" />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        keyboardShouldPersistTaps="handled"
      >
        {/* Name */}
        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: defaultColors.text }]}>Nombre</Text>
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[styles.input, { color: defaultColors.text, backgroundColor: defaultColors.background }]}
                placeholder="Ingrese el nombre"
                placeholderTextColor={defaultColors.textSecondary}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.name && <Text style={styles.errorText}>{errors.name.message}</Text>}
        </View>

        {/* Last Name */}
        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: defaultColors.text }]}>Apellido</Text>
          <Controller
            control={control}
            name="lastName"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[styles.input, { color: defaultColors.text, backgroundColor: defaultColors.background }]}
                placeholder="Ingrese el apellido"
                placeholderTextColor={defaultColors.textSecondary}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.lastName && <Text style={styles.errorText}>{errors.lastName.message}</Text>}
        </View>

        {/* Email */}
        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: defaultColors.text }]}>Email</Text>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[styles.input, { color: defaultColors.text, backgroundColor: defaultColors.background }]}
                placeholder="Ingrese el correo electrónico"
                placeholderTextColor={defaultColors.textSecondary}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            )}
          />
          {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}
        </View>

        {/* DNI */}
        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: defaultColors.text }]}>DNI</Text>
          <Controller
            control={control}
            name="dni"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[styles.input, { color: defaultColors.text, backgroundColor: defaultColors.background }]}
                placeholder="Ingrese el DNI"
                placeholderTextColor={defaultColors.textSecondary}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                keyboardType="numeric"
              />
            )}
          />
          {errors.dni && <Text style={styles.errorText}>{errors.dni.message}</Text>}
        </View>

        {/* Phone */}
        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: defaultColors.text }]}>Teléfono</Text>
          <Controller
            control={control}
            name="phone"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[styles.input, { color: defaultColors.text, backgroundColor: defaultColors.background }]}
                placeholder="Ingrese el teléfono"
                placeholderTextColor={defaultColors.textSecondary}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                keyboardType="phone-pad"
              />
            )}
          />
          {errors.phone && <Text style={styles.errorText}>{errors.phone.message}</Text>}
        </View>

        {/* Address Street */}
        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: defaultColors.text }]}>Calle</Text>
          <Controller
            control={control}
            name="addressStreet"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[styles.input, { color: defaultColors.text, backgroundColor: defaultColors.background }]}
                placeholder="Ingrese la calle"
                placeholderTextColor={defaultColors.textSecondary}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.addressStreet && (
            <Text style={styles.errorText}>{errors.addressStreet.message ?? "Campo requerido"}</Text>
          )}
        </View>

        {/* Address Number */}
        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: defaultColors.text }]}>Número</Text>
          <Controller
            control={control}
            name="addressNumber"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[styles.input, { color: defaultColors.text, backgroundColor: defaultColors.background }]}
                placeholder="Ingrese el número"
                placeholderTextColor={defaultColors.textSecondary}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                keyboardType="numeric"
              />
            )}
          />
          {errors.addressNumber && (
            <Text style={styles.errorText}>{errors.addressNumber.message ?? "Campo requerido"}</Text>
          )}
        </View>

        {/* Address Municipality */}
        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: defaultColors.text }]}>Municipio</Text>
          <Controller
            control={control}
            name="addressMunicipality"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[styles.input, { color: defaultColors.text, backgroundColor: defaultColors.background }]}
                placeholder="Ingrese el municipio"
                placeholderTextColor={defaultColors.textSecondary}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.addressMunicipality && (
            <Text style={styles.errorText}>{errors.addressMunicipality.message ?? "Campo requerido"}</Text>
          )}
        </View>

        {/* Address City */}
        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: defaultColors.text }]}>Ciudad</Text>
          <Controller
            control={control}
            name="addressCity"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[styles.input, { color: defaultColors.text, backgroundColor: defaultColors.background }]}
                placeholder="Ingrese la ciudad"
                placeholderTextColor={defaultColors.textSecondary}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.addressCity && (
            <Text style={styles.errorText}>{errors.addressCity.message ?? "Campo requerido"}</Text>
          )}
        </View>

        {/* Address Zip Code */}
        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: defaultColors.text }]}>Código Postal</Text>
          <Controller
            control={control}
            name="addressZipCode"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[styles.input, { color: defaultColors.text, backgroundColor: defaultColors.background }]}
                placeholder="Ingrese el código postal"
                placeholderTextColor={defaultColors.textSecondary}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                keyboardType="numeric"
              />
            )}
          />
          {errors.addressZipCode && (
            <Text style={styles.errorText}>{errors.addressZipCode.message ?? "Campo requerido"}</Text>
          )}
        </View>

        {/* Role */}
        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: defaultColors.text }]}>Rol</Text>
          <Controller
            control={control}
            name="role"
            render={({ field: { onChange, value } }) => (
              <View style={[styles.pickerContainer, { backgroundColor: defaultColors.background }]}>
                <Picker
                  selectedValue={value}
                  onValueChange={(itemValue) => onChange(itemValue)}
                  style={[styles.picker, { color: defaultColors.text }]}
                  dropdownIconColor={defaultColors.text}
                >
                  {Object.values(ERole).map((roleValue) => (
                    <Picker.Item key={roleValue} label={roleValue} value={roleValue} />
                  ))}
                </Picker>
              </View>
            )}
          />
          {errors.role && <Text style={styles.errorText}>{errors.role.message}</Text>}
        </View>

        {/* Businesses */}
        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: defaultColors.text }]}>Negocios Asignados</Text>
          <Controller
            control={control}
            name="businesses"
            render={({ field: { onChange, value } }) => (
              <View>
                {businessList.map((b) => (
                  <View key={b.id} style={styles.checkboxContainer}>
                    <Checkbox
                      value={value?.includes(b.id as number) ?? false}
                      onValueChange={(isChecked) => {
                        const currentValues = value ?? [];
                        if (isChecked) {
                          onChange([...currentValues, b.id as number]);
                        } else {
                          onChange(currentValues.filter((id) => id !== b.id));
                        }
                      }}
                      color={value?.includes(b.id as number) ? defaultColors.primary : undefined}
                    />
                    <Text style={[styles.checkboxLabel, { color: defaultColors.text }]}>{b.name}</Text>
                  </View>
                ))}
              </View>
            )}
          />
          {errors.businesses && <Text style={styles.errorText}>{errors.businesses.message}</Text>}
        </View>

        {/* Password */}
        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: defaultColors.text }]}>Contraseña</Text>
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[styles.input, { color: defaultColors.text, backgroundColor: defaultColors.background }]}
                placeholder="Ingrese la contraseña"
                placeholderTextColor={defaultColors.textSecondary}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                secureTextEntry
              />
            )}
          />
          {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}
        </View>

        {/* Confirm Password */}
        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: defaultColors.text }]}>Confirmar Contraseña</Text>
          <Controller
            control={control}
            name="confirmPassword"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[styles.input, { color: defaultColors.text, backgroundColor: defaultColors.background }]}
                placeholder="Confirme la contraseña"
                placeholderTextColor={defaultColors.textSecondary}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                secureTextEntry
              />
            )}
          />
          {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword.message}</Text>}
        </View>

        {/* Fixed Salary */}
        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: defaultColors.text }]}>Salario Fijo (Opcional)</Text>
          <Controller
            control={control}
            name="fixedSalary"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[styles.input, { color: defaultColors.text, backgroundColor: defaultColors.background }]}
                placeholder="0.00"
                placeholderTextColor={defaultColors.textSecondary}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                keyboardType="numeric"
              />
            )}
          />
          {errors.fixedSalary && <Text style={styles.errorText}>{errors.fixedSalary.message}</Text>}
        </View>

        {/* Percent Salary */}
        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: defaultColors.text }]}>Salario Porcentaje % (Opcional)</Text>
          <Controller
            control={control}
            name="percentSalary"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[styles.input, { color: defaultColors.text, backgroundColor: defaultColors.background }]}
                placeholder="0"
                placeholderTextColor={defaultColors.textSecondary}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                keyboardType="numeric"
              />
            )}
          />
          {errors.percentSalary && <Text style={styles.errorText}>{errors.percentSalary.message}</Text>}
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          style={[
            styles.submitButton,
            { backgroundColor: defaultColors.primary },
            (!isValid || loadingSave) && styles.disabledButton
          ]}
          onPress={handleSubmit(onSubmit)}
          disabled={!isValid || loadingSave}
        >
          {loadingSave ? (
            <ActivityIndicator color={colors.darkMode.text.light} />
          ) : (
            <Text style={styles.submitButtonText}>Crear Empleado</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scrollView: {
    flex: 1
  },
  scrollViewContent: {
    padding: 16,
    paddingBottom: 80
  },
  inputGroup: {
    marginBottom: 16
  },
  label: {
    marginBottom: 8,
    fontSize: 16,
    fontWeight: "500"
  },
  input: {
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    borderWidth: 1,
    borderColor: colors.lightMode.textSecondary.light
  },
  pickerContainer: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.lightMode.textSecondary.light,
    justifyContent: "center",
    height: 50
  },
  picker: {
    height: 50,
    width: "100%",
    color: colors.lightMode.text.light
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8
  },
  checkboxLabel: {
    marginLeft: 8,
    fontSize: 16
  },
  errorText: {
    color: colors.lightMode.textSecondary.light,
    marginTop: 4,
    fontSize: 14
  },
  submitButton: {
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20
  },
  submitButtonText: {
    color: colors.darkMode.text.light,
    fontSize: 18,
    fontWeight: "bold"
  },
  disabledButton: {
    opacity: 0.6
  }
});
