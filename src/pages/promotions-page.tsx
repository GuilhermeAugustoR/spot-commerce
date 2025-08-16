import ProductCard from "@/components/product-card"
import { mockProducts } from "@/data/mock-products"

export default function PromotionsPage() {
  const promotionProducts = mockProducts.filter((p) => p.promotionPrice)

  return (
    <div className="space-y-8">
      <h1 className="text-3xl md:text-4xl font-bold text-center">Promoções Imperdíveis</h1>
      <p className="text-lg text-muted-foreground text-center max-w-2xl mx-auto">
        Aproveite nossos descontos especiais em uma vasta seleção de produtos. Ofertas por tempo limitado!
      </p>

      {promotionProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {promotionProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-xl text-muted-foreground">Nenhuma promoção ativa no momento.</p>
          <p className="mt-2">Volte em breve para conferir novas ofertas!</p>
        </div>
      )}
    </div>
  )
}
