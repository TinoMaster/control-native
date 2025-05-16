import { MachineModel } from "models/api/machine.model";

export const getActiveMachines = (
  machines: MachineModel[] | undefined,
  machinesAlreadySelected?: (number | undefined)[]
) => {
  if (!machines) return [];

  return (
    machines
      ?.filter((machine) => (machinesAlreadySelected ? !machinesAlreadySelected.includes(machine.id) : true))
      .filter((machine) => machine.active) || []
  );
};
