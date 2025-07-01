import { Feather } from "@expo/vector-icons";
import { ContentWrapper } from "components/ContentWrapper";
import { FloatingActionButton } from "components/floating-action-button";
import { GradientBackground } from "components/ui/backgrounds/GradientBackground";
import LoadingPage from "components/ui/loaders/LoadingPage";
import { CategorySelector } from "components/ui/menus/CategorySelector";
import { MyModal } from "components/ui/modals/myModal";
import { MyScrollView } from "components/ui/MyScrollView";
import { Href, Slot, useRouter } from "expo-router";
import { FormAddTask } from "features/tasks/components/FormAddTask";
import { useTasks } from "hooks/api/useTasks";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { navigationStore } from "store/navigation.store";
import colors from "styles/colors";
import { ICategoryItem } from "types/global.types";

const taskCategories: ICategoryItem[] = [
  { id: "all", label: "Todas", route: "/tasks" },
  { id: "pending", label: "Pendientes", route: "/tasks/pending" },
  { id: "in-progress", label: "En Progreso", route: "/tasks/in_progress" },
  { id: "completed", label: "Completadas", route: "/tasks/completed" },
  { id: "deleted", label: "Eliminadas", route: "/tasks/deleted" }
];

export default function TasksLayout() {
  const router = useRouter();
  const history = navigationStore((state) => state.history);
  const [prevPathState, setPrevPathState] = useState<Href | null>(null);
  const { loadingTasks, fetchNextPage, hasNextPage, isFetchingNextPage } = useTasks({});
  const [isFormVisible, setIsFormVisible] = useState(false);

  const [activeCategory, setActiveCategory] = useState("all");

  useEffect(() => {
    // Tomo el ultimo elemento en el momento que entra, que seria el anterior a la pantalla actual
    setPrevPathState(history[history.length - 1]);
  }, []);

  const handleCategoryPress = (category: ICategoryItem) => {
    setActiveCategory(category.id);
    router.push(category.route);
  };

  const handleGoBack = () => {
    router.navigate(prevPathState ?? "/");
    setPrevPathState(null);
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
        <GradientBackground>
          {/* Contenido con SafeAreaView para los bordes inferiores */}
          <SafeAreaView edges={["bottom"]} style={styles.contentContainer}>
            <MyScrollView
              onEndReached={() => {
                if (hasNextPage && !isFetchingNextPage) {
                  fetchNextPage();
                }
              }}
              onEndReachedThreshold={0.5}
            >
              <ContentWrapper withHeader={false}>
                {loadingTasks ? <LoadingPage /> : <Slot />}
              </ContentWrapper>
            </MyScrollView>

            <FloatingActionButton
              style={{ position: "absolute", bottom: 30, right: 20 }}
              onPress={() => setIsFormVisible(true)}
              iconName="add"
              iconSize={24}
            />
          </SafeAreaView>

          {/* Modal para agregar tareas */}
          <MyModal
            isVisible={isFormVisible}
            onClose={() => setIsFormVisible(false)}
            title="Agregar Tarea"
          >
            <FormAddTask onClose={() => setIsFormVisible(false)} />
          </MyModal>
        </GradientBackground>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  contentContainer: {
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
