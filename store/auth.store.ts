import { ERole, TRole, UserModel } from "models/api";
import { EmployeeModel } from "models/api/employee.model";
import { employeeService } from "services/employee.service";
import { userService } from "services/user.service";
import { decodeJWT } from "utilities/helpers/jwtDecode";
import { secureStorage } from "utilities/storage/secure-storage";
import { create } from "zustand";
import { useBusinessStore } from "./business.store";

interface AuthState {
  user: UserModel | undefined;
  employee: EmployeeModel | undefined;
  role: TRole;
  loadingUser: boolean;
  token: string | null;
  isLoggedIn: boolean;

  // Actions
  login: (token: string, role: TRole, refreshToken: string) => Promise<void>;
  logout: () => Promise<void>;
  reloadUser: () => Promise<void>;
  getUser: (email: string) => Promise<void>;
  initializeAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: undefined,
  employee: undefined,
  role: undefined as unknown as TRole,
  loadingUser: false,
  token: null,
  isLoggedIn: false,

  initializeAuth: async () => {
    try {
      const token = await secureStorage.getItem("token");
      const role = await secureStorage.getItem("role");

      set({
        token,
        role: role as TRole,
        isLoggedIn: Boolean(token && role)
      });

      if (token && role) {
        const userEmail = decodeJWT(token).sub;
        if (userEmail) {
          await get().getUser(userEmail);
        }
      }
    } catch (error) {
      console.error("Error initializing auth:", error);
    }
  },

  login: async (token: string, role: TRole, refreshToken: string) => {
    try {
      await Promise.all([
        secureStorage.setItem("token", token),
        secureStorage.setItem("role", role),
        secureStorage.setItem("refreshToken", refreshToken)
      ]);

      set({ token, role, isLoggedIn: true });
      const userEmail = decodeJWT(token).sub;
      if (userEmail) {
        await get().getUser(userEmail);
      }
    } catch (error) {
      console.error("Error during login:", error);
      throw error;
    }
  },

  logout: async () => {
    try {
      await Promise.all([
        secureStorage.removeItem("token"),
        secureStorage.removeItem("role"),
        secureStorage.removeItem("refreshToken")
      ]);

      set({
        user: undefined,
        employee: undefined,
        role: undefined as unknown as TRole,
        token: null,
        isLoggedIn: false
      });
    } catch (error) {
      console.error("Error during logout:", error);
      throw error;
    }
  },

  reloadUser: async () => {
    const token = get().token;
    if (token) {
      const userEmail = decodeJWT(token).sub;
      if (userEmail) {
        await get().getUser(userEmail);
      }
    }
  },

  getUser: async (email: string) => {
    set({ loadingUser: true });
    try {
      const response = await userService.getUser(email);
      if (response.status === 200 && response.data) {
        useBusinessStore.getState().initializeBusiness(response.data);
        set({ user: response.data });

        const role = get().role;
        if (role !== ERole.SUPERADMIN && role !== ERole.OWNER) {
          const employeeResponse = await employeeService.getEmployeeByUserId(response.data?.id ?? 0);
          if (employeeResponse.status === 200) {
            set({ employee: employeeResponse.data });
          }
        }
      } else {
        await get().logout();
      }
    } catch (error: any) {
      console.log(error);
      await get().logout();
    } finally {
      set({ loadingUser: false });
    }
  }
}));
