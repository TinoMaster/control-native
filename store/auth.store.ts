import { ERole, UserModel } from "models/api";
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
  role: ERole;
  loadingUser: boolean;
  token: string | null;
  isLoggedIn: boolean;
  isLoading: boolean;

  // Actions
  login: (token: string, role: ERole, refreshToken: string) => Promise<void>;
  logout: () => Promise<void>;
  reloadUser: () => Promise<void>;
  getUser: (email: string) => Promise<void>;
  initializeAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: undefined,
  employee: undefined,
  role: undefined as unknown as ERole,
  loadingUser: false,
  token: null,
  isLoggedIn: false,
  isLoading: false,

  initializeAuth: async () => {
    try {
      set({ isLoading: true });
      const token = await secureStorage.getItem("token");
      const role = await secureStorage.getItem("role");

      set({
        role: role as ERole,
        token,
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
    } finally {
      set({ isLoading: false });
    }
  },

  login: async (token: string, role: ERole, refreshToken: string) => {
    try {
      set({ isLoading: true });
      await Promise.all([
        secureStorage.setItem("role", role),
        secureStorage.setItem("token", token),
        secureStorage.setItem("refreshToken", refreshToken)
      ]);

      set({ role, token, isLoggedIn: true });
      const userEmail = decodeJWT(token).sub;
      if (userEmail) {
        await get().getUser(userEmail);
      }
    } catch (error) {
      console.error("Error during login:", error);
    } finally {
      set({ isLoading: false });
    }
  },

  logout: async () => {
    try {
      set({ isLoading: true });
      await Promise.all([
        secureStorage.removeItem("token"),
        secureStorage.removeItem("role"),
        secureStorage.removeItem("refreshToken")
      ]);

      set({
        user: undefined,
        employee: undefined,
        role: undefined as unknown as ERole,
        token: null,
        isLoggedIn: false
      });
    } catch (error) {
      console.error("Error during logout:", error);
    } finally {
      set({ isLoading: false });
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
