import useColors from "hooks/useColors";
import { FlatList, StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";

interface EmptyListMessageProps {
  message: string;
  textColor: string;
}
interface GenericListProps<T> {
  readonly data: T[];
  readonly renderItem: (item: T) => React.ReactElement;
  readonly keyExtractor: (item: T) => string;
  readonly emptyListMessage?: string;
  readonly contentContainerStyle?: StyleProp<ViewStyle>;
  readonly withHeader?: boolean;
}

export default function GenericList<T>({
  data,
  renderItem,
  keyExtractor,
  emptyListMessage = "No hay elementos para mostrar",
  contentContainerStyle,
  withHeader = true
}: GenericListProps<T>) {
  const defaultColors = useColors();

  return (
    <FlatList
      data={data}
      renderItem={({ item }) => renderItem(item)}
      showsVerticalScrollIndicator={false}
      keyExtractor={keyExtractor}
      contentContainerStyle={[
        styles.listContent,
        { paddingTop: withHeader ? 66 : 16 },
        contentContainerStyle
      ]}
      ListEmptyComponent={
        <EmptyListMessage message={emptyListMessage} textColor={defaultColors.text} />
      }
    />
  );
}

const EmptyListMessage = ({ message, textColor }: EmptyListMessageProps) => (
  <View style={styles.emptyContainer}>
    <Text style={[styles.emptyText, { color: textColor }]}>{message}</Text>
  </View>
);

const styles = StyleSheet.create({
  listContent: {
    gap: 16,
    paddingHorizontal: 16,
    paddingBottom: 16
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
