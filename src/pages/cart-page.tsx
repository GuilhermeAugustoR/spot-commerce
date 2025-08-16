/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  Tag,
  Truck,
} from "lucide-react";
import { Link } from "react-router";
import { formatPrice } from "@/lib/utils";

export default function CartPage() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalPrice,
    totalItems,
  } = useCart();

  if (cart.length === 0) {
    return (
      <div className="container py-20">
        <div className="max-w-md mx-auto text-center space-y-8">
          <div className="w-24 h-24 mx-auto bg-muted/30 rounded-full flex items-center justify-center">
            <ShoppingBag className="h-12 w-12 text-muted-foreground" />
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-4">Seu Carrinho está Vazio</h1>
            <p className="text-muted-foreground text-lg">
              Que tal explorar nossa coleção e encontrar algo especial?
            </p>
          </div>
          <Button
            size="lg"
            className="rounded-full px-8 py-4 font-semibold"
            asChild
          >
            <Link to="/products">
              Explorar Produtos
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const freeShippingThreshold = 150;
  const remainingForFreeShipping = Math.max(
    0,
    freeShippingThreshold - totalPrice
  );
  const hasVariations = (item: any) => item.selectedColor || item.selectedSize;

  return (
    <div className="container py-12">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Seu Carrinho</h1>
        <p className="text-muted-foreground">
          {totalItems} {totalItems === 1 ? "item" : "itens"} no seu carrinho
        </p>
      </div>

      {/* Barra de Frete Grátis */}
      {remainingForFreeShipping > 0 && (
        <Card className="mb-8 border-primary/20 bg-primary/5">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <Truck className="h-6 w-6 text-primary" />
              <div className="flex-1">
                <p className="font-semibold text-primary">
                  Faltam {formatPrice(remainingForFreeShipping)} para o frete
                  grátis!
                </p>
                <div className="w-full bg-primary/20 rounded-full h-2 mt-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${Math.min(
                        100,
                        (totalPrice / freeShippingThreshold) * 100
                      )}%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Lista de Produtos */}
        <div className="lg:col-span-2 space-y-6">
          {cart.map((item) => (
            <Card
              key={item.cartItemId}
              className="overflow-hidden hover:shadow-md transition-shadow"
            >
              <CardContent className="p-6">
                <div className="flex gap-6">
                  {/* Imagem do Produto */}
                  <Link
                    to={`/product/${item.id}`}
                    className="flex-shrink-0 w-24 h-32 bg-muted/20 rounded-xl overflow-hidden hover:opacity-80 transition-opacity"
                  >
                    <img
                      src={item.imageUrl || "/placeholder.svg"}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </Link>

                  {/* Informações do Produto */}
                  <div className="flex-1 space-y-3">
                    <div>
                      <Link
                        to={`/product/${item.id}`}
                        className="font-semibold text-lg hover:text-primary transition-colors line-clamp-2"
                      >
                        {item.name}
                      </Link>
                      <Badge variant="outline" className="mt-2 capitalize">
                        {item.category}
                      </Badge>
                    </div>

                    {/* Variações Selecionadas */}
                    {hasVariations(item) && (
                      <div className="flex flex-wrap gap-2">
                        {item.selectedColor && (
                          <Badge variant="secondary" className="text-xs">
                            Cor: {item.selectedColor}
                          </Badge>
                        )}
                        {item.selectedSize && (
                          <Badge variant="secondary" className="text-xs">
                            Tamanho: {item.selectedSize}
                          </Badge>
                        )}
                      </div>
                    )}

                    {/* Preço */}
                    <div className="flex items-center gap-3">
                      {item.promotionPrice ? (
                        <>
                          <span className="text-xl font-bold text-primary">
                            {formatPrice(item.promotionPrice)}
                          </span>
                          <span className="text-sm text-muted-foreground line-through">
                            {formatPrice(item.price)}
                          </span>
                          <Badge variant="destructive" className="text-xs">
                            -
                            {Math.round(
                              ((item.price - item.promotionPrice) /
                                item.price) *
                                100
                            )}
                            %
                          </Badge>
                        </>
                      ) : (
                        <span className="text-xl font-bold text-primary">
                          {formatPrice(item.price)}
                        </span>
                      )}
                    </div>

                    {/* Controles de Quantidade */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center border border-border rounded-full">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() =>
                            updateQuantity(item.cartItemId, item.quantity - 1)
                          }
                          disabled={item.quantity <= 1}
                          className="rounded-full w-10 h-10"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <Input
                          type="number"
                          value={item.quantity}
                          onChange={(e) =>
                            updateQuantity(
                              item.cartItemId,
                              Number.parseInt(e.target.value)
                            )
                          }
                          className="w-16 text-center border-0 focus-visible:ring-0"
                          min="1"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() =>
                            updateQuantity(item.cartItemId, item.quantity + 1)
                          }
                          className="rounded-full w-10 h-10"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="flex items-center gap-4">
                        <span className="text-lg font-semibold">
                          {formatPrice(
                            (item.promotionPrice || item.price) * item.quantity
                          )}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeFromCart(item.cartItemId)}
                          className="text-destructive hover:text-destructive hover:bg-destructive/10 rounded-full"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Botão Limpar Carrinho */}
          <div className="flex justify-end pt-4">
            <Button
              variant="outline"
              onClick={clearCart}
              className="text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground rounded-full bg-transparent"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Limpar Carrinho
            </Button>
          </div>
        </div>

        {/* Resumo do Pedido */}
        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle className="text-2xl">Resumo do Pedido</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Subtotal ({totalItems} {totalItems === 1 ? "item" : "itens"}
                    )
                  </span>
                  <span className="font-semibold">
                    {formatPrice(totalPrice)}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-muted-foreground">Frete</span>
                  <span className="font-semibold text-primary">
                    {remainingForFreeShipping > 0 ? "A calcular" : "Grátis"}
                  </span>
                </div>

                <Separator />

                <div className="flex justify-between text-lg">
                  <span className="font-semibold">Total</span>
                  <span className="font-bold text-primary text-xl">
                    {formatPrice(totalPrice)}
                  </span>
                </div>

                {remainingForFreeShipping === 0 && (
                  <div className="flex items-center gap-2 text-sm text-primary bg-primary/10 p-3 rounded-lg">
                    <Truck className="h-4 w-4" />
                    <span className="font-medium">
                      Parabéns! Você ganhou frete grátis
                    </span>
                  </div>
                )}
              </div>

              {/* Cupom de Desconto */}
              <div className="space-y-3">
                <div className="flex gap-2">
                  <Input
                    placeholder="Código do cupom"
                    className="rounded-full"
                  />
                  <Button
                    variant="outline"
                    className="rounded-full px-6 bg-transparent"
                  >
                    <Tag className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>

            <CardFooter className="pt-0">
              <Button
                size="lg"
                className="w-full rounded-full py-4 text-lg font-semibold bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-300"
                asChild
              >
                <Link to="/checkout">
                  Finalizar Compra
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
