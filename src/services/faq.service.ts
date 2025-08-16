import api from "@/lib/api";
import type { FAQ, ApiResponse } from "@/types/api";

export const faqService = {
  // Buscar todas as FAQs
  getFAQs: async (): Promise<ApiResponse<FAQ[]>> => {
    const response = await api.get("/faq");
    return response.data;
  },

  // Buscar FAQs por categoria
  getFAQsByCategory: async (category: string): Promise<ApiResponse<FAQ[]>> => {
    const response = await api.get(`/faq?category=${category}`);
    return response.data;
  },
};
