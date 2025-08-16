import api from "@/lib/api";
import type { ContactForm, ApiResponse } from "@/types/api";

export const contactService = {
  // Enviar mensagem de contato
  sendMessage: async (data: ContactForm): Promise<ApiResponse<null>> => {
    const response = await api.post("/contact", data);
    return response.data;
  },
};
