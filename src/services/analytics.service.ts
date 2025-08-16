/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "@/lib/api";
import type { ApiResponse } from "@/types/api";

export const analyticsService = {
  // Buscar dados de analytics
  getAnalytics: async (
    period?: "7d" | "30d" | "90d" | "1y"
  ): Promise<ApiResponse<any>> => {
    const params = period ? `?period=${period}` : "";
    const response = await api.get(`/admin/analytics${params}`);
    return response.data;
  },

  // Buscar dados de vendas por período
  getSalesData: async (
    startDate: string,
    endDate: string
  ): Promise<ApiResponse<any>> => {
    const response = await api.get(
      `/admin/analytics/sales?start=${startDate}&end=${endDate}`
    );
    return response.data;
  },

  // Buscar produtos mais vendidos
  getTopProducts: async (limit = 10): Promise<ApiResponse<any[]>> => {
    const response = await api.get(
      `/admin/analytics/top-products?limit=${limit}`
    );
    return response.data;
  },
};
