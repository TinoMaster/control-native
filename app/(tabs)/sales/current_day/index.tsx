import { DailyReportCard } from "features/sales/components/dailyReportCard";
import { FloatingActionButton } from "components/floating-action-button";
import GenericList from "components/GenericList";
import LoadingPage from "components/ui/loaders/LoadingPage";
import { PageTitle } from "components/PageTitle";
import { useRouter } from "expo-router";
import { useBusinessFinalSale } from "hooks/api/useBusinessFinalSale";
import useColors from "hooks/useColors";
import { BusinessFinalSaleModelResponse } from "models/api/businessFinalSale.model";
import { StyleSheet, View, Text, TouchableOpacity, Modal } from "react-native";
import colors from "styles/colors";
import { useState, useMemo } from "react";
import { Feather } from "@expo/vector-icons";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Calendar } from "react-native-calendars";

export default function CurrentDay() {
  const defaultColors = useColors();
  const router = useRouter();
  const [showDatePicker, setShowDatePicker] = useState(false);

  const { selectedReports, loadingReports, selectedDate, setSelectedDate } = useBusinessFinalSale();

  console.log("selectedReports desde current day", selectedReports);

  // When the date changes in the calendar, update it in the hook
  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };

  const formattedDate = useMemo(() => {
    return format(selectedDate, "EEEE d 'de' MMMM 'de' yyyy", { locale: es });
  }, [selectedDate]);

  const formattedCalendarDate = useMemo(() => {
    return format(selectedDate, "yyyy-MM-dd");
  }, [selectedDate]);

  const isToday = useMemo(() => {
    const today = new Date();
    return (
      selectedDate.getDate() === today.getDate() &&
      selectedDate.getMonth() === today.getMonth() &&
      selectedDate.getFullYear() === today.getFullYear()
    );
  }, [selectedDate]);

  const handleDateSelect = (day: any) => {
    const newDate = new Date(day.dateString);
    handleDateChange(newDate);
    setShowDatePicker(false);
  };

  const renderReport = (report: BusinessFinalSaleModelResponse) => (
    <DailyReportCard
      report={report}
      onPress={() => {
        if (report.id) {
          router.push(`/(tabs)/sales/current_day/${report.id}` as any);
        }
      }}
    />
  );

  if (loadingReports) {
    return <LoadingPage />;
  }

  return (
    <View style={[styles.container, { backgroundColor: defaultColors.background }]}>
      <PageTitle title={isToday ? "Cuadres del día" : "Cuadres por fecha"} />

      <View style={styles.dateSelector}>
        <TouchableOpacity
          onPress={() => setShowDatePicker(true)}
          style={[styles.dateSelectorButton, { backgroundColor: defaultColors.background }]}
          accessibilityLabel="Seleccionar fecha para ver reportes"
          accessibilityRole="button"
        >
          <Feather name="calendar" size={18} color={defaultColors.primary} style={styles.calendarIcon} />
          <Text style={[styles.dateText, { color: defaultColors.text }]}>{formattedDate}</Text>
          <Feather name="chevron-down" size={18} color={defaultColors.textSecondary} />
        </TouchableOpacity>

        <Modal
          visible={showDatePicker}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setShowDatePicker(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={[styles.calendarContainer, { backgroundColor: defaultColors.background }]}>
              <View style={styles.calendarHeader}>
                <Text style={[styles.calendarTitle, { color: defaultColors.text }]}>Seleccionar fecha</Text>
                <TouchableOpacity onPress={() => setShowDatePicker(false)}>
                  <Feather name="x" size={24} color={defaultColors.text} />
                </TouchableOpacity>
              </View>
              <Calendar
                current={formattedCalendarDate}
                onDayPress={handleDateSelect}
                maxDate={format(new Date(), "yyyy-MM-dd")}
                markedDates={{
                  [formattedCalendarDate]: { selected: true, selectedColor: defaultColors.primary }
                }}
                theme={{
                  backgroundColor: defaultColors.background,
                  calendarBackground: defaultColors.background,
                  textSectionTitleColor: defaultColors.textSecondary,
                  selectedDayBackgroundColor: defaultColors.primary,
                  selectedDayTextColor: "#ffffff",
                  todayTextColor: defaultColors.primary,
                  dayTextColor: defaultColors.text,
                  textDisabledColor: defaultColors.textSecondary + "80",
                  monthTextColor: defaultColors.text,
                  indicatorColor: defaultColors.primary,
                  arrowColor: defaultColors.primary
                }}
              />
            </View>
          </View>
        </Modal>
      </View>

      <GenericList
        data={selectedReports ?? []}
        renderItem={renderReport}
        keyExtractor={(item) => item.id?.toString() ?? ""}
        emptyListMessage={
          isToday
            ? "No hay reportes registrados en el día de hoy"
            : `No hay reportes registrados para el ${format(selectedDate, "d 'de' MMMM", { locale: es })}`
        }
      />

      {isToday && (
        <FloatingActionButton
          onPress={() => router.push("/(tabs)/sales/current_day/create_report" as any)}
          backgroundColor={defaultColors.primary}
          iconColor={colors.darkMode.text.light}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  dateSelector: {
    paddingHorizontal: 16,
    marginBottom: 12
  },
  dateSelectorButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2
  },
  dateText: {
    flex: 1,
    fontSize: 16,
    fontWeight: "500",
    textTransform: "capitalize"
  },
  calendarIcon: {
    marginRight: 8
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 16
  },
  calendarContainer: {
    width: "100%",
    maxWidth: 350,
    borderRadius: 12,
    overflow: "hidden",
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  calendarHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16
  },
  calendarTitle: {
    fontSize: 18,
    fontWeight: "600"
  }
});
