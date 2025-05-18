import { View, FlatList, StyleSheet, Text } from "react-native";
import useColors from "hooks/useColors";

interface EmptyListMessageProps {
  message: string;
  textColor: string;
}
interface GenericListProps<T> {
  readonly data: T[];
  readonly renderItem: (item: T) => React.ReactElement;
  readonly keyExtractor: (item: T) => string;
  readonly emptyListMessage?: string;
}

export default function GenericList<T>({
  data,
  renderItem,
  keyExtractor,
  emptyListMessage = "No hay elementos para mostrar"
}: GenericListProps<T>) {
  const colors = useColors();

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item }) => renderItem(item)}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={<EmptyListMessage message={emptyListMessage} textColor={colors.text} />}
      />
    </View>
  );
}

const EmptyListMessage = ({ message, textColor }: EmptyListMessageProps) => (
  <View style={styles.emptyContainer}>
    <Text style={[styles.emptyText, { color: textColor }]}>{message}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  listContent: {
    flexGrow: 1,
    padding: 16,
    rowGap: 16
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
