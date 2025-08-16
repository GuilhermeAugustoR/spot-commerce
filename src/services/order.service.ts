import api from "@/lib/api";
import type { Order, ApiResponse, PaginatedResponse } from "@/types/api";

export const orderService = {
  // Buscar todos os pedidos (admin)
  getAllOrders: async (
    page = 1,
    limit = 10
  ): Promise<ApiResponse<PaginatedResponse<Order>>> => {
    const response = await api.get(`/admin/orders?page=${page}&limit=${limit}`);
    return response.data;
  },

  // Buscar pedido por ID
  getOrderById: async (orderId: string): Promise<ApiResponse<Order>> => {
    const response = await api.get(`/orders/${orderId}`);
    return response.data;
  },

  // Buscar pedidos do usuário logado
  getUserOrders: async (
    page = 1,
    limit = 10
  ): Promise<ApiResponse<PaginatedResponse<Order>>> => {
    const response = await api.get(`/orders?page=${page}&limit=${limit}`);
    return response.data;
  },

  // Criar novo pedido
  createOrder: async (
    orderData: Omit<Order, "id" | "createdAt" | "updatedAt">
  ): Promise<ApiResponse<Order>> => {
    const response = await api.post("/orders", orderData);
    return response.data;
  },

  // Atualizar status do pedido (admin)
  updateOrderStatus: async (
    orderId: string,
    status: Order["status"]
  ): Promise<ApiResponse<Order>> => {
    const response = await api.patch(`/admin/orders/${orderId}/status`, {
      status,
    });
    return response.data;
  },

  // Cancelar pedido
  cancelOrder: async (orderId: string): Promise<ApiResponse<Order>> => {
    const response = await api.patch(`/orders/${orderId}/cancel`);
    return response.data;
  },
};
