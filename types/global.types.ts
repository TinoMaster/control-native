import { Ionicons } from "@expo/vector-icons";
import { Href } from "expo-router";
import { TRole } from "models/api";
import { ElementType } from "react";

export interface INavLinkItem {
  name: string;
  path: string;
  icon?: ElementType;
  label: string;
  rolesExcluded?: TRole[];
}

export interface ITabsItem {
  name: string;
  title: string;
  icon: ElementType;
}

export interface IMenuItem {
  label: string;
  path: string;
  icon?: keyof typeof Ionicons.glyphMap;
}

export interface ICategoryItem {
  id: string;
  label: string;
  route: Href;
}
