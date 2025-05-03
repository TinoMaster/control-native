import { Feather } from "@expo/vector-icons";
import { MyModal } from "components/ui/modals/myModal";
import MyButton from "components/ui/MyButton";
import useColors from "hooks/useColors";
import { CardPayment } from "models/api/businessFinalSale.model";
import { DebtModel } from "models/api/debt.model";
import { EmployeeModel } from "models/api/employee.model";
import { ServiceSaleModel } from "models/api/serviceSale.model";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useBusinessStore } from "store/business.store";
import { useDailyReportStore } from "store/dailyReport.store";
import { formatCurrency } from "utilities/formatters";
import { adjustBrightness } from "utilities/helpers/globals.helpers";

interface SectionProps {
  readonly title: string;
  readonly children: React.ReactNode;
}

function Section({ title, children }: SectionProps) {
  const colors = useColors();

  return (
    <View
      style={{ backgroundColor: adjustBrightness(colors.background, 20) }}
      className="mb-4 p-4 rounded-lg shadow-sm"
    >
      <Text
        style={{ color: colors.text }}
        className="text-lg font-semibold mb-2 border-b border-gray-200 dark:border-gray-700 pb-2"
      >
        {title}
      </Text>
      {children}
    </View>
  );
}

function InfoRow({ label, value }: { readonly label: string; readonly value: string | number }) {
  const colors = useColors();

  return (
    <View
      style={{ backgroundColor: adjustBrightness(colors.background, 20) }}
      className="flex-row justify-between py-2"
    >
      <Text style={{ color: colors.text }} className="font-medium">
        {label}
      </Text>
      <Text style={{ color: colors.text }}>{value}</Text>
    </View>
  );
}

function CardItem({ card }: { readonly card: CardPayment }) {
  const colors = useColors();

  return (
    <View
      style={{ backgroundColor: adjustBrightness(colors.background, 20) }}
      className="flex-row justify-between items-center py-2"
    >
      <View>
        <Text style={{ color: colors.text }} className="font-medium">
          Tarjeta {card.cardNumber}
        </Text>
      </View>
      <Text style={{ color: colors.text }} className="font-semibold">
        {formatCurrency(card.amount)}
      </Text>
    </View>
  );
}

function ServiceItem({ service }: { readonly service: ServiceSaleModel }) {
  const colors = useColors();

  return (
    <View style={{ backgroundColor: adjustBrightness(colors.background, 20) }} className="py-2">
      <View className="flex-row justify-between">
        <Text style={{ color: colors.text }} className="font-medium">
          {service.service.name}
        </Text>
        <Text style={{ color: colors.text }} className="font-semibold">
          {formatCurrency(service.service.price * service.quantity)}
        </Text>
      </View>
      <View className="flex-row justify-between mt-1">
        <Text style={{ color: colors.textSecondary }} className="text-sm">
          {service.employee.user.name}
        </Text>
        <Text style={{ color: colors.textSecondary }} className="text-sm">
          Cantidad: {service.quantity}
        </Text>
      </View>
    </View>
  );
}

function DebtItem({ debt }: { readonly debt: DebtModel }) {
  const colors = useColors();

  return (
    <View style={{ backgroundColor: adjustBrightness(colors.background, 20) }} className="py-2">
      <View className="flex-row justify-between">
        <Text style={{ color: colors.text }} className="font-medium">
          {debt.name}
        </Text>
        <Text style={{ color: colors.text }} className="font-semibold">
          {formatCurrency(debt.total)}
        </Text>
      </View>
      {debt.description && (
        <Text style={{ color: colors.textSecondary }} className="text-sm mt-1">
          {debt.description}
        </Text>
      )}
    </View>
  );
}

function WorkerItem({ worker }: { readonly worker: EmployeeModel }) {
  const colors = useColors();

  return (
    <View style={{ backgroundColor: adjustBrightness(colors.background, 20) }} className="py-2 ">
      <Text style={{ color: colors.text }} className="font-medium">
        {worker.user.name}
      </Text>
    </View>
  );
}

function MachineItem({ machineId }: { readonly machineId: number }) {
  const colors = useColors();
  const business = useBusinessStore((state) => state.business);
  const { machines } = business;

  return (
    <View style={{ backgroundColor: adjustBrightness(colors.background, 20) }} className="py-2">
      <Text style={{ color: colors.text }} className="font-medium">
        {machines?.find((machine) => machine.id === machineId)?.name}
      </Text>
    </View>
  );
}

export default function ReviewFinalReport() {
  const report = useDailyReportStore((state) => state.report);
  const cards = useDailyReportStore((state) => state.cards);
  const business = useBusinessStore((state) => state.business);
  const colors = useColors();
  const setNote = useDailyReportStore((state) => state.setNote);

  const [noteModalVisible, setNoteModalVisible] = useState(false);
  const [noteText, setNoteText] = useState("");

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

  const totalDebts = useMemo(() => {
    return report.debts?.reduce((acc, debt) => acc + debt.total, 0) || 0;
  }, [report.debts]);

  const totalServices = useMemo(() => {
    return report.servicesSales?.reduce((acc, service) => acc + service.service.price * service.quantity, 0) || 0;
  }, [report.servicesSales]);

  const calculateCash = useCallback(() => {
    // Efectivo = Total - (Tarjetas + Deudas)
    return (report.total || 0) - (totalCards + totalDebts);
  }, [report.total, totalCards, totalDebts]);

  return (
    <ScrollView className="flex-1" style={{ paddingHorizontal: 16 }}>
      <View className="py-1">
        <View className="flex-row justify-between items-center mb-6">
          <Text style={{ color: colors.text }} className="text-xl font-bold text-center">
            Resumen del Reporte Diario
          </Text>
          <TouchableOpacity
            onPress={() => setNoteModalVisible(true)}
            style={{ padding: 8 }}
            accessibilityLabel="Agregar nota al reporte"
            accessibilityRole="button"
          >
            <Feather name={report.note ? "edit-3" : "plus-circle"} size={24} color={colors.primary} />
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
              borderColor: colors.textSecondary,
              borderWidth: 1,
              borderRadius: 8,
              padding: 12,
              color: colors.text,
              backgroundColor: adjustBrightness(colors.background, 10),
              height: 120,
              textAlignVertical: "top"
            }}
            multiline
            value={noteText}
            onChangeText={setNoteText}
            placeholder="Escribe una nota para el reporte..."
            placeholderTextColor={colors.textSecondary}
            accessibilityLabel="Campo de texto para nota"
          />
        </MyModal>

        <Section title="Información General">
          <InfoRow label="Negocio" value={business?.name || "Sin nombre"} />
          <InfoRow label="Fecha" value={new Date().toLocaleDateString()} />
          <InfoRow label="Total Ventas" value={formatCurrency(report.total ?? 0)} />
          <InfoRow label="Fondo Inicial" value={formatCurrency(report.fund || 0)} />
          {Boolean(report.note) && (
            <View style={{ backgroundColor: adjustBrightness(colors.background, 10) }} className="mt-2 p-3 rounded-lg">
              <View className="flex-row items-center mb-1">
                <Feather name="file-text" size={16} color={colors.primary} />
                <Text style={{ color: colors.text }} className="ml-2 font-medium">
                  Nota:
                </Text>
              </View>
              <Text style={{ color: colors.text }}>{report.note}</Text>
            </View>
          )}
        </Section>

        <Section title="Desglose de Ingresos">
          <InfoRow label="Efectivo" value={formatCurrency(calculateCash())} />
          <InfoRow label="Tarjetas" value={formatCurrency(totalCards)} />
          <InfoRow label="Deudas" value={formatCurrency(totalDebts)} />
          <InfoRow label="Servicios" value={formatCurrency(totalServices)} />
        </Section>

        {cards.length > 0 && (
          <Section title="Pagos con Tarjeta">
            {cards.map((card) => (
              <CardItem key={card.id} card={card} />
            ))}
          </Section>
        )}

        {report.debts?.length > 0 && (
          <Section title="Deudas Registradas">
            {report.debts.map((debt) => (
              <DebtItem key={debt.id} debt={debt} />
            ))}
          </Section>
        )}

        {report.servicesSales?.length > 0 && (
          <Section title="Servicios Vendidos">
            {report.servicesSales.map((service) => (
              <ServiceItem key={service.id} service={service} />
            ))}
          </Section>
        )}

        {report.workers?.length > 0 && (
          <Section title="Trabajadores">
            {report.workers.map((worker) => (
              <WorkerItem key={worker.id} worker={worker} />
            ))}
          </Section>
        )}

        {report.machines?.length > 0 && (
          <Section title="Máquinas Utilizadas">
            {report.machines.map((machineId) => {
              // Aquí deberías obtener la información completa de la máquina si es necesario
              return <MachineItem key={machineId} machineId={machineId} />;
            })}
          </Section>
        )}
      </View>
    </ScrollView>
  );
}
