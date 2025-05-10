import { Feather } from "@expo/vector-icons";
import { ActionButtons } from "components/ActionButtons";
import { BackButtonPlusTitle } from "components/BackButtonPlusTitle";
import { InfoRow } from "components/ui/InfoRow";
import { CardItem } from "components/ui/items/CardItem.ui";
import { DebtItem } from "components/ui/items/DebtItem.ui";
import { MachineItem } from "components/ui/items/MachineItem.ui";
import { ServiceSaleItem } from "components/ui/items/ServiceSaleItem.ui";
import LoadingPage from "components/ui/loaders/LoadingPage";
import { MyCard } from "components/ui/MyCard";
import { useNotification } from "contexts/NotificationContext";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useBusinessFinalSaleByMonth } from "hooks/api/useBusinessFinalSaleByMonth";
import { useCurrentBusinessFinalSale } from "hooks/api/useCurrentBusinessFinalSale";
import useColors from "hooks/useColors";
import { CardPayment } from "models/api/businessFinalSale.model";
import { EmployeeModel } from "models/api/employee.model";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useBusinessStore } from "store/business.store";
import colors from "styles/colors";
import { calculateEmployeeSalaries } from "utilities/employee.utils";
import { formatCurrency } from "utilities/formatters";
import { adjustBrightness } from "utilities/helpers/globals.helpers";

// Componente para mostrar un elemento de trabajador
function WorkerItem({ worker, salary }: { readonly worker: EmployeeModel; readonly salary: number }) {
  const defaultColors = useColors();

  return (
    <View className="flex-row justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
      <Text style={{ color: defaultColors.text }} className="font-medium">
        {worker.user.name}
      </Text>
      <Text style={{ color: defaultColors.primary }} className="font-medium">
        {formatCurrency(salary)}
      </Text>
    </View>
  );
}

export default function DailyReportDetailScreen() {
  const { id } = useLocalSearchParams();
  const defaultColors = useColors();
  const router = useRouter();
  const { showNotification } = useNotification();
  const { todayReports, loadingReports, deleteBusinessFinalSale } = useCurrentBusinessFinalSale();
  const { monthlySales, loadingSales } = useBusinessFinalSaleByMonth();
  const business = useBusinessStore((state) => state.business);

  if (loadingReports || loadingSales) {
    return <LoadingPage message="Cargando detalles del reporte..." />;
  }

  const report =
    todayReports?.find((r: any) => r.id === Number(id)) || monthlySales?.find((r: any) => r.id === Number(id));

  const cards: CardPayment[] =
    report?.cards.map((card) => ({
      cardNumber: card.number,
      amount: card.amount,
      id: card.id ?? ""
    })) || [];

  if (!report) {
    showNotification("Reporte no encontrado", "error");
    router.back();
    return null;
  }

  // Calcular totales
  const totalCards = report.cards.reduce((acc, card) => acc + card.amount, 0);
  const totalDebts = report.debts.reduce((acc, debt) => acc + debt.total, 0);

  // Calcular salarios
  const salaryCalculation = calculateEmployeeSalaries(report.workers, report.total || 0);
  const totalSalaries = salaryCalculation.totalSalaries;

  // Convertir al formato requerido por el componente
  const workersAndSalaries = salaryCalculation.employees.reduce((acc, worker) => {
    acc[worker.name] = worker.salary;
    return acc;
  }, {} as Record<string, number>);

  // Calcular servicios
  const totalServices = report.servicesSales.reduce(
    (acc, service) => acc + service.service.price * service.quantity,
    0
  );

  // Calcular efectivo
  const calculateCash = () => {
    // Efectivo = Total - (Tarjetas + Deudas + Salarios)
    return (report.total || 0) - (totalCards + totalDebts + totalSalaries);
  };

  const handleDeleteReport = () => {
    if (report.id) {
      deleteBusinessFinalSale(report.id, {
        onSuccess: () => {
          showNotification("Reporte eliminado correctamente", "success");
          router.back();
        },
        onError: () => {
          showNotification("Error al eliminar el reporte", "error");
        }
      });
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: defaultColors.background }]}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <BackButtonPlusTitle title="Detalles del Reporte" />

        <View className="p-4 gap-4">
          {/* Información Principal */}
          <MyCard title="Información Principal" iconTitle="receipt-outline">
            <Text style={[styles.reportName, { color: defaultColors.text }]}>{report.name}</Text>
            <Text style={[styles.price, { color: defaultColors.primary }]}>{formatCurrency(report.total)}</Text>
            <Text style={[styles.date, { color: defaultColors.textSecondary }]}>
              {new Date(report.createdAt || new Date()).toLocaleDateString()}
            </Text>
            {Boolean(report.note) && (
              <View style={[styles.noteContainer, { backgroundColor: adjustBrightness(defaultColors.background, 10) }]}>
                <View style={styles.noteHeader}>
                  <Feather name="file-text" size={16} color={defaultColors.primary} />
                  <Text style={[styles.noteTitle, { color: defaultColors.text }]}>Nota:</Text>
                </View>
                <Text style={[styles.noteText, { color: defaultColors.text }]}>{report.note}</Text>
              </View>
            )}
          </MyCard>

          {/* Desglose de Efectivo */}
          <MyCard title="Desglose de Efectivo" iconTitle="cash-outline">
            <InfoRow label="Total Efectivo" bold={true} value={formatCurrency(report.total)} />
            <InfoRow label="Tarjetas" negative={true} error={true} value={formatCurrency(totalCards)} />
            <InfoRow label="Deudas" negative={true} error={true} value={formatCurrency(totalDebts)} />
            <InfoRow label="Salarios" negative={true} error={true} value={formatCurrency(totalSalaries)} />
            <InfoRow
              label="Efectivo Final"
              positive={calculateCash() > 0}
              negative={calculateCash() < 0}
              success={calculateCash() > 0}
              error={calculateCash() < 0}
              bold={true}
              value={formatCurrency(calculateCash())}
            />
          </MyCard>

          {/* Servicios Vendidos */}
          {report.servicesSales.length > 0 && (
            <MyCard title="Servicios Vendidos" iconTitle="cash-outline">
              {report.servicesSales.map((service) => (
                <ServiceSaleItem key={service.id} service={service} />
              ))}
              <View style={styles.totalRow}>
                <Text style={[styles.totalLabel, { color: defaultColors.text }]}>Total Servicios:</Text>
                <Text style={[styles.totalValue, { color: defaultColors.primary }]}>
                  {formatCurrency(totalServices)}
                </Text>
              </View>
            </MyCard>
          )}

          {/* Pagos con Tarjeta */}
          {cards.length > 0 && (
            <MyCard title="Pagos con Tarjeta" iconTitle="card-outline">
              {cards.map((card) => (
                <CardItem key={card.id} card={card} />
              ))}
              <View style={styles.totalRow}>
                <Text style={[styles.totalLabel, { color: defaultColors.text }]}>Total Tarjetas:</Text>
                <Text style={[styles.totalValue, { color: defaultColors.primary }]}>{formatCurrency(totalCards)}</Text>
              </View>
            </MyCard>
          )}

          {/* Deudas Registradas */}
          {report.debts.length > 0 && (
            <MyCard title="Deudas Registradas" iconTitle="file-tray-full">
              {report.debts.map((debt) => (
                <DebtItem key={debt.id} debt={debt} />
              ))}
              <View style={styles.totalRow}>
                <Text style={[styles.totalLabel, { color: defaultColors.text }]}>Total Deudas:</Text>
                <Text style={[styles.totalValue, { color: colors.error.light }]}>{formatCurrency(totalDebts)}</Text>
              </View>
            </MyCard>
          )}

          {/* Trabajadores y Salarios */}
          {report.workers.length > 0 && (
            <MyCard title="Trabajadores y Salarios" iconTitle="people-outline">
              {report.workers.map((worker) => (
                <WorkerItem key={worker.id} worker={worker} salary={workersAndSalaries[worker.user.name] || 0} />
              ))}
              <View style={styles.totalRow}>
                <Text style={[styles.totalLabel, { color: defaultColors.text }]}>Total Salarios:</Text>
                <Text style={[styles.totalValue, { color: defaultColors.primary }]}>
                  {formatCurrency(totalSalaries)}
                </Text>
              </View>
            </MyCard>
          )}

          {/* Máquinas Utilizadas */}
          {report.machines.length > 0 && (
            <MyCard title="Máquinas Utilizadas" iconTitle="desktop-outline">
              {report.machines.map((machine) => (
                <MachineItem key={machine.id} machine={machine} />
              ))}
            </MyCard>
          )}

          {/* Información Adicional */}
          <MyCard title="Información Adicional" iconTitle="information-circle-outline">
            <Text style={[styles.infoText, { color: defaultColors.textSecondary }]}>ID del Reporte: {report.id}</Text>
            <Text style={[styles.infoText, { color: defaultColors.textSecondary }]}>
              Negocio: {business?.name || "Sin nombre"}
            </Text>
            {report.createdAt && (
              <Text style={[styles.infoText, { color: defaultColors.textSecondary }]}>
                Creado: {new Date(report.createdAt).toLocaleString()}
              </Text>
            )}
            {report.updatedAt && (
              <Text style={[styles.infoText, { color: defaultColors.textSecondary }]}>
                Última actualización: {new Date(report.updatedAt).toLocaleString()}
              </Text>
            )}
          </MyCard>
        </View>
      </ScrollView>

      {/* Botones de Acción */}
      <ActionButtons
        buttons={[
          {
            icon: "trash-outline",
            color: colors.error.light,
            onPress: handleDeleteReport,
            label: "Eliminar"
          }
        ]}
        fixed={true}
      />
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
  reportName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8
  },
  price: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8
  },
  date: {
    fontSize: 14,
    marginBottom: 16
  },
  noteContainer: {
    marginTop: 12,
    padding: 12,
    borderRadius: 8
  },
  noteHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4
  },
  noteTitle: {
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 6
  },
  noteText: {
    fontSize: 14,
    lineHeight: 20
  },
  infoText: {
    fontSize: 14,
    marginBottom: 8
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "rgba(0,0,0,0.1)"
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: "600"
  },
  totalValue: {
    fontSize: 16,
    fontWeight: "600"
  }
});
