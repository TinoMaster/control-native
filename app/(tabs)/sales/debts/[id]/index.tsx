import { ContentWrapper } from "components/ContentWrapper";
import { GradientBackground } from "components/ui/backgrounds/GradientBackground";
import { CustomHeader } from "components/ui/CustomHeader";
import { ErrorView } from "components/ui/error";
import { MiniIconButton } from "components/ui/MIniIconButton";
import { MyModal } from "components/ui/modals/myModal";
import { MyScrollView } from "components/ui/MyScrollView";
import { useNotification } from "contexts/NotificationContext";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useLocalSearchParams, useRouter } from "expo-router";
import { FormAddDebtPayment } from "features/sales/debts/components/FormAddDebtPayment";
import { FormEditDebt } from "features/sales/debts/components/FormEditDebt";
import { ViewDebtPaymentDetails } from "features/sales/debts/components/ViewDebtPaymentDetails";
import { useDailySale } from "hooks/api/useDailySales";
import { useDebtPayments } from "hooks/api/useDebtPayments";
import { useDebts } from "hooks/api/useDebts";
import { useEmployees } from "hooks/api/useEmployees";
import useColors from "hooks/useColors";
import { useState } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { useAuthStore } from "store/auth.store";
import { useModalStore } from "store/modal.store";
import colors from "styles/colors";
import { formatCurrency } from "utilities/formatters";
import { isAdminOrHasId } from "utilities/helpers/globals.helpers";

export default function DebtDetails() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const employee = useAuthStore((state) => state.employee);
  const defaultColors = useColors();
  const { getDebtById, deleteDebt, loadingDelete } = useDebts();
  const { debtPayments, loadingDebtPayments } = useDebtPayments({
    debtId: Number(id)
  });
  const { getEmployeeById } = useEmployees();
  const { showConfirm, showAlert } = useModalStore();
  const { showNotification } = useNotification();

  const [editModalVisible, setEditModalVisible] = useState(false);
  const [addPaymentModalVisible, setAddPaymentModalVisible] = useState(false);
  const [viewPaymentModalVisible, setViewPaymentModalVisible] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<any>(null);

  const debt = getDebtById(Number(id));
  const remainingAmount = debt ? debt.total - debt.paid : 0;
  const isPaid = remainingAmount <= 0;

  const { data: businessFinalSale, isLoading: loadingBusinessFinalSale } = useDailySale(
    debt?.businessFinalSale ?? 0
  );

  if (!debt) {
    return (
      <ErrorView
        title="No se pudo cargar la deuda"
        message="La deuda solicitada no existe o ha sido eliminada."
        buttonText="Volver"
      />
    );
  }

  const handleDelete = () => {
    showConfirm("Eliminar deuda", "¿Estás seguro de eliminar esta deuda?", {
      onConfirm: () => {
        if (debt.id) {
          deleteDebt(debt.id);
          router.back();
        } else {
          showNotification("No se pudo eliminar la deuda", "error");
        }
      },
      onCancel: () => console.log("Cancelado")
    });
  };

  const handleAddPayment = () => {
    setAddPaymentModalVisible(true);
  };

  const handleEdit = () => {
    setEditModalVisible(true);
  };

  const handleLock = () => {
    showAlert(
      "Acción no permitida",
      "No es posible ejecutar ninguna acción sobre estas deudas porque ya pertenecen a un reporte guardado."
    );
  };

  const handleViewPayment = (payment: any) => {
    setSelectedPayment(payment);
    setViewPaymentModalVisible(true);
  };

  const employeeName = getEmployeeById(Number(debt.employee?.id ?? 0))?.user.name ?? "No asignado";
  const createdAt = debt.createdAt ? new Date(debt.createdAt) : new Date();

  return (
    <GradientBackground>
      <CustomHeader title="Detalles de la Deuda" showBackButton />
      <MyScrollView>
        <ContentWrapper>
          {/* Encabezado */}
          <View>
            <View className="flex-row justify-between items-center mb-2">
              <Text
                style={{ color: defaultColors.text }}
                className="text-2xl font-bold"
                numberOfLines={2}
              >
                {debt.name}
              </Text>

              {/* actions */}
              <View className="flex-row items-center gap-1">
                <TouchableOpacity disabled={loadingDelete} className="mx-1">
                  <MiniIconButton
                    iconColor={colors.darkMode.text.light}
                    style={{ backgroundColor: colors.background.dark.secondary }}
                    icon="add"
                    onPress={handleAddPayment}
                  />
                </TouchableOpacity>

                {!debt.businessFinalSale ? (
                  isAdminOrHasId(employee!, Number(debt.employee?.id ?? 0)) && (
                    <>
                      <TouchableOpacity disabled={loadingDelete} className="mx-1">
                        <MiniIconButton
                          iconColor={colors.darkMode.text.light}
                          style={{ backgroundColor: colors.background.dark.secondary }}
                          icon="pencil"
                          onPress={handleEdit}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity disabled={loadingDelete} className="mx-1">
                        <MiniIconButton
                          iconColor={colors.darkMode.text.light}
                          style={{ backgroundColor: colors.background.dark.secondary }}
                          icon="trash-outline"
                          onPress={handleDelete}
                        />
                      </TouchableOpacity>
                    </>
                  )
                ) : (
                  <MiniIconButton
                    iconColor={colors.darkMode.text.light}
                    style={{ backgroundColor: colors.background.dark.secondary }}
                    icon="lock-closed"
                    onPress={handleLock}
                  />
                )}
              </View>
            </View>
            <View className="flex-row items-center">
              <View
                className="px-3 py-1 rounded-full mr-2"
                style={{
                  backgroundColor: isPaid ? "#2ECC7120" : "#FFA50020",
                  borderWidth: 1,
                  borderColor: isPaid ? "#2ECC71" : "#FFA500"
                }}
              >
                <Text
                  style={{
                    color: isPaid ? "#2ECC71" : "#FFA500"
                  }}
                  className="text-xs font-medium"
                >
                  {isPaid ? "Pagada" : "Pendiente"}
                </Text>
              </View>
              <Text style={{ color: defaultColors.textSecondary }} className="text-sm">
                Creada el {format(createdAt, "d 'de' MMMM, yyyy", { locale: es })}
              </Text>
            </View>
          </View>

          {/* Información principal */}
          <View className="p-4 rounded-lg" style={{ backgroundColor: defaultColors.card }}>
            <View className="flex-row justify-between items-center mb-4">
              <Text style={{ color: defaultColors.text }} className="font-medium">
                Monto total
              </Text>
              <Text style={{ color: defaultColors.text }} className="text-lg font-bold">
                {formatCurrency(debt.total)}
              </Text>
            </View>

            <View className="flex-row justify-between items-center mb-4">
              <Text style={{ color: defaultColors.text }} className="font-medium">
                Pagado
              </Text>
              <Text style={{ color: colors.success.dark }} className="text-lg font-bold">
                {formatCurrency(debt.paid)}
              </Text>
            </View>

            <View className="flex-row justify-between items-center">
              <Text style={{ color: defaultColors.text }} className="font-medium">
                Saldo pendiente
              </Text>
              <Text
                style={{ color: isPaid ? colors.success.dark : colors.warning.dark }}
                className="text-lg font-bold"
              >
                {formatCurrency(remainingAmount)}
              </Text>
            </View>
          </View>

          {/* Descripción */}
          {debt.description && (
            <View className="p-4 rounded-lg" style={{ backgroundColor: defaultColors.card }}>
              <Text style={{ color: defaultColors.text }} className="font-medium mb-2">
                Descripción
              </Text>
              <Text style={{ color: defaultColors.textSecondary }} className="leading-5">
                {debt.description}
              </Text>
            </View>
          )}

          {/* Pagos realizados */}
          <View className="p-4 rounded-lg" style={{ backgroundColor: defaultColors.card }}>
            <Text style={{ color: defaultColors.text }} className="font-medium">
              Pagos realizados
            </Text>

            {loadingDebtPayments ? (
              <View className="items-center py-4">
                <ActivityIndicator size="small" color={defaultColors.primary} />
                <Text style={{ color: defaultColors.textSecondary }} className="mt-2">
                  Cargando pagos...
                </Text>
              </View>
            ) : debtPayments.length > 0 ? (
              debtPayments.map((payment, index) => (
                <View key={payment.id ?? index} className="mt-2">
                  <View className="flex-row justify-between items-center mb-1">
                    <Text style={{ color: defaultColors.text }} className="font-medium">
                      {formatCurrency(payment.amount)}
                    </Text>
                    <View className="flex-row items-center">
                      <Text style={{ color: defaultColors.textSecondary }} className="text-xs">
                        {payment.createdAt
                          ? format(new Date(payment.createdAt), "d MMM yyyy, HH:mm", { locale: es })
                          : "Fecha no disponible"}
                      </Text>
                      <TouchableOpacity disabled={loadingDelete} className="mx-1">
                        <MiniIconButton
                          iconColor={colors.darkMode.text.light}
                          style={{ backgroundColor: colors.background.dark.secondary }}
                          icon="eye-outline"
                          onPress={() => handleViewPayment(payment)}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ))
            ) : (
              <View>
                <Text style={{ color: defaultColors.textSecondary }} className="mt-2 text-sm">
                  No hay pagos registrados
                </Text>
              </View>
            )}
          </View>

          {/* Información adicional */}
          <View className="p-4 rounded-lg" style={{ backgroundColor: defaultColors.card }}>
            <Text style={{ color: defaultColors.text }} className="font-medium mb-4">
              Información adicional
            </Text>
            <View className="mb-3">
              <Text style={{ color: defaultColors.textSecondary }} className="mb-1">
                Registrado por
              </Text>
              <Text style={{ color: defaultColors.text }}>{employeeName}</Text>
            </View>
            {debt.updatedAt && (
              <View className="mb-3">
                <Text style={{ color: defaultColors.textSecondary }} className="mb-1">
                  Última actualización
                </Text>
                <Text style={{ color: defaultColors.text }}>
                  {format(new Date(debt.updatedAt), "d 'de' MMMM, yyyy 'a las' HH:mm", {
                    locale: es
                  })}
                </Text>
              </View>
            )}
            <View>
              <Text style={{ color: defaultColors.textSecondary }} className="mb-1">
                Reporte asociado
              </Text>
              {loadingBusinessFinalSale ? (
                <View className="flex-row items-center">
                  <ActivityIndicator size="small" color={defaultColors.primary} />
                  <Text style={{ color: defaultColors.text }} className="ml-2">
                    Cargando información del reporte...
                  </Text>
                </View>
              ) : businessFinalSale ? (
                <Text style={{ color: defaultColors.text }}>{businessFinalSale.name}</Text>
              ) : (
                <Text style={{ color: defaultColors.textSecondary }}>
                  No está asociada a ningún reporte
                </Text>
              )}
            </View>
          </View>
        </ContentWrapper>

        {/* Modal de edición */}
        <MyModal
          title="Editar Deuda"
          isVisible={editModalVisible}
          onClose={() => setEditModalVisible(false)}
        >
          {debt && <FormEditDebt debt={debt} setModalVisible={setEditModalVisible} />}
        </MyModal>

        {/* Modal para agregar pago */}
        <MyModal
          title="Agregar Pago"
          isVisible={addPaymentModalVisible}
          onClose={() => setAddPaymentModalVisible(false)}
        >
          <FormAddDebtPayment
            debtId={Number(id)}
            onClose={() => setAddPaymentModalVisible(false)}
            remainingAmount={remainingAmount}
          />
        </MyModal>

        {/* Modal para ver detalles del pago */}
        <MyModal
          title="Detalles del Pago"
          isVisible={viewPaymentModalVisible}
          onClose={() => setViewPaymentModalVisible(false)}
        >
          {selectedPayment && (
            <ViewDebtPaymentDetails
              payment={selectedPayment}
              onClose={() => setViewPaymentModalVisible(false)}
            />
          )}
        </MyModal>
      </MyScrollView>
    </GradientBackground>
  );
}
