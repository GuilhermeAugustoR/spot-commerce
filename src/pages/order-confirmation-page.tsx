import { useParams, Link } from "react-router";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle, Package, Home, ShoppingBag } from "lucide-react";
import { useEffect } from "react";

export default function OrderConfirmationPage() {
  const { orderId } = useParams<{ orderId: string }>();

  // Simular dados do pedido (em um app real, viria do backend)
  const orderData = {
    id: orderId || "MOCK-ORDER-123",
    total: "R$ 459,80",
    items: 3,
    estimatedDelivery: "3-5 dias úteis",
    trackingCode: "BR123456789SP",
    email: "cliente@exemplo.com", // Normalmente viria do contexto do usuário
  };

  // Scroll para o topo quando a página carrega
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container py-12 max-w-2xl mx-auto">
      <div className="text-center space-y-6">
        {/* Ícone de Sucesso */}
        <div className="flex justify-center">
          <div className="rounded-full bg-primary/10 p-6">
            <CheckCircle className="h-16 w-16 text-primary" />
          </div>
        </div>

        {/* Título Principal */}
        <div className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
            Pedido Confirmado!
          </h1>
          <p className="text-lg text-muted-foreground">
            Obrigado pela sua compra. Seu pedido foi processado com sucesso.
          </p>
        </div>

        {/* Card com Detalhes do Pedido */}
        <Card className="text-left">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5 text-primary" />
              Detalhes do Pedido
            </CardTitle>
            <CardDescription>
              Enviamos um email de confirmação para{" "}
              <strong>{orderData.email}</strong>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Número do Pedido</p>
                <p className="font-semibold text-foreground">{orderData.id}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Total Pago</p>
                <p className="font-semibold text-foreground">
                  {orderData.total}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">Itens</p>
                <p className="font-semibold text-foreground">
                  {orderData.items} produtos
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">Previsão de Entrega</p>
                <p className="font-semibold text-foreground">
                  {orderData.estimatedDelivery}
                </p>
              </div>
            </div>

            <div className="pt-4 border-t">
              <p className="text-sm text-muted-foreground mb-2">
                Código de Rastreamento
              </p>
              <div className="flex items-center justify-between bg-muted/50 p-3 rounded-md">
                <code className="text-sm font-mono text-foreground">
                  {orderData.trackingCode}
                </code>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    navigator.clipboard.writeText(orderData.trackingCode)
                  }
                >
                  Copiar
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Próximos Passos */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">O que acontece agora?</CardTitle>
          </CardHeader>
          <CardContent className="text-left space-y-3 text-sm">
            <div className="flex items-start gap-3">
              <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
              </div>
              <div>
                <p className="font-medium text-foreground">Processamento</p>
                <p className="text-muted-foreground">
                  Estamos preparando seus itens para envio.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="rounded-full bg-muted p-1 mt-0.5">
                <div className="w-2 h-2 bg-muted-foreground rounded-full"></div>
              </div>
              <div>
                <p className="font-medium text-foreground">Envio</p>
                <p className="text-muted-foreground">
                  Você receberá um email quando o pedido for enviado.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="rounded-full bg-muted p-1 mt-0.5">
                <div className="w-2 h-2 bg-muted-foreground rounded-full"></div>
              </div>
              <div>
                <p className="font-medium text-foreground">Entrega</p>
                <p className="text-muted-foreground">
                  Acompanhe seu pedido usando o código de rastreamento.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Botões de Ação */}
        <div className="flex flex-col sm:flex-row gap-3 pt-6">
          <Button asChild className="flex-1">
            <Link to="/track-order">
              <Package className="mr-2 h-4 w-4" />
              Acompanhar Pedido
            </Link>
          </Button>
          <Button variant="outline" asChild className="flex-1">
            <Link to="/products">
              <ShoppingBag className="mr-2 h-4 w-4" />
              Continuar Comprando
            </Link>
          </Button>
          <Button variant="outline" asChild className="flex-1">
            <Link to="/">
              <Home className="mr-2 h-4 w-4" />
              Voltar ao Início
            </Link>
          </Button>
        </div>

        {/* Informações Adicionais */}
        <div className="pt-8 text-center text-sm text-muted-foreground">
          <p>
            Precisa de ajuda? Entre em contato conosco pelo{" "}
            <Link to="/contact" className="text-primary hover:underline">
              nosso suporte
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
