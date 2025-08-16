import api from "@/lib/api";
import type { User, ApiResponse, PaginatedResponse } from "@/types/api";

export const userService = {
  // Buscar todos os usuários (admin)
  getAllUsers: async (
    page = 1,
    limit = 10,
    search?: string
  ): Promise<ApiResponse<PaginatedResponse<User>>> => {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });

    if (search) {
      params.append("search", search);
    }

    const response = await api.get(`/admin/users?${params.toString()}`);
    return response.data;
  },

  // Buscar usuário por ID
  getUserById: async (userId: string): Promise<ApiResponse<User>> => {
    const response = await api.get(`/admin/users/${userId}`);
    return response.data;
  },

  // Buscar perfil do usuário logado
  getProfile: async (): Promise<ApiResponse<User>> => {
    const response = await api.get("/profile");
    return response.data;
  },

  // Atualizar perfil do usuário
  updateProfile: async (
    userData: Partial<User>
  ): Promise<ApiResponse<User>> => {
    const response = await api.patch("/profile", userData);
    return response.data;
  },

  // Ativar/desativar usuário (admin)
  toggleUserStatus: async (userId: string): Promise<ApiResponse<User>> => {
    const response = await api.patch(`/admin/users/${userId}/toggle-status`);
    return response.data;
  },

  // Deletar usuário (admin)
  deleteUser: async (userId: string): Promise<ApiResponse<null>> => {
    const response = await api.delete(`/admin/users/${userId}`);
    return response.data;
  },
};
