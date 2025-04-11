import { MaterialIcons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { useConsumables } from "hooks/api/useConsumables";
import { useService } from "hooks/api/useServices";
import useColors from "hooks/useColors";
import { ServiceModel } from "models/api";
import {
  serviceDefaultValues,
  serviceSchema,
  ServiceSchema,
} from "models/zod/serviceSchema";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useBusinessStore } from "store/business.store";
import colors from "styles/colors";

export default function CreateService() {
  const router = useRouter();

  const defaultColors = useColors();
  const { business } = useBusinessStore();
  const { consumables, loadingConsumables } = useConsumables();
  const { saveService } = useService();

  const [loading, setLoading] = useState(false);
  const [showConsumableModal, setShowConsumableModal] = useState(false);
  const [selectedConsumableIndex, setSelectedConsumableIndex] = useState<
    number | null
  >(null);

  const {
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    watch,
  } = useForm<ServiceSchema>({
    resolver: zodResolver(serviceSchema),
    defaultValues: serviceDefaultValues,
    mode: "onChange",
  });

  const costs = watch("costs") ?? [];

  const onSubmit = (data: ServiceSchema) => {
    setLoading(true);
    const service: ServiceModel = {
      name: data.name,
      description: data.description || "",
      price: parseFloat(data.price),
      business: business?.id!,
      costs:
        data.costs?.map((cost) => ({
          consumable: consumables.find((c) => c.id === cost.consumable?.id)!,
          quantity: parseFloat(cost.quantity ?? "0"),
        })) ?? [],
    };
    saveService(service, {
      onSuccess: () => {
        router.back();
        setLoading(false);
      },
      onError: () => {
        setLoading(false);
      },
    });
  };

  const addCost = () => {
    setValue(
      "costs",
      [...costs, { consumable: { id: 0, name: "" }, quantity: "" }],
      { shouldValidate: true }
    );
  };

  const removeCost = (index: number) => {
    const newCosts = costs.filter((_: unknown, i: number) => i !== index);
    setValue("costs", newCosts, { shouldValidate: true });
  };

  const selectConsumable = (consumable: { id: number; name: string }) => {
    if (selectedConsumableIndex !== null) {
      const newCosts = [...costs];
      newCosts[selectedConsumableIndex] = {
        ...newCosts[selectedConsumableIndex],
        consumable,
      };
      setValue("costs", newCosts, { shouldValidate: true });
    }
    setShowConsumableModal(false);
  };

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <ScrollView
        style={{
          backgroundColor: defaultColors.background,
          padding: 16,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            marginBottom: 16,
            color: defaultColors.text,
          }}
        >
          Crear Nuevo Servicio
        </Text>

        <View style={{ marginBottom: 16 }}>
          <Text
            style={{
              color: defaultColors.text,
              marginBottom: 8,
            }}
          >
            Nombre del Servicio
          </Text>
          <TextInput
            style={{
              backgroundColor: colors.background.light.primary,
              padding: 12,
              borderRadius: 8,
              color: colors.lightMode.text.dark,
            }}
            placeholder="Ingrese el nombre del servicio"
            placeholderTextColor={colors.lightMode.textSecondary.light}
            onChangeText={(text) =>
              setValue("name", text, { shouldValidate: true })
            }
          />
          {errors.name && (
            <Text style={{ color: defaultColors.secondary, marginTop: 4 }}>
              {errors.name.message}
            </Text>
          )}
        </View>

        <View style={{ marginBottom: 16 }}>
          <Text
            style={{
              color: defaultColors.text,
              marginBottom: 8,
            }}
          >
            Descripción
          </Text>
          <TextInput
            style={{
              backgroundColor: colors.background.light.primary,
              padding: 12,
              borderRadius: 8,
              color: colors.lightMode.text.dark,
              minHeight: 100,
              textAlignVertical: "top",
            }}
            multiline
            placeholder="Ingrese la descripción del servicio"
            placeholderTextColor={colors.lightMode.textSecondary.light}
            onChangeText={(text) => setValue("description", text)}
          />
        </View>

        <View style={{ marginBottom: 16 }}>
          <Text
            style={{
              color: defaultColors.text,
              marginBottom: 8,
            }}
          >
            Precio
          </Text>
          <TextInput
            style={{
              backgroundColor: colors.background.light.primary,
              padding: 12,
              borderRadius: 8,
              color: colors.lightMode.text.dark,
            }}
            keyboardType="numeric"
            placeholder="Ingrese el precio del servicio"
            placeholderTextColor={colors.lightMode.textSecondary.light}
            onChangeText={(text) =>
              setValue("price", text, { shouldValidate: true })
            }
          />
          {errors.price && (
            <Text style={{ color: defaultColors.secondary, marginTop: 4 }}>
              {errors.price.message}
            </Text>
          )}
        </View>

        <View style={{ marginBottom: 16 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            <Text
              style={{
                color: defaultColors.text,
              }}
            >
              Consumibles
            </Text>
            <TouchableOpacity
              onPress={addCost}
              style={{
                backgroundColor: defaultColors.primary,
                padding: 8,
                borderRadius: 8,
              }}
            >
              <MaterialIcons
                name="add"
                size={20}
                color={colors.darkMode.text.light}
              />
            </TouchableOpacity>
          </View>

          {costs.map((cost, index) => (
            <View
              key={index}
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 8,
              }}
            >
              <TouchableOpacity
                style={{
                  flex: 1,
                  backgroundColor: colors.background.light.primary,
                  padding: 12,
                  borderRadius: 8,
                  marginRight: 8,
                }}
                onPress={() => {
                  setSelectedConsumableIndex(index);
                  setShowConsumableModal(true);
                }}
              >
                <Text
                  style={{
                    color: cost.consumable?.name
                      ? colors.lightMode.text.light
                      : colors.lightMode.textSecondary.light,
                  }}
                >
                  {cost.consumable?.name || "Seleccionar consumible"}
                </Text>
              </TouchableOpacity>

              <TextInput
                style={{
                  backgroundColor: colors.background.light.primary,
                  padding: 12,
                  borderRadius: 8,
                  width: 80,
                  marginRight: 8,
                  color: colors.lightMode.text.dark,
                }}
                keyboardType="numeric"
                placeholder="Cant."
                placeholderTextColor={colors.lightMode.textSecondary.light}
                onChangeText={(text) => {
                  const newCosts = [...costs];
                  newCosts[index] = {
                    ...newCosts[index],
                    quantity: text,
                  };
                  setValue("costs", newCosts, { shouldValidate: true });
                }}
              />

              <TouchableOpacity
                onPress={() => removeCost(index)}
                style={{
                  backgroundColor: colors.secondary.light,
                  padding: 12,
                  borderRadius: 8,
                }}
              >
                <MaterialIcons
                  name="delete"
                  size={20}
                  color={colors.background.light.primary}
                />
              </TouchableOpacity>
            </View>
          ))}
        </View>

        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          style={{
            backgroundColor: colors.primary.light,
            padding: 16,
            borderRadius: 8,
            alignItems: "center",
            marginTop: 16,
            opacity: loading || !isValid ? 0.5 : 1,
          }}
          disabled={loading || !isValid}
        >
          {loading ? (
            <ActivityIndicator color={colors.background.light.primary} />
          ) : (
            <Text
              style={{
                color: colors.background.light.primary,
                fontWeight: "bold",
                fontSize: 16,
              }}
            >
              Crear Servicio
            </Text>
          )}
        </TouchableOpacity>
      </ScrollView>

      {showConsumableModal && (
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              backgroundColor: colors.background.light.primary,
              borderRadius: 12,
              padding: 16,
              width: "80%",
              maxHeight: "80%",
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                marginBottom: 16,
                color: colors.lightMode.text.light,
              }}
            >
              Seleccionar Consumible
            </Text>

            {loadingConsumables ? (
              <ActivityIndicator color={colors.primary.light} />
            ) : (
              <ScrollView>
                {consumables.map((consumable) => (
                  <TouchableOpacity
                    key={consumable.id}
                    style={{
                      padding: 12,
                      borderBottomWidth: 1,
                      borderBottomColor: colors.background.light.secondary,
                    }}
                    onPress={() =>
                      selectConsumable({
                        id: consumable.id!,
                        name: consumable.name,
                      })
                    }
                  >
                    <Text
                      style={{
                        color: colors.lightMode.text.light,
                        fontSize: 16,
                      }}
                    >
                      {consumable.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            )}

            <TouchableOpacity
              onPress={() => setShowConsumableModal(false)}
              style={{
                backgroundColor: colors.secondary.light,
                padding: 12,
                borderRadius: 8,
                alignItems: "center",
                marginTop: 16,
              }}
            >
              <Text
                style={{
                  color: colors.background.light.primary,
                  fontWeight: "bold",
                }}
              >
                Cancelar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}
