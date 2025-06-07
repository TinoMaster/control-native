import { useState } from "react";

export function useMachineStateModal() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  function openModal() {
    setIsModalVisible(true);
  }

  function closeModal() {
    setIsModalVisible(false);
  }

  return {
    isModalVisible,
    openModal,
    closeModal
  };
}
