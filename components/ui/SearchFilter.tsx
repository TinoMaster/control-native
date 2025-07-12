import { Feather } from "@expo/vector-icons";
import useColors from "hooks/useColors";
import { useDebounce } from "hooks/useDebounce";
import { useCallback, useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";

interface SearchFilterProps<T> {
  readonly data: T[];

  readonly searchFields: (keyof T)[];

  readonly minCharacters?: number;

  readonly debounceDelay?: number;

  readonly placeholder?: string;

  readonly onFilteredDataChange: (filteredData: T[]) => void;

  readonly customFilter?: (item: T, searchTerm: string, searchFields: (keyof T)[]) => boolean;

  readonly containerStyle?: object;
}

export function SearchFilter<T>({
  data,
  searchFields,
  minCharacters = 2,
  debounceDelay = 300,
  placeholder = "Buscar...",
  onFilteredDataChange,
  customFilter,
  containerStyle
}: SearchFilterProps<T>) {
  const [searchTerm, setSearchTerm] = useState("");
  const colors = useColors();

  // Default filter function
  const defaultFilter = useCallback(
    (item: T, term: string, fields: (keyof T)[]) => {
      if (!term || term.length < minCharacters) return true;

      const lowerCaseTerm = term.toLowerCase();

      return fields.some((field) => {
        const value = item[field];
        if (value === null || value === undefined) return false;

        // Handle different types of values
        if (typeof value === "string") {
          return value.toLowerCase().includes(lowerCaseTerm);
        } else if (typeof value === "number" || typeof value === "boolean") {
          return String(value).toLowerCase().includes(lowerCaseTerm);
        } else if (value instanceof Date) {
          return value.toLocaleDateString().includes(lowerCaseTerm);
        }

        return false;
      });
    },
    [minCharacters]
  );

  // Use custom filter or default filter
  const filterFunction = customFilter || defaultFilter;

  // Filter function
  const filterItems = useCallback(
    (term: string) => {
      if (!term || term.length < minCharacters) {
        onFilteredDataChange(data);
        return;
      }

      const filtered = data.filter((item) => filterFunction(item, term, searchFields));

      onFilteredDataChange(filtered);
    },
    [data, searchFields, filterFunction, onFilteredDataChange, minCharacters]
  );

  const debouncedFilter = useDebounce(filterItems, debounceDelay);

  const handleSearchChange = (text: string) => {
    setSearchTerm(text);
    debouncedFilter(text);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    onFilteredDataChange(data);
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={[styles.searchContainer, { backgroundColor: colors.card }]}>
        <Feather name="search" size={18} color={colors.textSecondary} style={styles.searchIcon} />
        <TextInput
          style={[styles.input, { color: colors.text }]}
          placeholder={placeholder}
          placeholderTextColor={colors.textSecondary}
          value={searchTerm}
          onChangeText={handleSearchChange}
        />
        {searchTerm.length > 0 && (
          <Feather
            name="x"
            size={18}
            color={colors.textSecondary}
            style={styles.clearIcon}
            onPress={handleClearSearch}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginVertical: 8
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 44
  },
  searchIcon: {
    marginRight: 8
  },
  input: {
    flex: 1,
    height: "100%",
    fontSize: 16
  },
  clearIcon: {
    padding: 4
  }
});
