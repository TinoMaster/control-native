import { apiConfig } from "config/api.config";
import { ILoginResponse, IResponse } from "types/request.types";
import { secureStorage } from "utilities/storage/secure-storage";

// requestService.ts
class RequestService {
  private async redirectToLogin() {
    await secureStorage.removeItem("token");
    await secureStorage.removeItem("role");
    await secureStorage.removeItem("refreshToken");
    alert("Sesión expirada. Por favor, inicia sesión nuevamente.");

    // En React Native, necesitarás usar la navegación apropiada
    // window.location.href = "/login";
  }

  private async getToken(): Promise<string | null> {
    const token = await secureStorage.getItem("token");
    if (!token) {
      throw new Error("Token not found. User must log in.");
    }
    return token;
  }

  private async getRefreshToken(): Promise<string | null> {
    const refreshToken = await secureStorage.getItem("refreshToken");
    if (!refreshToken) {
      throw new Error("Refresh token not found. User must log in.");
    }
    return refreshToken;
  }

  private async refreshAccessToken(): Promise<string> {
    const refreshToken = await this.getRefreshToken();

    try {
      const response = await fetch(`${apiConfig.baseUrl}/refresh-token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ refreshToken })
      });

      if (!response.ok) {
        throw new Error("Failed to refresh access token");
      }

      const res: IResponse<ILoginResponse> = await response.json();
      const newAccessToken = res.data?.token;

      if (!newAccessToken) {
        throw new Error("Access token not found in response");
      }
      await secureStorage.setItem("token", newAccessToken);

      return newAccessToken;
    } catch {
      await this.redirectToLogin();
      throw new Error("Failed to refresh access token");
    }
  }

  private async getHeadersWithValidToken(): Promise<HeadersInit> {
    let token = await this.getToken();

    if (!token) {
      throw new Error("Token not found. User must log in.");
    }

    const isTokenExpired = this.isTokenExpired(token);

    if (isTokenExpired) {
      token = await this.refreshAccessToken();
    }

    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    };
  }

  private isTokenExpired(token: string): boolean {
    if (!token) {
      return true;
    }

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const exp = payload.exp * 1000;
      return Date.now() >= exp;
    } catch {
      return true;
    }
  }

  async fetch<T>(url: string, options: RequestInit = {}): Promise<IResponse<T>> {
    const headers = await this.getHeadersWithValidToken();

    const response = await fetch(url, {
      ...options,
      headers
    });

    // Si el token ha expirado y no se pudo renovar
    if (response.status === 401) {
      throw new Error("Token expired. User must log in.");
    }

    return response.json();
  }
}

export const requestService = new RequestService();
