import { Feather } from "@expo/vector-icons";
import { PageTitle } from "components/PageTitle";
import LoadingPage from "components/ui/loaders/LoadingPage";
import { MONTHS } from "data/global.data";
import { ModalMonthPicker } from "features/sales/components/list/ModalMonthPicker";
import { ModalYearPicker } from "features/sales/components/list/ModalYearPicker";
import { SalesGroupByDay } from "features/sales/components/SalesGroupByDay";
import { QueryTypeBusinessFinalSale, useBusinessFinalSale } from "hooks/api/useBusinessFinalSale";
import useColors from "hooks/useColors";
import { useMemo, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { adjustBrightness, groupSalesByDay } from "utilities/helpers/globals.helpers";

export default function List() {
  const defaultColors = useColors();
  const [showMonthPicker, setShowMonthPicker] = useState(false);
  const [showYearPicker, setShowYearPicker] = useState(false);

  const { reports, loadingReports, selectedMonth, selectedYear, updateMonthAndYear } = useBusinessFinalSale(
    QueryTypeBusinessFinalSale.MONTHLY
  );

  // Format the selected month and year for display
  const formattedMonthYear = useMemo(() => {
    return `${MONTHS[selectedMonth - 1]} ${selectedYear}`;
  }, [selectedMonth, selectedYear]);

  // Handle month selection
  const handleMonthSelect = (month: number) => {
    console.log(month);
    updateMonthAndYear(month, selectedYear);
    setShowMonthPicker(false);
  };

  // Handle year selection
  const handleYearSelect = (year: number) => {
    console.log(year);
    updateMonthAndYear(selectedMonth, year);
    setShowYearPicker(false);
  };

  // Group sales by day
  const groupedSales = useMemo(() => {
    return groupSalesByDay(reports ?? []);
  }, [reports]);

  if (loadingReports) {
    return <LoadingPage />;
  }

  return (
    <View style={[styles.container, { backgroundColor: defaultColors.background }]}>
      <PageTitle title="Ventas por mes" />

      <View style={styles.selectors}>
        {/* Month Selector */}
        <TouchableOpacity
          onPress={() => setShowMonthPicker(true)}
          style={[styles.selectorButton, { backgroundColor: adjustBrightness(defaultColors.background, 20) }]}
          accessibilityLabel="Seleccionar mes para ver reportes"
          accessibilityRole="button"
        >
          <Feather name="calendar" size={18} color={defaultColors.primary} style={styles.icon} />
          <Text style={[styles.selectorText, { color: defaultColors.text }]}>{MONTHS[selectedMonth - 1]}</Text>
          <Feather name="chevron-down" size={18} color={defaultColors.textSecondary} />
        </TouchableOpacity>

        {/* Year Selector */}
        <TouchableOpacity
          onPress={() => setShowYearPicker(true)}
          style={[styles.selectorButton, { backgroundColor: adjustBrightness(defaultColors.background, 20) }]}
          accessibilityLabel="Seleccionar año para ver reportes"
          accessibilityRole="button"
        >
          <Feather name="calendar" size={18} color={defaultColors.primary} style={styles.icon} />
          <Text style={[styles.selectorText, { color: defaultColors.text }]}>{selectedYear}</Text>
          <Feather name="chevron-down" size={18} color={defaultColors.textSecondary} />
        </TouchableOpacity>
      </View>

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

      {groupedSales.length > 0 ? (
        <ScrollView style={styles.scrollContainer}>
          {groupedSales.map((group) => (
            <SalesGroupByDay key={group.date} date={group.date} reports={group.reports} />
          ))}
        </ScrollView>
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={[styles.emptyText, { color: defaultColors.text }]}>
            No hay reportes registrados para {formattedMonthYear}
          </Text>
        </View>
      )}
    </View>
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
    paddingHorizontal: 16,
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
  scrollContainer: {
    flex: 1,
    padding: 16
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
