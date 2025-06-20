import { Feather } from "@expo/vector-icons";
import { ContentWrapper } from "components/ContentWrapper";
import { FloatingActionButton } from "components/floating-action-button";
import { GradientBackground } from "components/ui/backgrounds/GradientBackground";
import LoadingPage from "components/ui/loaders/LoadingPage";
import { MyModal } from "components/ui/modals/myModal";
import { MyScrollView } from "components/ui/MyScrollView";
import { FormAddTask } from "features/tasks/components/FormAddTask";
import { TaskItem } from "features/tasks/components/TaskItem";
import { useRouter } from "expo-router";
import { useTasks } from "hooks/api/useTasks";
import useColors from "hooks/useColors";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "styles/colors";

export default function Tasks() {
  const { tasks, loadingTasks, fetchNextPage, hasNextPage, isFetchingNextPage } = useTasks();
  const router = useRouter();
  const defaultColors = useColors();
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleGoBack = () => {
    router.back();
  };

  return (
    <GradientBackground>
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
        </SafeAreaView>
      </View>

      {/* Modal para agregar tareas */}
      <MyModal
        isVisible={isFormVisible}
        onClose={() => setIsFormVisible(false)}
        title="Agregar Tarea"
      >
        <FormAddTask onClose={() => setIsFormVisible(false)} />
      </MyModal>

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
            <View style={{ gap: 10, paddingBottom: 20 }} className="flex-1">
              <Text style={{ color: defaultColors.text }} className="text-lg font-semibold">
                Tareas
              </Text>
              
              {loadingTasks ? (
                <LoadingPage />
              ) : (
                <>
                  {tasks?.pages.some(page => page.content.length > 0) ? (
                    tasks.pages.map((page) => (
                      <View key={page.page}>
                        {page.content.map((task) => (
                          <TaskItem key={task.id} item={task} />
                        ))}
                      </View>
                    ))
                  ) : (
                    <View className="flex-1 justify-center items-center py-10">
                      <Text style={{ color: defaultColors.text }} className="text-center">
                        No hay tareas registradas
                      </Text>
                    </View>
                  )}
                </>
              )}
            </View>
          </ContentWrapper>
        </MyScrollView>

        <FloatingActionButton onPress={() => setIsFormVisible(true)} iconName="add" iconSize={24} />
      </SafeAreaView>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
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
  contentContainer: {
    flex: 1
  }
});
