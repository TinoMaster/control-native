import { MyModal } from "components/ui/modals/myModal";
import { MONTHS } from "data/global.data";
import useColors from "hooks/useColors";
import { FlatList, StyleSheet, Text, TouchableOpacity } from "react-native";

interface ModalMonthPickerProps {
  readonly showMonthPicker: boolean;
  readonly setShowMonthPicker: (showMonthPicker: boolean) => void;
  readonly selectedMonth: number;
  readonly handleMonthSelect: (month: number) => void;
}

export function ModalMonthPicker({
  showMonthPicker,
  setShowMonthPicker,
  selectedMonth,
  handleMonthSelect
}: ModalMonthPickerProps) {
  const defaultColors = useColors();

  return (
    <MyModal isVisible={showMonthPicker} onClose={() => setShowMonthPicker(false)} title="Seleccionar mes">
      <FlatList
        data={MONTHS}
        keyExtractor={(_, index) => `month-${index}`}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={[styles.monthItem, selectedMonth === index + 1 && { backgroundColor: defaultColors.primary + "20" }]}
            onPress={() => handleMonthSelect(index + 1)}
          >
            <Text
              style={[
                styles.monthText,
                { color: defaultColors.text },
                selectedMonth === index + 1 && { color: defaultColors.primary, fontWeight: "600" }
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        )}
      />
    </MyModal>
  );
}

const styles = StyleSheet.create({
  monthItem: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 4
  },
  monthText: {
    fontSize: 16
  }
});
