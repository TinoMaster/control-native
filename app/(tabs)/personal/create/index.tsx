import { zodResolver } from "@hookform/resolvers/zod";
import { Picker } from "@react-native-picker/picker";
import { BackButtonPlusTitle } from "components/BackButtonPlusTitle";
import { ContentWrapper } from "components/ContentWrapper";
import { GradientBackground } from "components/ui/backgrounds/GradientBackground";
import { CustomInput } from "components/ui/inputs/CustomInput";
import { MyScrollView } from "components/ui/MyScrollView";
import Checkbox from "expo-checkbox";
import { useEmployees } from "hooks/api/useEmployees";
import useColors from "hooks/useColors";
import { zodEmployeeToEmployeeMapper } from "mappers/global.mapper";
import { ERole } from "models/api";
import { EmployeeModel } from "models/api/employee.model";
import { registerEmployeeSchema, TRegisterEmployeeDataModel, zEmployeeDefaultValues } from "models/zod/employee.schema";
import { useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { ActivityIndicator, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useBusinessStore } from "store/business.store";
import colors from "styles/colors";

export default function CreateEmployee() {
  const defaultColors = useColors();
  const businessList = useBusinessStore((state) => state.businessList);
  const business = useBusinessStore((state) => state.business);
  const { saveEmployee, loadingSave } = useEmployees();

  const rolesToSelect = Object.values(ERole).filter((role) => role !== ERole.OWNER && role !== ERole.SUPERADMIN);

  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
    reset
  } = useForm<TRegisterEmployeeDataModel>({
    resolver: zodResolver(registerEmployeeSchema),
    defaultValues: {
      ...zEmployeeDefaultValues,
      businesses: business?.id ? [business.id] : []
    },
    mode: "onChange"
  });

  const onSubmit: SubmitHandler<TRegisterEmployeeDataModel> = async (data) => {
    const businessesToSave = businessList.filter((b) => b.id && data.businesses.includes(b.id));

    const dataToSave: EmployeeModel = zodEmployeeToEmployeeMapper(data, businessesToSave);

    saveEmployee(dataToSave);
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
    <GradientBackground>
      <BackButtonPlusTitle title="Crear Empleado" />

      <MyScrollView>
        <ContentWrapper>
          {/* Name */}
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
                whiteBackground
              />
            )}
          />

          {/* Last Name */}
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
                whiteBackground
              />
            )}
          />

          {/* Email */}
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
                whiteBackground
              />
            )}
          />

          {/* DNI */}
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
                whiteBackground
              />
            )}
          />

          {/* Phone */}
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
                whiteBackground
              />
            )}
          />

          {/* Address Street */}
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
                whiteBackground
              />
            )}
          />

          {/* Address Number */}
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
                whiteBackground
              />
            )}
          />

          {/* Address Municipality */}
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
                whiteBackground
              />
            )}
          />

          {/* Address City */}
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
                whiteBackground
              />
            )}
          />

          {/* Address Zip Code */}
          <Controller
            control={control}
            name="addressZipCode"
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomInput
                label="Código Postal"
                placeholder="Ingrese el código postal"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={errors.addressZipCode?.message}
                whiteBackground
              />
            )}
          />

          {/* TODO: Continue here */}

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
                    style={[styles.picker, { color: defaultColors.text, backgroundColor: defaultColors.background }]}
                    dropdownIconColor={defaultColors.text}
                  >
                    {rolesToSelect.map((roleValue) => (
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
              render={({ field: { onChange, value } }) => {
                const handleBusinessCheckboxChange = (isChecked: boolean, businessId: number) => {
                  const currentValues = value ?? [];
                  if (isChecked) {
                    onChange([...currentValues, businessId]);
                  } else {
                    onChange(currentValues.filter((id) => id !== businessId));
                  }
                };

                return (
                  <View>
                    {businessList.map((b) => (
                      <View key={b.id} style={styles.checkboxContainer}>
                        <Checkbox
                          value={value?.includes(b.id as number) ?? false}
                          onValueChange={(isChecked) => handleBusinessCheckboxChange(isChecked, b.id as number)}
                          color={value?.includes(b.id as number) ? defaultColors.primary : undefined}
                        />
                        <Text style={[styles.checkboxLabel, { color: defaultColors.text }]}>{b.name}</Text>
                      </View>
                    ))}
                  </View>
                );
              }}
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
        </ContentWrapper>
      </MyScrollView>
    </GradientBackground>
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
  inputGroup: {},
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
