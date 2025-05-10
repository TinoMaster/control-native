import { MiniIconButton } from "components/ui/MIniIconButton";
import { MyCard } from "components/ui/MyCard";
import { MyModal } from "components/ui/modals/myModal";
import { useRouter } from "expo-router";
import useColors from "hooks/useColors";
import { BusinessModel } from "models/api";
import { MachineModel } from "models/api/machine.model";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { FormMachine } from "./FormMachine";

interface Props {
  readonly business: BusinessModel;
}

export function MachinesInfo({ business }: Props) {
  const defaultColors = useColors();
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMachine, setSelectedMachine] = useState<MachineModel | undefined>(undefined);
  const [isEditing, setIsEditing] = useState(false);

  const handleViewMachines = () => {
    router.push(`/business/my_businesses/${business.id}/machines`);
  };

  const handleAddMachine = () => {
    setIsEditing(false);
    setSelectedMachine(undefined);
    setModalVisible(true);
  };

  const handleEditMachine = (machine: MachineModel) => {
    setIsEditing(true);
    setSelectedMachine(machine);
    setModalVisible(true);
  };
  return (
    <>
      <MyCard title="Máquinas" iconTitle="hardware-chip-outline" iconButton="add" onPressIcon={handleAddMachine}>
        <View className="mt-2">
          {business?.machines?.slice(0, 3).map((machine, index) => (
            <View key={machine.id ?? index} className="flex-row justify-between items-center pb-3 ">
              <View className="flex-row items-center">
                <Text style={{ color: defaultColors.text }} className="text-base mr-2">
                  {machine.name}
                </Text>
                <View
                  className="w-2 h-2 rounded-full ml-2"
                  style={{ backgroundColor: machine.active ? "#4ADE80" : "#F87171" }}
                />
              </View>
              <View className="flex-row items-center">
                <Text style={{ color: machine.active ? "#4ADE80" : "#F87171" }} className="text-sm mr-3">
                  {machine.active ? "Activa" : "Inactiva"}
                </Text>
                <MiniIconButton icon="pencil" onPress={() => handleEditMachine(machine)} />
              </View>
            </View>
          ))}

          {(business?.machines?.length ?? 0) > 3 && (
            <TouchableOpacity onPress={handleViewMachines} className="py-3 items-center">
              <Text style={{ color: defaultColors.primary }} className="text-sm font-medium">
                Ver todas las máquinas
              </Text>
            </TouchableOpacity>
          )}

          {!(business?.machines?.length ?? 0) && (
            <Text style={{ color: defaultColors.textSecondary, textAlign: "center" }} className="text-base">
              No tienes máquinas registradas
            </Text>
          )}
        </View>
      </MyCard>

      {/* Modal para añadir/editar máquina */}
      <MyModal
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        title={isEditing ? "Editar Máquina" : "Añadir Máquina"}
      >
        <FormMachine
          setModalVisible={setModalVisible}
          business={business}
          machine={selectedMachine}
          isEditing={isEditing}
        />
      </MyModal>
    </>
  );
}
