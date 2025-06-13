import { Feather } from "@expo/vector-icons";
import { ContentWrapper } from "components/ContentWrapper";
import { InfoRow } from "components/ui/InfoRow";
import { CardItem } from "components/ui/items/CardItem.ui";
import { DebtItem } from "components/ui/items/DebtItem.ui";
import { MachineItem } from "components/ui/items/MachineItem.ui";
import { ServiceSaleItem } from "components/ui/items/ServiceSaleItem.ui";
import { WorkerItem } from "components/ui/items/WorkerItem.ui";
import { MyModal } from "components/ui/modals/myModal";
import MyButton from "components/ui/MyButton";
import { MyCard } from "components/ui/MyCard";
import { MyScrollView } from "components/ui/MyScrollView";
import { useDailyReportStore } from "features/sales/current_day/store/dailyReport.store";
import { useMachineStates } from "hooks/api/useMachineStates";
import useColors from "hooks/useColors";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { useBusinessStore } from "store/business.store";
import colors from "styles/colors";
import { formatCurrency } from "utilities/formatters";
import {
  calculateFinalCash,
  calculateSalaryFromReport,
  getTotalCards,
  getTotalDebts,
  getTotalServices,
  getWorkersAndSalaries
} from "utilities/helpers/businessFinalSale.utils";
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
    return getTotalCards(cards);
  }, [cards]);

  const totalSalary = useMemo(() => {
    return calculateSalaryFromReport(report);
  }, [report]);

  const workersAndSalaries = useMemo(() => {
    return getWorkersAndSalaries(report.workers, report.total || 0);
  }, [report.workers, report.total]);

  const totalDebts = useMemo(() => {
    return getTotalDebts(report.debts || []);
  }, [report.debts]);

  const totalServices = useMemo(() => {
    return getTotalServices(report.servicesSales || []);
  }, [report.servicesSales]);

  const fundDifference = useMemo(() => {
    return differenceBetweenFunds(todayMachineStates, lastMachineState);
  }, [todayMachineStates, lastMachineState]);

  const lastFund = useMemo(() => {
    return getTotalFundFromLastMachineState(todayMachineStates, lastMachineState);
  }, [todayMachineStates, lastMachineState]);

  const calculateCash = useCallback(() => {
    return calculateFinalCash({
      totalReport: report.total || 0,
      totalCards,
      totalDebts,
      totalSalary,
      fundsDifference: fundDifference
    });
  }, [report.total, totalCards, totalDebts, totalSalary, fundDifference]);

  return (
    <MyScrollView>
      <ContentWrapper>
        <View className="flex-row justify-between items-center">
          <Text style={{ color: colors.darkMode.text.light }} className="text-xl font-bold text-center">
            Resumen del Reporte Diario
          </Text>
          <TouchableOpacity
            onPress={() => setNoteModalVisible(true)}
            style={{ padding: 8 }}
            accessibilityLabel="Agregar nota al reporte"
            accessibilityRole="button"
          >
            <Feather name={report.note ? "edit-3" : "plus-circle"} size={24} color={colors.darkMode.text.light} />
          </TouchableOpacity>
        </View>

        <MyCard title="Información General">
          <InfoRow label="Negocio" value={business?.name || "Sin nombre"} />
          <InfoRow label="Fecha" value={new Date().toLocaleDateString()} />
          <InfoRow label="Total Ventas" value={formatCurrency(report.total ?? 0)} />
          <InfoRow label="Servicios" value={formatCurrency(totalServices)} />
          <InfoRow label="Fondo Hoy" value={formatCurrency(report.fund || 0)} />
          <InfoRow label="Fondo Anterior" value={formatCurrency(lastFund)} />
          {Boolean(report.note) && (
            <View className="mt-2 p-3 rounded-lg bg-black/10">
              <View className="flex-row items-center mb-1">
                <Feather name="file-text" size={16} color={colors.darkMode.text.light} />
                <Text style={{ color: colors.darkMode.text.light }} className="ml-2 font-medium">
                  Nota:
                </Text>
              </View>
              <Text style={{ color: colors.darkMode.text.light }}>{report.note}</Text>
            </View>
          )}
        </MyCard>

        <MyCard title="Desglose de efectivo">
          <InfoRow label="Total Efectivo" bold={true} value={formatCurrency(report.total ?? 0)} />
          <InfoRow label="Tarjetas" negative={true} error={true} value={formatCurrency(totalCards)} />
          <InfoRow label="Deudas" negative={true} error={true} value={formatCurrency(totalDebts)} />
          <InfoRow label="Salarios" negative={true} error={true} value={formatCurrency(totalSalary)} />
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
        </MyCard>

        {cards.length > 0 && (
          <MyCard title="Pagos con Tarjeta">
            {cards.map((card) => (
              <CardItem key={card.id} card={card} />
            ))}
          </MyCard>
        )}

        {report.debts?.length > 0 && (
          <MyCard title="Deudas Registradas">
            {report.debts.map((debt) => (
              <DebtItem key={debt.name + debt.total} debt={debt} />
            ))}
          </MyCard>
        )}

        {report.servicesSales?.length > 0 && (
          <MyCard title="Servicios Vendidos">
            {report.servicesSales.map((service) => (
              <ServiceSaleItem key={service.id} service={service} />
            ))}
          </MyCard>
        )}

        {report.workers?.length > 0 && (
          <MyCard title="Trabajadores y Salarios">
            {report.workers.map((worker) => (
              <WorkerItem key={worker.id} worker={worker} workersAndSalaries={workersAndSalaries} />
            ))}
          </MyCard>
        )}

        {report.machines?.length > 0 && (
          <MyCard title="Máquinas Utilizadas">
            {report.machines.map((machineId) => {
              // Aquí deberías obtener la información completa de la máquina si es necesario
              return <MachineItem key={machineId} machineId={machineId} />;
            })}
          </MyCard>
        )}

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
      </ContentWrapper>
    </MyScrollView>
  );
}
