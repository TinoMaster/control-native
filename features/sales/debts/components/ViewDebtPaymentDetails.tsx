import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useEmployees } from "hooks/api/useEmployees";
import useColors from "hooks/useColors";
import { DebtPaymentModel } from "models/api/debtPayment.model";
import { Text, View } from "react-native";
import { formatCurrency } from "utilities/formatters";

interface Props {
  payment: DebtPaymentModel;
  onClose: () => void;
}

export const ViewDebtPaymentDetails = ({ payment, onClose }: Props) => {
  const defaultColors = useColors();
  const { getEmployeeById } = useEmployees();

  // Obtener información del empleado que realizó el pago
  const employee = payment.employeeId ? getEmployeeById(payment.employeeId) : null;
  const employeeName = employee?.user.name || "No disponible";

  return (
    <View className="p-4">
      {/* Monto del pago */}
      <View className="mb-6">
        <Text style={{ color: defaultColors.textSecondary }} className="text-sm mb-1">
          Monto pagado
        </Text>
        <Text style={{ color: defaultColors.text }} className="text-2xl font-bold">
          {formatCurrency(payment.amount)}
        </Text>
      </View>

      {/* Fecha del pago */}
      <View className="mb-6">
        <Text style={{ color: defaultColors.textSecondary }} className="text-sm mb-1">
          Fecha de pago
        </Text>
        <Text style={{ color: defaultColors.text }} className="text-base">
          {payment.createdAt
            ? format(new Date(payment.createdAt), "d 'de' MMMM, yyyy 'a las' HH:mm", { locale: es })
            : "Fecha no disponible"}
        </Text>
      </View>

      {/* Comentario (si existe) */}
      {payment.comment && (
        <View className="mb-6">
          <Text style={{ color: defaultColors.textSecondary }} className="text-sm mb-1">
            Comentario
          </Text>
          <View className="rounded-lg" style={{ backgroundColor: defaultColors.background }}>
            <Text style={{ color: defaultColors.text }} className="text-base">
              {payment.comment}
            </Text>
          </View>
        </View>
      )}

      {/* Empleado que registró el pago */}
      <View>
        <Text style={{ color: defaultColors.textSecondary }} className="text-sm mb-1">
          Registrado por
        </Text>
        <Text style={{ color: defaultColors.text }} className="text-base">
          {employeeName}
        </Text>
      </View>
    </View>
  );
};
