import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Link, useNavigate } from "react-router";
import { formatPrice } from "@/lib/utils";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ArrowLeft, CreditCard, Lock } from "lucide-react";

// Esquema de validação com Zod
const checkoutSchema = z.object({
  fullName: z.string().min(3, "Nome completo é obrigatório"),
  email: z.string().email("Email inválido"),
  phone: z.string().min(10, "Telefone inválido").optional().or(z.literal("")),
  address: z.string().min(5, "Endereço é obrigatório"),
  city: z.string().min(2, "Cidade é obrigatória"),
  state: z
    .string()
    .min(2, "Estado é obrigatório")
    .max(2, "Use a sigla do estado (ex: SP)"),
  zipCode: z.string().min(8, "CEP inválido").max(9, "CEP inválido"),
  // Campos de pagamento (simplificados para UI)
  cardNumber: z
    .string()
    .min(16, "Número do cartão inválido")
    .max(19, "Número do cartão inválido")
    .optional()
    .or(z.literal("")),
  cardExpiry: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Data de validade inválida (MM/AA)")
    .optional()
    .or(z.literal("")),
  cardCVC: z
    .string()
    .min(3, "CVC inválido")
    .max(4, "CVC inválido")
    .optional()
    .or(z.literal("")),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

export default function CheckoutPage() {
  const { cart, totalPrice, totalItems, clearCart } = useCart();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
  });

  if (cart.length === 0 && !isSubmitting) {
    // Evita redirecionar durante o submit
    // Idealmente, redirecionar para o carrinho ou home se o carrinho estiver vazio
    // setTimeout(() => navigate("/cart"),0); // Descomente se quiser redirecionar
    return (
      <div className="container py-12 text-center">
        <h1 className="text-2xl font-semibold mb-4">
          Seu carrinho está vazio.
        </h1>
        <p className="text-muted-foreground mb-6">
          Adicione itens ao seu carrinho antes de prosseguir para o checkout.
        </p>
        <Button asChild>
          <Link to="/products">Continuar Comprando</Link>
        </Button>
      </div>
    );
  }

  const onSubmit: SubmitHandler<CheckoutFormData> = async (data) => {
    console.log("Dados do Checkout:", data);
    // Simulação de processamento de pagamento
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // AQUI VOCÊ INTEGRARIA COM O GATEWAY DE PAGAMENTO (Stripe, PagSeguro, etc.)
    // E ENVIARIA OS DADOS PARA O SEU BACKEND PARA PROCESSAR O PEDIDO.

    alert("Pedido realizado com sucesso! (Simulação)"); // MENSAGEM MOCK
    clearCart();
    navigate("/order-confirmation/mock-order-id"); // Redirecionar para uma página de confirmação
  };

  return (
    <div className="container py-8 md:py-12">
      <Button
        variant="outline"
        size="sm"
        onClick={() => navigate("/cart")}
        className="mb-6 group"
      >
        <ArrowLeft className="mr-2 h-4 w-4 group-hover:translate-x-[-2px] transition-transform" />
        Voltar ao Carrinho
      </Button>

      <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-8">
        Finalizar Compra
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start"
      >
        {/* Coluna de Formulários */}
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">
                Informações de Contato e Entrega
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="fullName">Nome Completo</Label>
                <Input
                  id="fullName"
                  {...register("fullName")}
                  placeholder="Seu nome completo"
                />
                {errors.fullName && (
                  <p className="text-sm text-destructive mt-1">
                    {errors.fullName.message}
                  </p>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    {...register("email")}
                    placeholder="seu@email.com"
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="phone">Telefone (Opcional)</Label>
                  <Input
                    id="phone"
                    type="tel"
                    {...register("phone")}
                    placeholder="(XX) XXXXX-XXXX"
                  />
                  {errors.phone && (
                    <p className="text-sm text-destructive mt-1">
                      {errors.phone.message}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <Label htmlFor="address">Endereço</Label>
                <Input
                  id="address"
                  {...register("address")}
                  placeholder="Rua, Número, Complemento"
                />
                {errors.address && (
                  <p className="text-sm text-destructive mt-1">
                    {errors.address.message}
                  </p>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="city">Cidade</Label>
                  <Input id="city" {...register("city")} />
                  {errors.city && (
                    <p className="text-sm text-destructive mt-1">
                      {errors.city.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="state">Estado (UF)</Label>
                  <Input id="state" {...register("state")} placeholder="SP" />
                  {errors.state && (
                    <p className="text-sm text-destructive mt-1">
                      {errors.state.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="zipCode">CEP</Label>
                  <Input
                    id="zipCode"
                    {...register("zipCode")}
                    placeholder="00000-000"
                  />
                  {errors.zipCode && (
                    <p className="text-sm text-destructive mt-1">
                      {errors.zipCode.message}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center">
                <CreditCard className="mr-2 h-5 w-5 text-primary" /> Informações
                de Pagamento
              </CardTitle>
              <CardDescription>
                Esta é uma simulação. Não insira dados reais de cartão.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="cardNumber">Número do Cartão (Simulado)</Label>
                <Input
                  id="cardNumber"
                  {...register("cardNumber")}
                  placeholder="0000 0000 0000 0000"
                />
                {errors.cardNumber && (
                  <p className="text-sm text-destructive mt-1">
                    {errors.cardNumber.message}
                  </p>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="cardExpiry">Validade (MM/AA)</Label>
                  <Input
                    id="cardExpiry"
                    {...register("cardExpiry")}
                    placeholder="MM/AA"
                  />
                  {errors.cardExpiry && (
                    <p className="text-sm text-destructive mt-1">
                      {errors.cardExpiry.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="cardCVC">CVC</Label>
                  <Input
                    id="cardCVC"
                    {...register("cardCVC")}
                    placeholder="000"
                  />
                  {errors.cardCVC && (
                    <p className="text-sm text-destructive mt-1">
                      {errors.cardCVC.message}
                    </p>
                  )}
                </div>
              </div>
              <p className="text-xs text-muted-foreground flex items-center mt-2">
                <Lock className="mr-1 h-3 w-3" /> Suas informações de pagamento
                são processadas de forma segura (simulação).
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Coluna de Resumo do Pedido */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="sticky top-24">
            {" "}
            {/* Torna o resumo fixo ao rolar */}
            <CardHeader>
              <CardTitle className="text-xl">Resumo do Pedido</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-start text-sm"
                >
                  <div className="flex items-start gap-3">
                    <img
                      src={item.imageUrl || "/placeholder.svg"}
                      alt={item.name}
                      className="w-12 h-16 object-contain rounded border p-0.5"
                    />
                    <div>
                      <p className="font-medium text-foreground line-clamp-1">
                        {item.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Qtd: {item.quantity}
                      </p>
                    </div>
                  </div>
                  <p className="font-medium text-foreground">
                    {formatPrice(
                      (item.promotionPrice || item.price) * item.quantity
                    )}
                  </p>
                </div>
              ))}
              <Separator className="my-3" />
              <div className="flex justify-between text-sm">
                <p className="text-muted-foreground">
                  Subtotal ({totalItems} {totalItems === 1 ? "item" : "itens"})
                </p>
                <p className="text-muted-foreground">
                  {formatPrice(totalPrice)}
                </p>
              </div>
              <div className="flex justify-between text-sm">
                <p className="text-muted-foreground">Frete</p>
                <p className="text-primary font-medium">Grátis</p>{" "}
                {/* Ou calcular frete */}
              </div>
              <Separator className="my-3" />
              <div className="flex justify-between text-lg font-bold text-foreground">
                <p>Total</p>
                <p>{formatPrice(totalPrice)}</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Processando..." : "Finalizar Compra e Pagar"}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </form>
    </div>
  );
}
