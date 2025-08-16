export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  imageUrl: string;
  description: string;
  colors?: string[];
  sizes?: string[];
  rating?: number;
  reviews?: number;
  promotionPrice?: number;
  images?: string[]; // Múltiplas imagens
  features?: string[]; // Características do produto
  materials?: string[]; // Materiais
  careInstructions?: string[]; // Instruções de cuidado
}

export interface CartItem extends Product {
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
  cartItemId: string; // ID único para cada item no carrinho
}

export interface ProductVariation {
  color?: string;
  size?: string;
}
