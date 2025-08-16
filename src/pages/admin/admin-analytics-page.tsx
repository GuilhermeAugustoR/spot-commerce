/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DollarSign,
  ShoppingBag,
  Users,
  TrendingUp,
  TrendingDown,
  Calendar,
} from "lucide-react";
import { analyticsService } from "@/services/analytics.service";
import { formatPrice } from "@/lib/utils";

export default function AdminAnalyticsPage() {
  const [analytics, setAnalytics] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState<
    "7d" | "30d" | "90d" | "1y"
  >("30d");

  useEffect(() => {
    loadAnalytics();
  }, [selectedPeriod]);

  const loadAnalytics = async () => {
    try {
      setIsLoading(true);
      const response = await analyticsService.getAnalytics(selectedPeriod);
      if (response.success) {
        setAnalytics(response.data);
      }
    } catch (error) {
      console.error("Erro ao carregar analytics:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const periodLabels = {
    "7d": "Últimos 7 dias",
    "30d": "Últimos 30 dias",
    "90d": "Últimos 90 dias",
    "1y": "Último ano",
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Analytics</h1>
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Carregando dados...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Analytics
        </h1>
        <div className="flex items-center gap-4">
          <Select
            value={selectedPeriod}
            onValueChange={(value: any) => setSelectedPeriod(value)}
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Últimos 7 dias</SelectItem>
              <SelectItem value="30d">Últimos 30 dias</SelectItem>
              <SelectItem value="90d">Últimos 90 dias</SelectItem>
              <SelectItem value="1y">Último ano</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={loadAnalytics}>
            <Calendar className="mr-2 h-4 w-4" />
            Atualizar
          </Button>
        </div>
      </div>

      {/* Métricas Principais */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Vendas Totais</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatPrice(analytics?.totalSales || 0)}
            </div>
            <div className="flex items-center text-xs text-muted-foreground">
              {analytics?.salesGrowth >= 0 ? (
                <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
              ) : (
                <TrendingDown className="mr-1 h-3 w-3 text-red-500" />
              )}
              <span
                className={
                  analytics?.salesGrowth >= 0
                    ? "text-green-500"
                    : "text-red-500"
                }
              >
                {Math.abs(analytics?.salesGrowth || 0).toFixed(1)}%
              </span>
              <span className="ml-1">vs período anterior</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total de Pedidos
            </CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {analytics?.totalOrders || 0}
            </div>
            <div className="flex items-center text-xs text-muted-foreground">
              {analytics?.ordersGrowth >= 0 ? (
                <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
              ) : (
                <TrendingDown className="mr-1 h-3 w-3 text-red-500" />
              )}
              <span
                className={
                  analytics?.ordersGrowth >= 0
                    ? "text-green-500"
                    : "text-red-500"
                }
              >
                {Math.abs(analytics?.ordersGrowth || 0).toFixed(1)}%
              </span>
              <span className="ml-1">vs período anterior</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Novos Usuários
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {analytics?.totalUsers || 0}
            </div>
            <div className="flex items-center text-xs text-muted-foreground">
              {analytics?.usersGrowth >= 0 ? (
                <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
              ) : (
                <TrendingDown className="mr-1 h-3 w-3 text-red-500" />
              )}
              <span
                className={
                  analytics?.usersGrowth >= 0
                    ? "text-green-500"
                    : "text-red-500"
                }
              >
                {Math.abs(analytics?.usersGrowth || 0).toFixed(1)}%
              </span>
              <span className="ml-1">vs período anterior</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ticket Médio</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatPrice(
                analytics?.totalOrders > 0
                  ? (analytics?.totalSales || 0) / (analytics?.totalOrders || 1)
                  : 0
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              Valor médio por pedido
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Produtos Mais Vendidos */}
        <Card>
          <CardHeader>
            <CardTitle>Produtos Mais Vendidos</CardTitle>
            <CardDescription>
              Top produtos no período selecionado
            </CardDescription>
          </CardHeader>
          <CardContent>
            {analytics?.topProducts && analytics.topProducts.length > 0 ? (
              <div className="space-y-4">
                {analytics.topProducts
                  .slice(0, 5)
                  .map((product: any, index: number) => (
                    <div
                      key={product.productId}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <Badge
                          variant="outline"
                          className="w-6 h-6 p-0 flex items-center justify-center text-xs"
                        >
                          {index + 1}
                        </Badge>
                        <div>
                          <p className="font-medium text-sm">
                            {product.productName}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {product.sales} vendas
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-sm">
                          {formatPrice(product.revenue)}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-8">
                Nenhum dado disponível
              </p>
            )}
          </CardContent>
        </Card>

        {/* Pedidos Recentes */}
        <Card>
          <CardHeader>
            <CardTitle>Pedidos Recentes</CardTitle>
            <CardDescription>Últimos pedidos realizados</CardDescription>
          </CardHeader>
          <CardContent>
            {analytics?.recentOrders && analytics.recentOrders.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-xs">ID</TableHead>
                    <TableHead className="text-xs">Cliente</TableHead>
                    <TableHead className="text-xs">Total</TableHead>
                    <TableHead className="text-xs">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {analytics.recentOrders.slice(0, 5).map((order: any) => (
                    <TableRow key={order.id}>
                      <TableCell className="text-xs font-medium">
                        {order.id}
                      </TableCell>
                      <TableCell className="text-xs">
                        {order.shippingAddress?.fullName || "N/A"}
                      </TableCell>
                      <TableCell className="text-xs">
                        {formatPrice(order.total)}
                      </TableCell>
                      <TableCell className="text-xs">
                        <Badge variant="outline" className="text-xs">
                          {order.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <p className="text-center text-muted-foreground py-8">
                Nenhum pedido recente
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Resumo do Período */}
      <Card>
        <CardHeader>
          <CardTitle>Resumo do Período</CardTitle>
          <CardDescription>{periodLabels[selectedPeriod]}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-primary">
                {analytics?.totalOrders || 0}
              </p>
              <p className="text-sm text-muted-foreground">Pedidos</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-primary">
                {formatPrice(analytics?.totalSales || 0)}
              </p>
              <p className="text-sm text-muted-foreground">Faturamento</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-primary">
                {analytics?.totalUsers || 0}
              </p>
              <p className="text-sm text-muted-foreground">Novos Clientes</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-primary">
                {analytics?.topProducts?.length || 0}
              </p>
              <p className="text-sm text-muted-foreground">Produtos Vendidos</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
