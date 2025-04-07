import { View, FlatList, StyleSheet, Text } from "react-native";
import useColors from "hooks/useColors";

interface GenericListProps<T> {
  data: T[];
  renderItem: (item: T) => React.ReactElement;
  keyExtractor: (item: T) => string;
  emptyListMessage?: string;
}

export default function GenericList<T>({
  data,
  renderItem,
  keyExtractor,
  emptyListMessage = "No hay elementos para mostrar",
}: GenericListProps<T>) {
  const colors = useColors();

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item }) => renderItem(item)}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={[styles.emptyText, { color: colors.text }]}>
              {emptyListMessage}
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    flexGrow: 1,
    padding: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    textAlign: "center",
  },
}); 