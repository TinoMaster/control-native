import { Picker } from "@react-native-picker/picker";
import { MyCard } from "components/ui/MyCard";
import Checkbox from "expo-checkbox";
import { BusinessModel, ERole } from "models/api";
import { Controller } from "react-hook-form";
import { StyleSheet, Text, View } from "react-native";
import colors from "styles/colors";

interface Props {
  readonly control: any;
  readonly errors: any;
  businessList: BusinessModel[];
}

export const RoleAndBusinesses = ({ control, errors, businessList }: Props) => {
  const rolesToSelect = Object.values(ERole).filter((role) => role !== ERole.OWNER && role !== ERole.SUPERADMIN);

  return (
    <MyCard title="Asociado al Negocio">
      <View>
        <Text style={[styles.label, { color: colors.darkMode.text.light }]}>Rol</Text>
        <Controller
          control={control}
          name="role"
          render={({ field: { onChange, value } }) => (
            <View style={[styles.pickerContainer, { borderRadius: 8, overflow: "hidden" }]}>
              <Picker
                selectedValue={value}
                onValueChange={(itemValue) => onChange(itemValue)}
                style={[styles.picker, { color: colors.darkMode.text.light, backgroundColor: "transparent" }]}
                dropdownIconColor={colors.darkMode.text.light}
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
      <View className="mt-4">
        <Text style={[styles.label, { color: colors.darkMode.text.light }]}>Negocios Asignados</Text>
        <Controller
          control={control}
          name="businesses"
          render={({ field: { onChange, value } }) => {
            const handleBusinessCheckboxChange = (isChecked: boolean, businessId: number) => {
              const currentValues = value ?? [];
              if (isChecked) {
                onChange([...currentValues, businessId]);
              } else {
                onChange(currentValues.filter((id: number) => id !== businessId));
              }
            };

            return (
              <View>
                {businessList.map((b) => (
                  <View key={b.id} style={styles.checkboxContainer}>
                    <Checkbox
                      value={value?.includes(b.id as number) ?? false}
                      onValueChange={(isChecked) => handleBusinessCheckboxChange(isChecked, b.id as number)}
                      color={value?.includes(b.id as number) ? colors.primary.dark : undefined}
                    />
                    <Text style={[styles.checkboxLabel, { color: colors.darkMode.text.light }]}>{b.name}</Text>
                  </View>
                ))}
              </View>
            );
          }}
        />
        {errors.businesses && <Text style={styles.errorText}>{errors.businesses.message}</Text>}
      </View>
    </MyCard>
  );
};

const styles = StyleSheet.create({
  label: {
    marginBottom: 8,
    fontSize: 16,
    fontWeight: "500"
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
    color: colors.lightMode.text.light,
    backgroundColor: colors.background.dark.primary
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
    color: colors.error.dark,
    marginTop: 4,
    fontSize: 14
  }
});
