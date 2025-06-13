import { zodResolver } from "@hookform/resolvers/zod";
import LoadingPage from "components/ui/loaders/LoadingPage";
import { useNotification } from "contexts/NotificationContext";
import useColors from "hooks/useColors";
import { BusinessModel } from "models/api";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Pressable, Text, TextInput, View } from "react-native";
import { businessService } from "services/business.service";
import { useBusinessStore } from "store/business.store";
import colors from "styles/colors";
import { adjustBrightness } from "utilities/helpers/globals.helpers";
import { z } from "zod";

interface Props {
  readonly setModalVisible: (visible: boolean) => void;
  readonly business: BusinessModel;
}

const businessInfoSchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  description: z.string().optional(),
  phone: z.string().min(1, "El teléfono es obligatorio")
});

type BusinessInfoFormData = z.infer<typeof businessInfoSchema>;

export function FormEditBusinessInfo({ setModalVisible, business }: Props) {
  const defaultColors = useColors();
  const { updateBusiness } = useBusinessStore();
  const { showNotification } = useNotification();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<BusinessInfoFormData>({
    resolver: zodResolver(businessInfoSchema),
    defaultValues: {
      name: business.name,
      description: business.description || "",
      phone: business.phone
    }
  });

  const onSubmit = async (data: BusinessInfoFormData) => {
    setIsSubmitting(true);

    // Create updated business object
    const updatedBusiness: Partial<BusinessModel> = {
      name: data.name,
      description: data.description,
      phone: data.phone,
      updatedAt: new Date()
    };

    if (business.id) {
      const businessToUpdate = { ...business, ...updatedBusiness };

      const response = await businessService.updateBusiness(business.id.toString(), businessToUpdate);

      if (response.status === 200) {
        updateBusiness(business.id, updatedBusiness);
        showNotification("Negocio actualizado correctamente", "success");
        setModalVisible(false);
      } else {
        showNotification("Error al actualizar el negocio", "error");
      }
    }

    setIsSubmitting(false);
  };

  return (
    <View>
      {isSubmitting && <LoadingPage message="Actualizando..." absolute />}
      <View className="mb-4">
        <Text style={{ color: defaultColors.text }} className="mb-1 font-medium">
          Nombre
        </Text>
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className={`p-2 border rounded-lg mb-1 ${
                errors.name ? "border-red-500" : "border-gray-300 dark:border-gray-600"
              }`}
              style={{ color: defaultColors.text, backgroundColor: adjustBrightness(defaultColors.background, 10) }}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder="Nombre del negocio"
              placeholderTextColor={defaultColors.textSecondary}
            />
          )}
        />
        {errors.name && <Text className="text-red-500 text-xs mb-2">{errors.name.message}</Text>}

        <Text style={{ color: defaultColors.text }} className="mb-1 font-medium">
          Teléfono
        </Text>
        <Controller
          control={control}
          name="phone"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className={`p-2 border rounded-lg mb-1 ${
                errors.phone ? "border-red-500" : "border-gray-300 dark:border-gray-600"
              }`}
              style={{ color: defaultColors.text, backgroundColor: adjustBrightness(defaultColors.background, 10) }}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder="Teléfono"
              placeholderTextColor={defaultColors.textSecondary}
              keyboardType="phone-pad"
            />
          )}
        />
        {errors.phone && <Text className="text-red-500 text-xs mb-2">{errors.phone.message}</Text>}

        <Text style={{ color: defaultColors.text }} className="mb-1 font-medium">
          Descripción
        </Text>
        <Controller
          control={control}
          name="description"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className="p-2 border rounded-lg mb-1 border-gray-300 dark:border-gray-600"
              style={{
                color: defaultColors.text,
                backgroundColor: adjustBrightness(defaultColors.background, 10),
                textAlignVertical: "top"
              }}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder="Descripción del negocio"
              placeholderTextColor={defaultColors.textSecondary}
              multiline
              numberOfLines={4}
            />
          )}
        />
      </View>

      <View className="flex-row justify-end gap-2">
        <Pressable
          style={{ backgroundColor: colors.error.light }}
          disabled={isSubmitting}
          className="py-2 px-4 rounded-lg flex-row items-center"
          onPress={() => setModalVisible(false)}
        >
          <Text style={{ color: defaultColors.text }}>Cancelar</Text>
        </Pressable>
        <Pressable
          style={{ backgroundColor: colors.primary.light }}
          disabled={isSubmitting}
          className="py-2 px-4 rounded-lg flex-row items-center"
          onPress={handleSubmit(onSubmit)}
        >
          <Text className="text-white font-medium">Guardar</Text>
        </Pressable>
      </View>
    </View>
  );
}
