import { useQuery } from "@tanstack/react-query";
import { MachineStateModel } from "models/api/machineState.model";
import { machineStateService } from "services/machineState.service";
import { useBusinessStore } from "store/business.store";

interface UseMachineStates {
  lastMachineState: MachineStateModel[];
  loadingLastMachineState: boolean;
}

export const useMachineStates = (): UseMachineStates => {
  const businessId = useBusinessStore((state) => state.businessId);

  const { data: lastMachineState = [], isLoading: loadingLastMachineState } = useQuery({
    queryKey: ["last-machine-state", businessId],
    queryFn: async () => {
      if (!businessId) {
        return [];
      }
      const response = await machineStateService.getLatestStatesByBusinessBeforeDate(businessId);
      console.log("response", response);
      return response.data || [];
    },
    enabled: !!businessId
  });

  return {
    lastMachineState,
    loadingLastMachineState
  };
};
