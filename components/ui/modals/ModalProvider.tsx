// components/ui/modals/ModalProvider.tsx
import useColors from "hooks/useColors";
import { useEffect } from "react";
import { BackHandler, Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useModalStore } from "store/modal.store";
import colors from "styles/colors";
import { MyModal } from "./myModal";

export function ModalProvider({ children }: { readonly children: React.ReactNode }) {
  const { isVisible, type, title, message, confirmOptions, customContent, hideModal } = useModalStore();

  useEffect(() => {
    if (Platform.OS === "android") {
      const backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
        if (isVisible) {
          hideModal();
          return true;
        }
        return false;
      });

      return () => backHandler.remove();
    }
  }, [isVisible, hideModal]);

  const defaultColors = useColors();

  const handleConfirm = () => {
    if (confirmOptions?.onConfirm) {
      confirmOptions.onConfirm();
    }
    hideModal();
  };

  const handleCancel = () => {
    if (confirmOptions?.onCancel) {
      confirmOptions.onCancel();
    }
    hideModal();
  };

  const footerContent = (
    <View style={styles.buttonsContainer}>
      {type === "confirm" && (
        <TouchableOpacity
          style={[styles.button, styles.cancelButton, { backgroundColor: colors.error.light }]}
          onPress={handleCancel}
        >
          <Text style={styles.buttonText}>{confirmOptions?.cancelText ?? "Cancelar"}</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity
        style={[styles.button, styles.confirmButton, { backgroundColor: defaultColors.primary }]}
        onPress={type === "confirm" ? handleConfirm : hideModal}
      >
        <Text style={[styles.buttonText]}>
          {type === "confirm" ? confirmOptions?.confirmText ?? "Confirmar" : "Aceptar"}
        </Text>
      </TouchableOpacity>
    </View>
  );

  const content =
    type === "custom" ? (
      customContent
    ) : (
      <Text style={[styles.message, { color: defaultColors.textSecondary }]}>{message}</Text>
    );

  // Siempre renderizar los hijos, el modal se superpondrá cuando sea necesario
  return (
    <>
      {children}
      <MyModal
        isVisible={isVisible}
        onClose={hideModal}
        title={title}
        footerContent={footerContent}
        disableBackdropPress={type === "alert"} // Evitar cierre con clic fuera en alertas
      >
        {content}
      </MyModal>
    </>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center"
  },
  modalContainer: {
    width: "80%",
    borderRadius: 12,
    padding: 20,
    maxWidth: 400
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12
  },
  message: {
    fontSize: 16,
    marginBottom: 20
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6
  },
  confirmButton: {
    minWidth: 100,
    alignItems: "center"
  },
  cancelButton: {
    minWidth: 100,
    alignItems: "center"
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#fff"
  }
});
