import { TRole } from "models/api";
import { ElementType } from "react";

export interface INavLinkItem {
  name: string;
  path: string;
  icon?: ElementType;
  label: string;
  rolesExcluded?: TRole[];
}
