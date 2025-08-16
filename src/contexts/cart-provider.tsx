/* eslint-disable @typescript-eslint/no-explicit-any */
import type React from "react";
import { useState, useEffect } from "react";
import type { CartItem, Product, ProductVariation } from "@/types";
import { CartContext } from "./cart-context";

export const CartProvider: React.FC<any> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const localData = localStorage.getItem("spotCommerceCart");
    return localData ? JSON.parse(localData) : [];
  });

  useEffect(() => {
    localStorage.setItem("spotCommerceCart", JSON.stringify(cart));
  }, [cart]);

  const generateCartItemId = (
    productId: string,
    variation?: ProductVariation
  ) => {
    const colorPart = variation?.color
      ? `-${variation.color.toLowerCase().replace(/\s+/g, "-")}`
      : "";
    const sizePart = variation?.size
      ? `-${variation.size.toLowerCase().replace(/\s+/g, "-")}`
      : "";
    return `${productId}${colorPart}${sizePart}`;
  };

  const addToCart = (
    product: Product,
    quantity = 1,
    variation?: ProductVariation
  ) => {
    const cartItemId = generateCartItemId(product.id, variation);

    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item.cartItemId === cartItemId
      );

      if (existingItem) {
        return prevCart.map((item) =>
          item.cartItemId === cartItemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      const newCartItem: CartItem = {
        ...product,
        quantity,
        selectedColor: variation?.color,
        selectedSize: variation?.size,
        cartItemId,
      };

      return [...prevCart, newCartItem];
    });
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.cartItemId !== cartItemId)
    );
  };

  const updateQuantity = (cartItemId: string, quantity: number) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.cartItemId === cartItemId
            ? { ...item, quantity: Math.max(0, quantity) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce(
    (sum, item) => sum + (item.promotionPrice || item.price) * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
