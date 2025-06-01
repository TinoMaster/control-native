import { Ionicons } from "@expo/vector-icons";
import { MiniIconButton } from "components/ui/MIniIconButton";
import { MyModal } from "components/ui/modals/myModal";
import { useNotification } from "contexts/NotificationContext";
import { format } from "date-fns";
import { useServiceSale } from "hooks/api/useServiceSale";
import useColors from "hooks/useColors";
import { ServiceSaleModel } from "models/api/serviceSale.model";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useModalStore } from "store/modal.store";
import { adjustBrightness } from "utilities/helpers/globals.helpers";
import { FormEditServiceSale } from "./FormEditServiceSale";

interface SaleServiceCardProps {
  readonly saleService: ServiceSaleModel;
  readonly onPress?: () => void;
  readonly allDetails?: boolean;
}

export function SaleServiceCard({ saleService, onPress, allDetails = true }: SaleServiceCardProps) {
  const defaultColors = useColors();
  const { showConfirm, showAlert } = useModalStore();
  const { deleteServiceSale } = useServiceSale();
  const { showNotification } = useNotification();
  const [editModalVisible, setEditModalVisible] = useState(false);

  const createdAt = saleService.createdAt ? new Date(saleService.createdAt) : null;
  const totalAmount = saleService.quantity * saleService.service.price;

  const handleEdit = () => {
    setEditModalVisible(true);
  };

  const handleDelete = () => {
    showConfirm("Eliminar servicio", "¿Estás seguro de eliminar este servicio?", {
      onConfirm: () => {
        if (saleService.id) {
          deleteServiceSale(saleService.id);
          showNotification("Servicio eliminado correctamente", "success");
        } else {
          showNotification("No se pudo eliminar el servicio", "error");
        }
      },
      onCancel: () => console.log("Cancelado")
    });
  };

  const handleLock = () => {
    showAlert(
      "Acción no permitida",
      "No es posible ejecutar ninguna acción sobre estos servicios vendidos porque ya pertenecen a un reporte guardado."
    );
  };

  return (
    <View>
      <TouchableOpacity
        onPress={onPress}
        className="rounded-xl p-4 mb-3"
        style={{ backgroundColor: adjustBrightness(defaultColors.background, 18) }}
        activeOpacity={0.8}
      >
        <View className="flex-row justify-between items-center mb-3">
          <View className="flex-1">
            <Text className="text-lg font-semibold mb-0.5" style={{ color: defaultColors.text }}>
              {saleService.service.name}
            </Text>
            <Text className="text-sm mb-1" style={{ color: defaultColors.textSecondary }}>
              {createdAt ? format(createdAt, "dd/MM/yyyy HH:mm") : "Fecha no disponible"}
            </Text>
          </View>
          <View className="flex-row items-center gap-1">
            {!saleService.businessFinalSale ? (
              <>
                <TouchableOpacity className="mx-1">
                  <MiniIconButton icon="pencil" onPress={handleEdit} />
                </TouchableOpacity>
                <TouchableOpacity className="mx-1">
                  <MiniIconButton icon="trash-outline" onPress={handleDelete} />
                </TouchableOpacity>
              </>
            ) : (
              <MiniIconButton icon="lock-closed" onPress={handleLock} />
            )}
            {onPress && <Ionicons name="chevron-forward" size={24} color={defaultColors.textSecondary} />}
          </View>
        </View>

        <View className="mb-3 gap-1.5">
          <View className="flex-row items-center mb-1">
            <Ionicons name="person-outline" size={16} color={defaultColors.textSecondary} />
            <Text className="text-sm ml-2" style={{ color: defaultColors.textSecondary }}>
              {saleService.employee.user.name}
            </Text>
          </View>

          {allDetails && (
            <View className="flex-row items-center mb-1">
              <Ionicons name="document-text-outline" size={16} color={defaultColors.textSecondary} />
              <Text className="text-sm ml-2" style={{ color: defaultColors.textSecondary }} numberOfLines={2}>
                {saleService.service.description}
              </Text>
            </View>
          )}
        </View>

        <View className="mt-2">
          <View className="flex-row justify-between items-center mb-2">
            <View className="flex-row items-center mb-1">
              <Ionicons name="pricetag-outline" size={16} color={defaultColors.textSecondary} />
              <Text className="text-sm font-medium ml-2" style={{ color: defaultColors.textSecondary }}>
                Precio: ${saleService.service.price.toFixed(2)}
              </Text>
            </View>

            <View className="flex-row items-center mb-1">
              <Ionicons name="calculator-outline" size={16} color={defaultColors.textSecondary} />
              <Text className="text-sm font-medium ml-2" style={{ color: defaultColors.textSecondary }}>
                Cantidad: {saleService.quantity}
              </Text>
            </View>
          </View>

          {allDetails && (
            <View className="flex-row items-center mt-2 pt-2 border-t border-gray-200">
              <Ionicons name="cash-outline" size={18} color={defaultColors.primary} />
              <Text className="text-base font-semibold ml-2" style={{ color: defaultColors.primary }}>
                Total: ${totalAmount.toFixed(2)}
              </Text>
            </View>
          )}
        </View>
      </TouchableOpacity>

      {/* Edit Modal */}
      <MyModal isVisible={editModalVisible} onClose={() => setEditModalVisible(false)} title="Editar Venta de Servicio">
        <FormEditServiceSale saleService={saleService} setModalVisible={setEditModalVisible} />
      </MyModal>
    </View>
  );
}
