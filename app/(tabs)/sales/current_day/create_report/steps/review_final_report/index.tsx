import { Feather } from "@expo/vector-icons";
import { InfoRow } from "components/ui/InfoRow";
import { CardItem } from "components/ui/items/CardItem.ui";
import { DebtItem } from "components/ui/items/DebtItem.ui";
import { MachineItem } from "components/ui/items/MachineItem.ui";
import { ServiceSaleItem } from "components/ui/items/ServiceSaleItem.ui";
import { WorkerItem } from "components/ui/items/WorkerItem.ui";
import { MyModal } from "components/ui/modals/myModal";
import MyButton from "components/ui/MyButton";
import { SectionCard } from "components/ui/SectionCard";
import { useMachineStates } from "hooks/api/useMachineStates";
import useColors from "hooks/useColors";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useBusinessStore } from "store/business.store";
import { useDailyReportStore } from "store/dailyReport.store";
import { calculateEmployeeSalaries } from "utilities/employee.utils";
import { formatCurrency } from "utilities/formatters";
import {
  adjustBrightness,
  differenceBetweenFunds,
  getTotalFundFromLastMachineState
} from "utilities/helpers/globals.helpers";

export default function ReviewFinalReport() {
  const report = useDailyReportStore((state) => state.report);
  const cards = useDailyReportStore((state) => state.cards);
  const todayMachineStates = useDailyReportStore((state) => state.machineStates);
  const business = useBusinessStore((state) => state.business);
  const setNote = useDailyReportStore((state) => state.setNote);

  const { lastMachineState } = useMachineStates();

  const [noteModalVisible, setNoteModalVisible] = useState(false);
  const [noteText, setNoteText] = useState("");
  const [totalSalaries, setTotalSalaries] = useState(0);
  const defaultColors = useColors();

  // Inicializar el texto de la nota con el valor existente en el reporte
  useEffect(() => {
    if (report.note) {
      setNoteText(report.note);
    }
  }, [report.note]);

  const handleSaveNote = () => {
    setNote(noteText);
    setNoteModalVisible(false);
  };

  const totalCards = useMemo(() => {
    return cards.reduce((acc, card) => acc + card.amount, 0);
  }, [cards]);

  const workersAndSalaries = useMemo(() => {
    // Calcular salarios usando la nueva utilidad
    const salaryCalculation = calculateEmployeeSalaries(report.workers, report.total || 0);

    console.log("salaryCalculation", salaryCalculation);

    // Convertir al formato requerido por el componente
    const workers = salaryCalculation.employees.reduce((acc, worker) => {
      acc[worker.name] = worker.salary;
      return acc;
    }, {} as Record<string, number>);

    setTotalSalaries(salaryCalculation.totalSalaries);
    return workers;
  }, [report.workers, report.total]);

  const totalDebts = useMemo(() => {
    return report.debts?.reduce((acc, debt) => acc + debt.total, 0) || 0;
  }, [report.debts]);

  const totalServices = useMemo(() => {
    return report.servicesSales?.reduce((acc, service) => acc + service.service.price * service.quantity, 0) || 0;
  }, [report.servicesSales]);

  const fundDifference = useMemo(() => {
    return differenceBetweenFunds(todayMachineStates, lastMachineState);
  }, [todayMachineStates, lastMachineState]);

  const lastFund = useMemo(() => {
    return getTotalFundFromLastMachineState(todayMachineStates, lastMachineState);
  }, [todayMachineStates, lastMachineState]);

  const calculateCash = useCallback(() => {
    // Efectivo = Total - (Tarjetas + Deudas + Salarios) + fundDifference
    // Si fundDifference es positivo, sumarlo; si es negativo, se restar  automaticamente
    return (report.total || 0) - (totalCards + totalDebts + totalSalaries) + fundDifference;
  }, [report.total, totalCards, totalDebts, totalSalaries, fundDifference]);

  return (
    <ScrollView className="flex-1" style={{ paddingHorizontal: 16 }}>
      <View className="py-1">
        <View className="flex-row justify-between items-center mb-6">
          <Text style={{ color: defaultColors.text }} className="text-xl font-bold text-center">
            Resumen del Reporte Diario
          </Text>
          <TouchableOpacity
            onPress={() => setNoteModalVisible(true)}
            style={{ padding: 8 }}
            accessibilityLabel="Agregar nota al reporte"
            accessibilityRole="button"
          >
            <Feather name={report.note ? "edit-3" : "plus-circle"} size={24} color={defaultColors.primary} />
          </TouchableOpacity>
        </View>

        {/* Modal para agregar/editar nota */}
        <MyModal
          isVisible={noteModalVisible}
          onClose={() => setNoteModalVisible(false)}
          title={report.note ? "Editar nota" : "Agregar nota"}
          footerContent={
            <View style={{ flexDirection: "row", justifyContent: "flex-end", gap: 8 }}>
              <MyButton label="Cancelar" onPress={() => setNoteModalVisible(false)} />
              <MyButton label="Guardar" onPress={handleSaveNote} />
            </View>
          }
        >
          <TextInput
            style={{
              borderColor: defaultColors.textSecondary,
              borderWidth: 1,
              borderRadius: 8,
              padding: 12,
              color: defaultColors.text,
              backgroundColor: adjustBrightness(defaultColors.background, 10),
              height: 120,
              textAlignVertical: "top"
            }}
            multiline
            value={noteText}
            onChangeText={setNoteText}
            placeholder="Escribe una nota para el reporte..."
            placeholderTextColor={defaultColors.textSecondary}
            accessibilityLabel="Campo de texto para nota"
          />
        </MyModal>

        <SectionCard title="Información General">
          <InfoRow label="Negocio" value={business?.name || "Sin nombre"} />
          <InfoRow label="Fecha" value={new Date().toLocaleDateString()} />
          <InfoRow label="Total Ventas" value={formatCurrency(report.total ?? 0)} />
          <InfoRow label="Servicios" value={formatCurrency(totalServices)} />
          <InfoRow label="Fondo Hoy" value={formatCurrency(report.fund || 0)} />
          <InfoRow label="Fondo Anterior" value={formatCurrency(lastFund)} />
          {Boolean(report.note) && (
            <View
              style={{ backgroundColor: adjustBrightness(defaultColors.background, 10) }}
              className="mt-2 p-3 rounded-lg"
            >
              <View className="flex-row items-center mb-1">
                <Feather name="file-text" size={16} color={defaultColors.primary} />
                <Text style={{ color: defaultColors.text }} className="ml-2 font-medium">
                  Nota:
                </Text>
              </View>
              <Text style={{ color: defaultColors.text }}>{report.note}</Text>
            </View>
          )}
        </SectionCard>

        <SectionCard title="Desglose de efectivo">
          <InfoRow label="Total Efectivo" bold={true} value={formatCurrency(report.total ?? 0)} />
          <InfoRow label="Tarjetas" negative={true} error={true} value={formatCurrency(totalCards)} />
          <InfoRow label="Deudas" negative={true} error={true} value={formatCurrency(totalDebts)} />
          <InfoRow label="Salarios" negative={true} error={true} value={formatCurrency(totalSalaries)} />
          <InfoRow
            label="Diferencia entre fondos (hoy - anterior)"
            positive={fundDifference > 0}
            success={fundDifference > 0}
            error={fundDifference < 0}
            value={formatCurrency(fundDifference)}
          />
          <InfoRow
            label="Efectivo"
            positive={calculateCash() > 0}
            negative={calculateCash() < 0}
            success={calculateCash() > 0}
            error={calculateCash() < 0}
            bold={true}
            value={formatCurrency(calculateCash())}
          />
        </SectionCard>

        {cards.length > 0 && (
          <SectionCard title="Pagos con Tarjeta">
            {cards.map((card) => (
              <CardItem key={card.id} card={card} />
            ))}
          </SectionCard>
        )}

        {report.debts?.length > 0 && (
          <SectionCard title="Deudas Registradas">
            {report.debts.map((debt) => (
              <DebtItem key={crypto.randomUUID()} debt={debt} />
            ))}
          </SectionCard>
        )}

        {report.servicesSales?.length > 0 && (
          <SectionCard title="Servicios Vendidos">
            {report.servicesSales.map((service) => (
              <ServiceSaleItem key={service.id} service={service} />
            ))}
          </SectionCard>
        )}

        {report.workers?.length > 0 && (
          <SectionCard title="Trabajadores y Salarios">
            {report.workers.map((worker) => (
              <WorkerItem key={worker.id} worker={worker} workersAndSalaries={workersAndSalaries} />
            ))}
          </SectionCard>
        )}

        {report.machines?.length > 0 && (
          <SectionCard title="Máquinas Utilizadas">
            {report.machines.map((machineId) => {
              // Aquí deberías obtener la información completa de la máquina si es necesario
              return <MachineItem key={machineId} machineId={machineId} />;
            })}
          </SectionCard>
        )}
      </View>
    </ScrollView>
  );
}
