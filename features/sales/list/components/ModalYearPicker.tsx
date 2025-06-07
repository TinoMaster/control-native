import { MyModal } from "components/ui/modals/myModal";
import useColors from "hooks/useColors";
import { FlatList, StyleSheet, Text, TouchableOpacity } from "react-native";

const YEARS = Array.from({ length: 6 }, (_, i) => new Date().getFullYear() - i);

interface ModalYearPickerProps {
  readonly showYearPicker: boolean;
  readonly setShowYearPicker: (showYearPicker: boolean) => void;
  readonly selectedYear: number;
  readonly handleYearSelect: (year: number) => void;
}

export function ModalYearPicker({
  showYearPicker,
  setShowYearPicker,
  selectedYear,
  handleYearSelect
}: ModalYearPickerProps) {
  const defaultColors = useColors();

  return (
    <MyModal isVisible={showYearPicker} onClose={() => setShowYearPicker(false)} title="Seleccionar año">
      <FlatList
        data={YEARS}
        keyExtractor={(_, index) => `year-${index}`}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.yearItem, selectedYear === item && { backgroundColor: defaultColors.primary + "20" }]}
            onPress={() => handleYearSelect(item)}
          >
            <Text
              style={[
                styles.yearText,
                { color: defaultColors.text },
                selectedYear === item && { color: defaultColors.primary, fontWeight: "600" }
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
  yearItem: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 4
  },
  yearText: {
    fontSize: 16
  }
});
