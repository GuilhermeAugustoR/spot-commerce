import api from "@/lib/api";
import type { Product } from "@/types";
import type { ApiResponse, PaginatedResponse } from "@/types/api";

export const productService = {
  // Buscar todos os produtos
  getAllProducts: async (params?: {
    page?: number;
    limit?: number;
    category?: string;
    search?: string;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
  }): Promise<ApiResponse<PaginatedResponse<Product>>> => {
    const searchParams = new URLSearchParams();

    if (params?.page) searchParams.append("page", params.page.toString());
    if (params?.limit) searchParams.append("limit", params.limit.toString());
    if (params?.category) searchParams.append("category", params.category);
    if (params?.search) searchParams.append("search", params.search);
    if (params?.sortBy) searchParams.append("sortBy", params.sortBy);
    if (params?.sortOrder) searchParams.append("sortOrder", params.sortOrder);

    const response = await api.get(`/products?${searchParams.toString()}`);
    return response.data;
  },

  // Buscar produto por ID
  getProductById: async (productId: string): Promise<ApiResponse<Product>> => {
    const response = await api.get(`/products/${productId}`);
    return response.data;
  },

  // Criar produto (admin)
  createProduct: async (
    productData: Omit<Product, "id">
  ): Promise<ApiResponse<Product>> => {
    const response = await api.post("/admin/products", productData);
    return response.data;
  },

  // Atualizar produto (admin)
  updateProduct: async (
    productId: string,
    productData: Partial<Product>
  ): Promise<ApiResponse<Product>> => {
    const response = await api.patch(
      `/admin/products/${productId}`,
      productData
    );
    return response.data;
  },

  // Deletar produto (admin)
  deleteProduct: async (productId: string): Promise<ApiResponse<null>> => {
    const response = await api.delete(`/admin/products/${productId}`);
    return response.data;
  },

  // Buscar categorias
  getCategories: async (): Promise<ApiResponse<string[]>> => {
    const response = await api.get("/products/categories");
    return response.data;
  },
};
