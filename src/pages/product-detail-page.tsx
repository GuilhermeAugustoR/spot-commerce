import { useParams, Link } from "react-router";
import { mockProducts } from "@/data/mock-products";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ShoppingCart,
  Star,
  ChevronLeft,
  Minus,
  Plus,
  Heart,
  Share2,
  Truck,
  Shield,
  RotateCcw,
  Check,
} from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { useState } from "react";
import { formatPrice } from "@/lib/utils";
import ProductCard from "@/components/product-card";
import { Input } from "@/components/ui/input";

export default function ProductDetailPage() {
  const { productId } = useParams<{ productId: string }>();
  const { addToCart } = useCart();
  const product = mockProducts.find((p) => p.id === productId);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState<string | undefined>(
    product?.colors?.[0]
  );
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    product?.sizes?.[0]
  );
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);

  if (!product) {
    return (
      <div className="container py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">Produto Não Encontrado</h1>
        <p className="text-muted-foreground mb-8">
          O produto que você está procurando não existe ou foi removido.
        </p>
        <Button asChild size="lg" className="rounded-full">
          <Link to="/products">Voltar aos Produtos</Link>
        </Button>
      </div>
    );
  }

  // Mock de múltiplas imagens
  const productImages = [
    product.imageUrl || "/placeholder.svg?height=600&width=500",
    "/placeholder.svg?height=600&width=500",
    "/placeholder.svg?height=600&width=500",
    "/placeholder.svg?height=600&width=500",
  ];

  const relatedProducts = mockProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, quantity, {
      color: selectedColor,
      size: selectedSize,
    });
  };

  const features = [
    "Material premium de alta qualidade",
    "Acabamento impecável",
    "Design atemporal",
    "Conforto excepcional",
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="container py-6">
        <Button
          variant="ghost"
          asChild
          className="mb-6 hover:bg-muted/50 rounded-full"
        >
          <Link to="/products">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Voltar aos produtos
          </Link>
        </Button>
      </div>

      <div className="container pb-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 mb-20">
          {/* Galeria de Imagens */}
          <div className="space-y-4">
            <div className="aspect-square relative overflow-hidden rounded-2xl bg-muted/20">
              <img
                src={productImages[selectedImageIndex] || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.promotionPrice && (
                <div className="absolute top-6 left-6 bg-destructive text-destructive-foreground text-sm px-4 py-2 rounded-full font-semibold">
                  -
                  {Math.round(
                    ((product.price - product.promotionPrice) / product.price) *
                      100
                  )}
                  % OFF
                </div>
              )}
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-4">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                    selectedImageIndex === index
                      ? "border-primary shadow-md"
                      : "border-transparent hover:border-muted-foreground/20"
                  }`}
                >
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Informações do Produto */}
          <div className="space-y-8">
            <div>
              <Badge variant="outline" className="mb-4 capitalize rounded-full">
                {product.category}
              </Badge>

              <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                {product.name}
              </h1>

              {product.rating && (
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(product.rating!)
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-muted-foreground/30"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-muted-foreground">
                    {product.rating} ({product.reviews} avaliações)
                  </span>
                </div>
              )}

              <div className="mb-6">
                {product.promotionPrice ? (
                  <div className="flex items-baseline gap-4">
                    <p className="text-4xl font-bold text-primary">
                      {formatPrice(product.promotionPrice)}
                    </p>
                    <p className="text-2xl text-muted-foreground line-through">
                      {formatPrice(product.price)}
                    </p>
                  </div>
                ) : (
                  <p className="text-4xl font-bold text-primary">
                    {formatPrice(product.price)}
                  </p>
                )}
                <p className="text-sm text-muted-foreground mt-2">
                  ou 12x de{" "}
                  {formatPrice((product.promotionPrice || product.price) / 12)}{" "}
                  sem juros
                </p>
              </div>

              <p className="text-lg text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Variações */}
            <div className="space-y-6">
              {product.colors && product.colors.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-4">
                    Cor:{" "}
                    <span className="font-normal text-muted-foreground">
                      {selectedColor}
                    </span>
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-6 py-3 rounded-full border-2 font-medium transition-all ${
                          selectedColor === color
                            ? "border-primary bg-primary text-primary-foreground shadow-md"
                            : "border-border hover:border-primary/50 bg-background"
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {product.sizes && product.sizes.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-4">
                    Tamanho:{" "}
                    <span className="font-normal text-muted-foreground">
                      {selectedSize}
                    </span>
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`w-12 h-12 rounded-full border-2 font-semibold transition-all ${
                          selectedSize === size
                            ? "border-primary bg-primary text-primary-foreground shadow-md"
                            : "border-border hover:border-primary/50 bg-background"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantidade */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Quantidade</h3>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-border rounded-full">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="rounded-full"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <Input
                      type="number"
                      value={quantity}
                      onChange={(e) =>
                        setQuantity(
                          Math.max(1, Number.parseInt(e.target.value) || 1)
                        )
                      }
                      className="w-16 text-center border-0 focus-visible:ring-0"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setQuantity((q) => q + 1)}
                      className="rounded-full"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Botões de Ação */}
            <div className="space-y-4">
              <Button
                size="lg"
                className="w-full rounded-full py-4 text-lg font-semibold bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="mr-3 h-5 w-5" />
                Adicionar ao Carrinho
              </Button>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  size="lg"
                  className="flex-1 rounded-full py-4 font-semibold border-2 bg-transparent"
                  onClick={() => setIsWishlisted(!isWishlisted)}
                >
                  <Heart
                    className={`mr-2 h-5 w-5 ${
                      isWishlisted ? "fill-current text-red-500" : ""
                    }`}
                  />
                  {isWishlisted ? "Favoritado" : "Favoritar"}
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  className="flex-1 rounded-full py-4 font-semibold border-2 bg-transparent"
                >
                  <Share2 className="mr-2 h-5 w-5" />
                  Compartilhar
                </Button>
              </div>
            </div>

            {/* Benefícios */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
              <div className="flex items-center gap-3 p-4 rounded-xl bg-muted/30">
                <Truck className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-semibold text-sm">Frete Grátis</p>
                  <p className="text-xs text-muted-foreground">
                    Acima de R$ 150
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 rounded-xl bg-muted/30">
                <RotateCcw className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-semibold text-sm">Troca Grátis</p>
                  <p className="text-xs text-muted-foreground">30 dias</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 rounded-xl bg-muted/30">
                <Shield className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-semibold text-sm">Compra Segura</p>
                  <p className="text-xs text-muted-foreground">
                    SSL Certificado
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs com Informações Detalhadas */}
        <div className="mb-20">
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="grid w-full grid-cols-3 rounded-full bg-muted/50 p-1">
              <TabsTrigger value="details" className="rounded-full">
                Detalhes
              </TabsTrigger>
              <TabsTrigger value="care" className="rounded-full">
                Cuidados
              </TabsTrigger>
              <TabsTrigger value="reviews" className="rounded-full">
                Avaliações
              </TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="mt-8">
              <div className="bg-card rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-6">
                  Características do Produto
                </h3>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-semibold mb-4">
                      Principais Características
                    </h4>
                    <ul className="space-y-3">
                      {features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-3">
                          <Check className="h-5 w-5 text-primary" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-4">Especificações</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Material:</span>
                        <span>100% Algodão Premium</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Origem:</span>
                        <span>Brasil</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Modelo:</span>
                        <span>{product.id}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="care" className="mt-8">
              <div className="bg-card rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-6">
                  Instruções de Cuidado
                </h3>
                <div className="space-y-4">
                  <p>• Lavar à máquina em água fria (máx. 30°C)</p>
                  <p>• Não usar alvejante</p>
                  <p>• Secar à sombra</p>
                  <p>• Passar em temperatura baixa</p>
                  <p>• Não lavar a seco</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="mt-8">
              <div className="bg-card rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-6">
                  Avaliações dos Clientes
                </h3>
                <div className="text-center text-muted-foreground">
                  <p>Avaliações em breve...</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Produtos Relacionados */}
        {relatedProducts.length > 0 && (
          <section>
            <h2 className="text-3xl font-bold text-center mb-12">
              Você Também Pode Gostar
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
