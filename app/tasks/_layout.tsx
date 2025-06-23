import { Feather } from "@expo/vector-icons";
import { CategorySelector } from "components/ui/CategorySelector";
import { Href, Slot, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { navigationStore } from "store/navigation.store";
import colors from "styles/colors";

interface TaskCategory {
  id: string;
  label: string;
  route: Href;
}

const taskCategories: TaskCategory[] = [
  { id: "all", label: "Todas", route: "/tasks" },
  { id: "pending", label: "Pendientes", route: "/tasks/pending" },
  { id: "in-progress", label: "En Progreso", route: "/tasks/in_progress" },
  { id: "completed", label: "Completadas", route: "/tasks/completed" }
];

export default function TasksLayout() {
  const router = useRouter();
  const history = navigationStore((state) => state.history);
  const [prevPathState, setPrevPathState] = useState<Href | null>(null);

  const [activeCategory, setActiveCategory] = useState("all");

  useEffect(() => {
    // Tomo el ultimo elemento en el momento que entra, que seria el anterior a la pantalla actual
    setPrevPathState(history[history.length - 1]);
  }, []);

  const handleCategoryPress = (category: TaskCategory) => {
    setActiveCategory(category.id);
    router.push(category.route);
  };

  const handleGoBack = () => {
    if (prevPathState) {
      router.replace(prevPathState);
      setPrevPathState(null);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header con SafeAreaView específico para la parte superior */}
      <View style={[styles.headerContainer, { backgroundColor: colors.background.dark.primary }]}>
        <SafeAreaView edges={["top"]} style={styles.safeHeader}>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={handleGoBack}
              style={styles.backButton}
              accessibilityRole="button"
              accessibilityLabel="Volver atrás"
            >
              <Feather name="arrow-left" size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Tareas</Text>
          </View>

          {/* Selector de categorías */}
          <CategorySelector
            categories={taskCategories}
            activeCategory={activeCategory}
            handleCategoryPress={handleCategoryPress}
          />
        </SafeAreaView>
      </View>

      {/* Contenido de la página actual */}
      <View style={styles.content}>
        <Slot />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  headerContainer: {
    width: "100%",
    zIndex: 10,
    elevation: 3
  },
  safeHeader: {
    width: "100%"
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 16
  },
  backButton: {
    padding: 8,
    marginRight: 8
  },
  headerTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold"
  },
  content: {
    flex: 1
  }
});
