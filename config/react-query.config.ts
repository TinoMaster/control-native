import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutos antes de refrescar datos
      gcTime: 1000 * 60 * 10, // 10 minutos en caché antes de eliminación
      refetchOnWindowFocus: false, // Evita recargar datos innecesarios
    },
  },
});
