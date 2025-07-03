import { Ionicons } from "@expo/vector-icons";
import { MiniCard } from "components/ui/cards/MiniCard";
import { MiniIconButton } from "components/ui/MIniIconButton";
import { MyModal } from "components/ui/modals/myModal";
import { useNotification } from "contexts/NotificationContext";
import { format } from "date-fns";
import { useDebts } from "hooks/api/useDebts";
import useColors from "hooks/useColors";
import { DebtModel } from "models/api/debt.model";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useModalStore } from "store/modal.store";
import colors from "styles/colors";
import { formatCurrency } from "utilities/formatters";
import { FormEditDebt } from "./FormEditDebt";

interface DebtCardProps {
  readonly debt: DebtModel;
  readonly onPress?: () => void;
  readonly allDetails?: boolean;
}

export function DebtCard({ debt, onPress, allDetails = true }: DebtCardProps) {
  const defaultColors = useColors();
  const { deleteDebt, loadingDelete } = useDebts();
  const { showConfirm, showAlert } = useModalStore();
  const { showNotification } = useNotification();
  const [editModalVisible, setEditModalVisible] = useState(false);

  const createdAt = debt.createdAt ? new Date(debt.createdAt) : null;
  const remainingAmount = debt.total - debt.paid;
  const isPaid = remainingAmount <= 0;

  const handleEdit = () => {
    setEditModalVisible(true);
  };

  const handleDelete = () => {
    showConfirm("Eliminar deuda", "¿Estás seguro de eliminar esta deuda?", {
      onConfirm: () => {
        if (debt.id) {
          deleteDebt(debt.id);
          showNotification("Deuda eliminada correctamente", "success");
        } else {
          showNotification("No se pudo eliminar la deuda", "error");
        }
      },
      onCancel: () => console.log("Cancelado")
    });
  };

  const handleLock = () => {
    showAlert(
      "Acción no permitida",
      "No es posible ejecutar ninguna acción sobre estas deudas porque ya pertenecen a un reporte guardado."
    );
  };

  return (
    <MiniCard>
      <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
        <View className="flex-row justify-between items-center mb-3">
          <View className="flex-1">
            <Text className="text-lg font-semibold mb-0.5" style={{ color: defaultColors.text }}>
              {debt.name}
            </Text>
            <Text className="text-sm mb-1" style={{ color: defaultColors.textSecondary }}>
              {createdAt ? format(createdAt, "dd/MM/yyyy HH:mm") : "Fecha no disponible"}
            </Text>
          </View>
          <View className="flex-row items-center gap-1">
            {!debt.businessFinalSale ? (
              <>
                <TouchableOpacity disabled={loadingDelete} className="mx-1">
                  <MiniIconButton iconColor={colors.darkMode.text.light} style={{ backgroundColor: colors.background.dark.secondary }} icon="pencil" onPress={handleEdit} />
                </TouchableOpacity>
                <TouchableOpacity disabled={loadingDelete} className="mx-1">
                  <MiniIconButton iconColor={colors.darkMode.text.light} style={{ backgroundColor: colors.background.dark.secondary }} icon="trash-outline" onPress={handleDelete} />
                </TouchableOpacity>
              </>
            ) : (
              <MiniIconButton iconColor={colors.darkMode.text.light} style={{ backgroundColor: colors.background.dark.secondary }} icon="lock-closed" onPress={handleLock} />
            )}
            {onPress && <Ionicons name="chevron-forward" size={24} color={defaultColors.textSecondary} />}
          </View>
        </View>

        {debt.description && (
          <View className="mb-3">
            <View className="flex-row items-center mb-1">
              <Ionicons name="document-text-outline" size={16} color={defaultColors.textSecondary} />
              <Text className="text-sm ml-2" style={{ color: defaultColors.textSecondary }} numberOfLines={2}>
                {debt.description}
              </Text>
            </View>
          </View>
        )}

        <View className="mt-2">
          <View className="flex-row justify-between items-center mb-2">
            <View className="flex-row items-center mb-1">
              <Ionicons name="cash-outline" size={16} color={defaultColors.textSecondary} />
              <Text className="text-sm font-medium ml-2" style={{ color: defaultColors.textSecondary }}>
                Total: {formatCurrency(debt.total)}
              </Text>
            </View>

            <View className="flex-row items-center mb-1">
              <Ionicons name="wallet-outline" size={16} color={defaultColors.textSecondary} />
              <Text className="text-sm font-medium ml-2" style={{ color: defaultColors.textSecondary }}>
                Pagado: {formatCurrency(debt.paid)}
              </Text>
            </View>
          </View>

          {allDetails && (
            <View className="flex-row items-center mt-2 pt-2 border-t border-gray-200">
              <Ionicons
                name={isPaid ? "checkmark-circle-outline" : "alert-circle-outline"}
                size={18}
                color={isPaid ? colors.success.dark : defaultColors.primary}
              />
              <Text
                className="text-base font-semibold ml-2"
                style={{ color: isPaid ? colors.success.dark : defaultColors.primary }}
              >
                {isPaid ? "Pagado" : `Pendiente: ${formatCurrency(remainingAmount)}`}
              </Text>
            </View>
          )}
        </View>
      </TouchableOpacity>

      {/* Edit Modal */}
      <MyModal isVisible={editModalVisible} onClose={() => setEditModalVisible(false)} title="Editar Deuda">
        <FormEditDebt debt={debt} setModalVisible={setEditModalVisible} />
      </MyModal>
    </MiniCard>
  );
}
