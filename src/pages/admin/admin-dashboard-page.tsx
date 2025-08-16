import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, ShoppingBag, Users } from "lucide-react";

export default function AdminDashboardPage() {
  // Dados mockados para o dashboard
  const stats = [
    {
      title: "Vendas Totais (Mock)",
      value: "R$ 12,345.00",
      icon: DollarSign,
      change: "+5.2%",
    },
    {
      title: "Total de Pedidos (Mock)",
      value: "215",
      icon: ShoppingBag,
      change: "+10",
    },
    { title: "Novos Usuários (Mock)", value: "32", icon: Users, change: "+3" },
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold tracking-tight text-foreground">
        Dashboard
      </h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {stat.value}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {stat.change} desde o último mês
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      {/* Aqui você adicionaria gráficos, tabelas de pedidos recentes, etc. */}
      <Card>
        <CardHeader>
          <CardTitle>Atividade Recente (Placeholder)</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Nenhuma atividade recente para mostrar (simulação).
          </p>
          {/* Exibir lista de pedidos recentes, novos produtos, etc. */}
        </CardContent>
      </Card>
    </div>
  );
}
