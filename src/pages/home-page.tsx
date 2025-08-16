import ProductCard from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { mockProducts } from "@/data/mock-products";
import { Link } from "react-router";
import {
  ChevronRight,
  ShoppingBag,
  Tag,
  Sparkles,
  ArrowRight,
} from "lucide-react";

export default function HomePage() {
  const featuredProducts = mockProducts.slice(0, 8);
  const promotionProducts = mockProducts
    .filter((p) => p.promotionPrice)
    .slice(0, 4);

  return (
    <div className="space-y-24">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="container">
          <div className="py-20 md:py-32 text-center">
            <div className="max-w-4xl mx-auto space-y-8">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                <Sparkles className="h-4 w-4" />
                Nova Coleção Disponível
              </div>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-tight">
                Elegância
                <span className="block text-primary">Atemporal</span>
              </h1>

              <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Descubra peças únicas que definem tendências e celebram sua
                individualidade
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
                <Button
                  size="lg"
                  className="rounded-full px-8 py-4 text-base font-semibold bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-300"
                  asChild
                >
                  <Link to="/products">
                    <ShoppingBag className="mr-2 h-5 w-5" />
                    Explorar Coleção
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full px-8 py-4 text-base font-semibold border-2 hover:bg-muted/50 bg-transparent"
                  asChild
                >
                  <Link to="/promotions">
                    <Tag className="mr-2 h-5 w-5" />
                    Ver Ofertas
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Background decoration */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl"></div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Produtos em Destaque
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Selecionamos especialmente para você as peças mais desejadas da
            temporada
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center">
          <Button
            variant="outline"
            size="lg"
            className="rounded-full px-8 py-4 font-semibold border-2 bg-transparent"
            asChild
          >
            <Link to="/products">
              Ver Todos os Produtos
              <ChevronRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Promotions Section */}
      {promotionProducts.length > 0 && (
        <section className="bg-muted/30">
          <div className="container py-20">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Ofertas Especiais
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Aproveite descontos exclusivos em peças selecionadas
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              {promotionProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            <div className="text-center">
              <Button
                size="lg"
                className="rounded-full px-8 py-4 font-semibold bg-primary hover:bg-primary/90"
                asChild
              >
                <Link to="/promotions">
                  Ver Todas as Ofertas
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Categories Section */}
      <section className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Explore por Categoria
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Encontre exatamente o que você procura em nossas categorias
            especializadas
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: "Masculino",
              description: "Estilo e sofisticação para o homem moderno",
              img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=600&fit=crop&crop=center",
              link: "/products/masculino",
            },
            {
              name: "Feminino",
              description: "Elegância e feminilidade em cada detalhe",
              img: "https://images.unsplash.com/photo-1494790108755-2616c9c0e8e0?w=500&h=600&fit=crop&crop=center",
              link: "/products/feminino",
            },
            {
              name: "Acessórios",
              description: "Detalhes que fazem toda a diferença",
              img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=600&fit=crop&crop=center",
              link: "/products/acessorios",
            },
          ].map((category) => (
            <Link
              key={category.name}
              to={category.link}
              className="group relative overflow-hidden rounded-2xl bg-card hover:shadow-xl transition-all duration-500 hover:-translate-y-2"
            >
              <div className="aspect-[4/5] relative">
                <img
                  src={category.img || "/placeholder.svg"}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                <p className="text-white/90 mb-4">{category.description}</p>
                <div className="inline-flex items-center gap-2 text-sm font-semibold">
                  Explorar
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
