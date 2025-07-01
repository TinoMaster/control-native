import { EntryIcon, GridIcon, ProfileIcon, WalletIcon } from "components/Icons";
import { ITabsItem } from "types/global.types";

export const tabsConfig: ITabsItem[] = [
  {
    name: "index",
    title: "Inicio",
    icon: GridIcon
  },
  {
    name: "sales",
    title: "Registros",
    icon: WalletIcon
  },
  {
    name: "entries",
    title: "Entradas",
    icon: EntryIcon
  },
  {
    name: "profile",
    title: "Perfil",
    icon: ProfileIcon
  }
];
