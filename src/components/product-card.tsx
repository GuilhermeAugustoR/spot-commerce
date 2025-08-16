import type { Product } from "@/types";
import type React from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Star } from "lucide-react";
import { Link } from "react-router";
import { useCart } from "@/hooks/use-cart";
import { formatPrice, cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export default function ProductCard({ product, className }: ProductCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Adiciona com as primeiras opções disponíveis como padrão
    const defaultVariation = {
      color: product.colors?.[0],
      size: product.sizes?.[0],
    };

    addToCart(product, 1, defaultVariation);
  };

  return (
    <div
      className={cn(
        "group relative bg-card rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1",
        className
      )}
    >
      <Link to={`/product/${product.id}`} className="block">
        <div className="aspect-[4/5] relative overflow-hidden bg-muted/20 rounded-t-2xl">
          <img
            src={
              product.imageUrl ||
              `/placeholder.svg?height=500&width=400&query=${encodeURIComponent(
                product.name
              )}`
            }
            alt={product.name}
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
          />
          {product.promotionPrice && (
            <div className="absolute top-4 left-4 bg-destructive text-destructive-foreground text-xs px-3 py-1 rounded-full font-semibold">
              -
              {Math.round(
                ((product.price - product.promotionPrice) / product.price) * 100
              )}
              %
            </div>
          )}
        </div>
      </Link>

      <div className="p-6">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-semibold text-foreground hover:text-primary transition-colors line-clamp-2 mb-2">
            {product.name}
          </h3>
        </Link>

        {product.rating && (
          <div className="flex items-center gap-2 mb-3">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "w-4 h-4",
                    i < Math.floor(product.rating!)
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-muted-foreground/30"
                  )}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              ({product.reviews})
            </span>
          </div>
        )}

        <div className="flex items-center justify-between">
          <div>
            {product.promotionPrice ? (
              <div className="space-y-1">
                <p className="text-lg font-bold text-primary">
                  {formatPrice(product.promotionPrice)}
                </p>
                <p className="text-sm text-muted-foreground line-through">
                  {formatPrice(product.price)}
                </p>
              </div>
            ) : (
              <p className="text-lg font-bold text-primary">
                {formatPrice(product.price)}
              </p>
            )}
          </div>

          <Button
            size="sm"
            className="rounded-full w-10 h-10 p-0 bg-primary hover:bg-primary/90 shadow-md hover:shadow-lg transition-all duration-200"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
