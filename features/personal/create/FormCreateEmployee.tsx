import { zodResolver } from "@hookform/resolvers/zod";
import { useEmployees } from "hooks/api/useEmployees";
import useColors from "hooks/useColors";
import { zodEmployeeToEmployeeMapper } from "mappers/global.mapper";
import { EmployeeModel } from "models/api/employee.model";
import { registerEmployeeSchema, TRegisterEmployeeDataModel, zEmployeeDefaultValues } from "models/zod/employee.schema";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useBusinessStore } from "store/business.store";
import colors from "styles/colors";
import { AddressInfo } from "./components/AddressInfo";
import { PasswordSection } from "./components/PasswordSection";
import { PrincipalInfo } from "./components/PrincipalInfo";
import { RoleAndBusinesses } from "./components/RoleAndBusinesses";
import { SalaryInfo } from "./components/SalaryInfo";

export const FormCreateEmployee = () => {
  const defaultColors = useColors();
  const businessList = useBusinessStore((state) => state.businessList);
  const business = useBusinessStore((state) => state.business);
  const { saveEmployee, loadingSave } = useEmployees();

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
    <>
      <PrincipalInfo control={control} errors={errors} />

      <AddressInfo control={control} errors={errors} />

      <PasswordSection control={control} errors={errors} />

      <SalaryInfo control={control} errors={errors} />

      <RoleAndBusinesses control={control} errors={errors} businessList={businessList} />

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
    </>
  );
};

const styles = StyleSheet.create({
  submitButton: {
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center"
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
