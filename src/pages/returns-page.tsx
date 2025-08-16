import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, Package, RefreshCw } from "lucide-react";
import { Link } from "react-router";

export default function ReturnsPage() {
  const steps = [
    {
      icon: Package,
      title: "Solicite a Devolução",
      description:
        "Entre em contato conosco em até 30 dias após o recebimento do produto.",
    },
    {
      icon: RefreshCw,
      title: "Prepare o Produto",
      description:
        "Embale o item em sua embalagem original com todas as etiquetas.",
    },
    {
      icon: Clock,
      title: "Aguarde a Coleta",
      description:
        "Enviaremos um código de postagem gratuito ou agendaremos a coleta.",
    },
    {
      icon: CheckCircle,
      title: "Receba o Reembolso",
      description:
        "Após a análise, processaremos o reembolso em até 5 dias úteis.",
    },
  ];

  return (
    <div className="container py-12 space-y-12">
      {/* Header */}
      <section className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
          Trocas e Devoluções
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Sua satisfação é nossa prioridade. Conheça nossa política de trocas e
          devoluções.
        </p>
      </section>

      {/* Política Geral */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Política de Devolução</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-foreground mb-2">
                ✅ Você pode devolver:
              </h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Produtos em até 30 dias após o recebimento</li>
                <li>• Itens em condições originais</li>
                <li>• Produtos com etiquetas e embalagens</li>
                <li>• Itens não utilizados ou danificados</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">
                ❌ Não aceitamos devolução de:
              </h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Produtos personalizados</li>
                <li>• Itens íntimos (por questões de higiene)</li>
                <li>• Produtos danificados pelo uso</li>
                <li>• Itens sem etiquetas originais</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Como Funciona */}
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Como Funciona
          </h2>
          <p className="text-muted-foreground">Processo simples em 4 passos</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <Card key={index} className="text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <step.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {step.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Prazos e Condições */}
      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Prazos Importantes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">
                Prazo para solicitar:
              </span>
              <span className="font-medium">30 dias</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Análise do produto:</span>
              <span className="font-medium">2-3 dias úteis</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Reembolso:</span>
              <span className="font-medium">5-7 dias úteis</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Troca:</span>
              <span className="font-medium">7-10 dias úteis</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Formas de Reembolso</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                <strong>Cartão de Crédito:</strong> Estorno na fatura em 1-2
                ciclos
              </p>
              <p className="text-sm text-muted-foreground">
                <strong>PIX/Débito:</strong> Depósito na conta em 5-7 dias úteis
              </p>
              <p className="text-sm text-muted-foreground">
                <strong>Boleto:</strong> Depósito na conta informada
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* FAQ Rápido */}
      <Card>
        <CardHeader>
          <CardTitle>Perguntas Frequentes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-medium text-foreground mb-1">
              Posso trocar por outro tamanho/cor?
            </h4>
            <p className="text-sm text-muted-foreground">
              Sim! Basta solicitar a troca e especificar o novo produto
              desejado.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-foreground mb-1">
              Quem paga o frete da devolução?
            </h4>
            <p className="text-sm text-muted-foreground">
              Para defeitos de fabricação, nós pagamos. Para desistência, o
              frete é por conta do cliente.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-foreground mb-1">
              Posso devolver produtos em promoção?
            </h4>
            <p className="text-sm text-muted-foreground">
              Sim, produtos em promoção seguem a mesma política de devolução.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Call to Action */}
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="p-8 text-center">
          <h3 className="text-xl font-semibold text-foreground mb-2">
            Precisa fazer uma devolução?
          </h3>
          <p className="text-muted-foreground mb-4">
            Nossa equipe está pronta para ajudar você com o processo.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild>
              <Link to="/contact">Solicitar Devolução</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/track-order">Acompanhar Pedido</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
