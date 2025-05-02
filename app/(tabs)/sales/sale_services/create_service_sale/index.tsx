import { Ionicons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { BackButtonPlusTitle } from "components/BackButtonPlusTitle";
import GenericInput from "components/forms/generic-input";
import { SelectModal } from "components/ui/modals/selectModal";
import { useNotification } from "contexts/NotificationContext";
import { useRouter } from "expo-router";
import { serviceSaleSchema, ServiceSaleSchema } from "features/sales/schema/serviceSale.schema";
import { useEmployees } from "hooks/api/useEmployees";
import { useService } from "hooks/api/useServices";
import { useServiceSale } from "hooks/api/useServiceSale";
import useColors from "hooks/useColors";
import { EmployeeModel } from "models/api/employee.model";
import { ERole } from "models/api/roles.model";
import { ServiceModel } from "models/api/service.model";
import { ServiceSaleModel } from "models/api/serviceSale.model";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useAuthStore } from "store/auth.store";
import { useBusinessStore } from "store/business.store";
import colors from "styles/colors";
import { adjustBrightness, formatNumericInput } from "utilities/helpers/globals.helpers";

export default function CreateServiceSale() {
  const router = useRouter();
  const defaultColors = useColors();
  const { business } = useBusinessStore();
  const { role, employee } = useAuthStore();
  const { saveServiceSale } = useServiceSale();
  const { services, loadingServices } = useService();
  const { employees, loadingEmployees } = useEmployees();
  const { showNotification } = useNotification();

  const [loading, setLoading] = useState(false);
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [showEmployeeModal, setShowEmployeeModal] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceModel | null>(null);
  const [selectedEmployee, setSelectedEmployee] = useState<EmployeeModel | null>(employee ?? null);

  const {
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm<ServiceSaleSchema>({
    resolver: zodResolver(serviceSaleSchema),
    defaultValues: {
      quantity: "1",
      employeeId: employee?.id?.toString() ?? ""
    },
    mode: "onChange"
  });

  const handleQuantityInput = (text: string) => {
    const formattedValue = formatNumericInput(text);
    setValue("quantity", formattedValue, { shouldValidate: true });
  };
  const selectService = (service: ServiceModel) => {
    setSelectedService(service);
    setValue("serviceId", service.id!, { shouldValidate: true });
    setShowServiceModal(false);
  };

  const selectEmployee = (employee: EmployeeModel) => {
    setSelectedEmployee(employee);
    setValue("employeeId", employee.id.toString(), { shouldValidate: true });
    setShowEmployeeModal(false);
  };

  const onSubmit = (data: ServiceSaleSchema) => {
    if (!business?.id) {
      showNotification("No se ha seleccionado un negocio", "error");
      return;
    }

    setLoading(true);

    const serviceSale: ServiceSaleModel = {
      quantity: parseFloat(data.quantity),
      service: selectedService!,
      employee: selectedEmployee!,
      business: business.id
    };

    saveServiceSale(serviceSale, {
      onSuccess: () => {
        setLoading(false);
        router.back();
      },
      onError: () => {
        setLoading(false);
      }
    });
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: defaultColors.background
      }}
    >
      <BackButtonPlusTitle title="Registrar Venta de Servicio" />

      <ScrollView
        style={{
          backgroundColor: defaultColors.background,
          padding: 16
        }}
      >
        {/* Service Selection */}
        <View style={{ marginBottom: 16 }}>
          <Text
            style={{
              color: defaultColors.text,
              marginBottom: 8
            }}
          >
            Servicio
          </Text>
          <TouchableOpacity
            style={{
              backgroundColor: colors.background.light.primary,
              padding: 12,
              borderRadius: 8,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center"
            }}
            onPress={() => setShowServiceModal(true)}
          >
            <Text
              style={{
                color: colors.lightMode.text.dark
              }}
            >
              {selectedService ? selectedService.name : "Seleccione un servicio"}
            </Text>
            <Ionicons name="chevron-down" size={20} color={colors.lightMode.text.dark} />
          </TouchableOpacity>
          {errors.serviceId && (
            <Text style={{ color: defaultColors.secondary, marginTop: 4 }}>{errors.serviceId.message}</Text>
          )}
        </View>

        {/* Employee Selection */}
        <View style={{ marginBottom: 16 }}>
          <Text
            style={{
              color: defaultColors.text,
              marginBottom: 8
            }}
          >
            Empleado
          </Text>
          <TouchableOpacity
            style={{
              backgroundColor: colors.background.light.primary,
              padding: 12,
              borderRadius: 8,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              opacity: role === ERole.OWNER ? 1 : 0.6
            }}
            onPress={() => role === ERole.OWNER && setShowEmployeeModal(true)}
            disabled={role !== ERole.OWNER}
          >
            <Text
              style={{
                color: role === ERole.OWNER ? colors.lightMode.textSecondary.light : colors.lightMode.text.dark
              }}
            >
              {selectedEmployee ? selectedEmployee.user.name : "Seleccione un empleado"}
            </Text>
            {role === ERole.OWNER ? (
              <Ionicons name="chevron-down" size={20} color={colors.lightMode.text.dark} />
            ) : (
              <Ionicons name="lock-closed" size={18} color={colors.lightMode.textSecondary.light} />
            )}
          </TouchableOpacity>
          {errors.employeeId && (
            <Text style={{ color: defaultColors.secondary, marginTop: 4 }}>{errors.employeeId.message}</Text>
          )}
        </View>

        {/* Quantity Input */}
        <View style={{ marginBottom: 16 }}>
          <GenericInput
            label="Cantidad"
            placeholder="Ingrese la cantidad"
            keyboardType="decimal-pad"
            watch={watch("quantity")}
            error={errors.quantity}
            onChangeText={(text) => handleQuantityInput(text)}
          />
        </View>

        {/* Price Information (if service is selected) */}
        {selectedService && (
          <View
            style={{
              marginBottom: 16,
              padding: 12,
              backgroundColor: adjustBrightness(defaultColors.background, 20),
              borderRadius: 8
            }}
          >
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 8 }}>
              <Text style={{ color: defaultColors.textSecondary }}>Precio unitario:</Text>
              <Text style={{ color: defaultColors.text, fontWeight: "500" }}>${selectedService.price.toFixed(2)}</Text>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <Text style={{ color: defaultColors.textSecondary }}>Total:</Text>
              <Text style={{ color: defaultColors.primary, fontWeight: "600" }}>
                ${(selectedService.price * parseFloat(watch("quantity") || "0")).toFixed(2)}
              </Text>
            </View>
          </View>
        )}

        {/* Submit Button */}
        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          style={{
            backgroundColor: colors.primary.light,
            padding: 16,
            borderRadius: 8,
            alignItems: "center",
            marginTop: 16,
            opacity: loading ? 0.7 : 1
          }}
          disabled={loading}
        >
          <Text style={{ color: colors.darkMode.text.light, fontWeight: "600" }}>
            {loading ? "Guardando..." : "Guardar Venta de Servicio"}
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Service Selection Modal */}
      {showServiceModal && (
        <SelectModal
          isVisible={showServiceModal}
          title="Seleccionar Servicio"
          onClose={() => setShowServiceModal(false)}
          data={services || []}
          isLoading={loadingServices}
          renderItem={(item) => (
            <View>
              <Text style={{ color: defaultColors.text }}>{item.name}</Text>
              <Text style={{ fontSize: 12, color: defaultColors.textSecondary, marginTop: 4 }}>
                Precio: ${item.price.toFixed(2)}
              </Text>
            </View>
          )}
          onSelect={selectService}
          keyExtractor={(item) => item.id?.toString() ?? ""}
        />
      )}

      {/* Employee Selection Modal */}
      {showEmployeeModal && (
        <SelectModal
          isVisible={showEmployeeModal}
          title="Seleccionar Empleado"
          onClose={() => setShowEmployeeModal(false)}
          data={employees || []}
          isLoading={loadingEmployees}
          renderItem={(item) => <Text>{item.user.name}</Text>}
          onSelect={selectEmployee}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );
}
