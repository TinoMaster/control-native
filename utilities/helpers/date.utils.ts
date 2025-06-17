export const isTodayDate = (date: Date) => {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};

export const formatDate = (date: Date): string => {
  if (!date) return "";
  return date.toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
};
