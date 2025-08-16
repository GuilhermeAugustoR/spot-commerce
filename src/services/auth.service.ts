import api from "@/lib/api";
import type { ApiResponse, User } from "@/types/api";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export const authService = {
  // Login
  login: async (
    credentials: LoginCredentials
  ): Promise<ApiResponse<AuthResponse>> => {
    const response = await api.post("/auth/login", credentials);

    if (response.data.success && response.data.data.token) {
      localStorage.setItem("authToken", response.data.data.token);
    }

    return response.data;
  },

  // Registro
  register: async (
    userData: RegisterData
  ): Promise<ApiResponse<AuthResponse>> => {
    const response = await api.post("/auth/register", userData);

    if (response.data.success && response.data.data.token) {
      localStorage.setItem("authToken", response.data.data.token);
    }

    return response.data;
  },

  // Logout
  logout: async (): Promise<void> => {
    try {
      await api.post("/auth/logout");
    } catch (error) {
      // Mesmo se der erro na API, remove o token local
      console.error("Erro ao fazer logout:", error);
    } finally {
      localStorage.removeItem("authToken");
    }
  },

  // Verificar se está logado
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem("authToken");
  },

  // Recuperar senha
  forgotPassword: async (email: string): Promise<ApiResponse<null>> => {
    const response = await api.post("/auth/forgot-password", { email });
    return response.data;
  },

  // Resetar senha
  resetPassword: async (
    token: string,
    password: string
  ): Promise<ApiResponse<null>> => {
    const response = await api.post("/auth/reset-password", {
      token,
      password,
    });
    return response.data;
  },

  // Verificar token
  verifyToken: async (): Promise<ApiResponse<User>> => {
    const response = await api.get("/auth/verify");
    return response.data;
  },
};
