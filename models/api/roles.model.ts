export enum ERole {
  ADMIN = "ADMIN",
  USER = "USER",
  OWNER = "OWNER",
  EMPLOYEE = "EMPLOYEE",
  SUPERADMIN = "SUPERADMIN",
}

export type TRole = keyof typeof ERole;
