// store/modal.store.ts
import { create } from "zustand";

// Tipos de modales que podrías necesitar
export type ModalType = "alert" | "confirm" | "custom";

// Estructura para las opciones de confirmación
interface ConfirmOptions {
  onConfirm: () => void;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
}

// Estructura para el estado del modal
interface ModalState {
  isVisible: boolean;
  type: ModalType;
  title: string;
  message: string;
  confirmOptions?: ConfirmOptions;
  customContent?: React.ReactNode;

  // Acciones
  showAlert: (title: string, message: string) => void;
  showConfirm: (title: string, message: string, options: ConfirmOptions) => void;
  showCustomModal: (title: string, content: React.ReactNode) => void;
  hideModal: () => void;
}

// Crear el store
export const useModalStore = create<ModalState>((set) => ({
  isVisible: false,
  type: "alert",
  title: "",
  message: "",

  // Mostrar un modal de alerta simple
  showAlert: (title, message) =>
    set({
      isVisible: true,
      type: "alert",
      title,
      message,
      confirmOptions: undefined,
      customContent: undefined
    }),

  // Mostrar un modal de confirmación con callbacks
  showConfirm: (title, message, options) =>
    set({
      isVisible: true,
      type: "confirm",
      title,
      message,
      confirmOptions: options,
      customContent: undefined
    }),

  // Mostrar un modal con contenido personalizado
  showCustomModal: (title, content) =>
    set({
      isVisible: true,
      type: "custom",
      title,
      customContent: content,
      message: "",
      confirmOptions: undefined
    }),

  // Ocultar el modal
  hideModal: () => set({ isVisible: false })
}));
