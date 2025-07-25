import { Feather } from "@expo/vector-icons";
import { ContentWrapper } from "components/ContentWrapper";
import { GradientBackground } from "components/ui/backgrounds/GradientBackground";
import { CustomHeader } from "components/ui/CustomHeader";
import LoadingPage from "components/ui/loaders/LoadingPage";
import { MyScrollView } from "components/ui/MyScrollView";
import { MONTHS } from "data/global.data";
import { ModalMonthPicker } from "features/sales/list/components/ModalMonthPicker";
import { ModalYearPicker } from "features/sales/list/components/ModalYearPicker";
import { SalesGroupByDay } from "features/sales/list/components/SalesGroupByDay";
import { useMonthlySales } from "hooks/api/useMonthlySales";
import useColors from "hooks/useColors";
import { useMemo, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { groupSalesByDay } from "utilities/helpers/globals.helpers";

export default function List() {
  const [showMonthPicker, setShowMonthPicker] = useState(false);
  const [showYearPicker, setShowYearPicker] = useState(false);
  const defaultColors = useColors();

  const { monthlyReports, loadingMonthlyReports, selectedMonth, selectedYear, updateMonthAndYear } =
    useMonthlySales();

  // Format the selected month and year for display
  const formattedMonthYear = useMemo(() => {
    return `${MONTHS[selectedMonth]} ${selectedYear}`;
  }, [selectedMonth, selectedYear]);

  // Handle month selection
  const handleMonthSelect = (month: number) => {
    updateMonthAndYear(month, selectedYear);
    setShowMonthPicker(false);
  };

  // Handle year selection
  const handleYearSelect = (year: number) => {
    updateMonthAndYear(selectedMonth, year);
    setShowYearPicker(false);
  };

  // Group sales by day
  const groupedSales = useMemo(() => {
    return groupSalesByDay(monthlyReports ?? []);
  }, [monthlyReports]);

  if (loadingMonthlyReports) {
    return <LoadingPage />;
  }

  return (
    <GradientBackground>
      <CustomHeader title="Ventas por mes" />

      <ContentWrapper>
        <View style={styles.selectors}>
          {/* Month Selector */}
          <TouchableOpacity
            onPress={() => setShowMonthPicker(true)}
            style={[styles.selectorButton, { backgroundColor: defaultColors.background }]} // defaultColors.background.dark.secondary
            accessibilityLabel="Seleccionar mes para ver reportes"
            accessibilityRole="button"
          >
            <Feather name="calendar" size={18} color={defaultColors.primary} style={styles.icon} />
            <Text style={[styles.selectorText, { color: defaultColors.text }]}>
              {MONTHS[selectedMonth - 1]}
            </Text>
            <Feather name="chevron-down" size={18} color={defaultColors.text} />
          </TouchableOpacity>

          {/* Year Selector */}
          <TouchableOpacity
            onPress={() => setShowYearPicker(true)}
            style={[styles.selectorButton, { backgroundColor: defaultColors.background }]} // defaultColors.background.dark.secondary
            accessibilityLabel="Seleccionar año para ver reportes"
            accessibilityRole="button"
          >
            <Feather name="calendar" size={18} color={defaultColors.primary} style={styles.icon} />
            <Text style={[styles.selectorText, { color: defaultColors.text }]}>{selectedYear}</Text>
            <Feather name="chevron-down" size={18} color={defaultColors.text} />
          </TouchableOpacity>
        </View>

        {groupedSales.length > 0 ? (
          <MyScrollView style={{ gap: 10 }}>
            {groupedSales.map((group) => (
              <SalesGroupByDay key={group.date} date={group.date} reports={group.reports} />
            ))}
          </MyScrollView>
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={[styles.emptyText, { color: defaultColors.text }]}>
              No hay reportes registrados para {formattedMonthYear}
            </Text>
          </View>
        )}
      </ContentWrapper>

      {/* Month Picker Modal */}
      <ModalMonthPicker
        showMonthPicker={showMonthPicker}
        setShowMonthPicker={setShowMonthPicker}
        selectedMonth={selectedMonth}
        handleMonthSelect={handleMonthSelect}
      />

      {/* Year Picker Modal */}
      <ModalYearPicker
        showYearPicker={showYearPicker}
        setShowYearPicker={setShowYearPicker}
        selectedYear={selectedYear}
        handleYearSelect={handleYearSelect}
      />
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 16
  },
  selectors: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12
  },
  selectorButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    flex: 0.48
  },
  selectorText: {
    flex: 1,
    fontSize: 16,
    fontWeight: "500"
  },
  icon: {
    marginRight: 8
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 16
  },
  pickerContainer: {
    width: "100%",
    maxWidth: 350,
    borderRadius: 12,
    overflow: "hidden",
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    maxHeight: "80%"
  },
  pickerHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16
  },
  pickerTitle: {
    fontSize: 18,
    fontWeight: "600"
  },
  pickerItem: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 4
  },
  pickerItemText: {
    fontSize: 16
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20
  },
  emptyText: {
    fontSize: 16,
    textAlign: "center"
  }
});
