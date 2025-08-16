"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Save, Upload, Bell, Shield, Globe, Palette } from "lucide-react";

const settingsSchema = z.object({
  siteName: z.string().min(1, "Nome do site é obrigatório"),
  siteDescription: z.string().min(1, "Descrição é obrigatória"),
  contactEmail: z.string().email("Email inválido"),
  supportPhone: z.string().min(1, "Telefone é obrigatório"),
  address: z.string().min(1, "Endereço é obrigatório"),
  freeShippingThreshold: z.number().min(0, "Valor deve ser positivo"),
  taxRate: z.number().min(0).max(100, "Taxa deve estar entre 0 e 100"),
});

type SettingsFormData = z.infer<typeof settingsSchema>;

export default function AdminSettingsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [notifications, setNotifications] = useState({
    emailOrders: true,
    emailUsers: true,
    smsOrders: false,
    pushNotifications: true,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SettingsFormData>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      siteName: "Spot Commerce",
      siteDescription: "Sua loja de moda online",
      contactEmail: "contato@spotcommerce.com",
      supportPhone: "(11) 3000-0000",
      address: "Av. Paulista, 1000 - São Paulo, SP",
      freeShippingThreshold: 150,
      taxRate: 0,
    },
  });

  const onSubmit = async (data: SettingsFormData) => {
    setIsLoading(true);
    try {
      // Aqui você faria a chamada para a API para salvar as configurações
      console.log("Salvando configurações:", data);
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simula API call
      alert("Configurações salvas com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar configurações:", error);
      alert("Erro ao salvar configurações");
    } finally {
      setIsLoading(false);
    }
  };

  const handleNotificationChange = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Configurações
        </h1>
        <p className="text-muted-foreground">
          Gerencie as configurações da sua loja
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Informações Gerais */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Informações Gerais
            </CardTitle>
            <CardDescription>Configurações básicas da loja</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="siteName">Nome da Loja</Label>
                <Input id="siteName" {...register("siteName")} />
                {errors.siteName && (
                  <p className="text-sm text-destructive mt-1">
                    {errors.siteName.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="contactEmail">Email de Contato</Label>
                <Input
                  id="contactEmail"
                  type="email"
                  {...register("contactEmail")}
                />
                {errors.contactEmail && (
                  <p className="text-sm text-destructive mt-1">
                    {errors.contactEmail.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="siteDescription">Descrição da Loja</Label>
              <Textarea
                id="siteDescription"
                {...register("siteDescription")}
                rows={3}
              />
              {errors.siteDescription && (
                <p className="text-sm text-destructive mt-1">
                  {errors.siteDescription.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="supportPhone">Telefone de Suporte</Label>
                <Input id="supportPhone" {...register("supportPhone")} />
                {errors.supportPhone && (
                  <p className="text-sm text-destructive mt-1">
                    {errors.supportPhone.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="address">Endereço</Label>
                <Input id="address" {...register("address")} />
                {errors.address && (
                  <p className="text-sm text-destructive mt-1">
                    {errors.address.message}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Configurações de Vendas */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Configurações de Vendas
            </CardTitle>
            <CardDescription>
              Configurações relacionadas a vendas e impostos
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="freeShippingThreshold">
                  Frete Grátis a partir de (R$)
                </Label>
                <Input
                  id="freeShippingThreshold"
                  type="number"
                  step="0.01"
                  {...register("freeShippingThreshold", {
                    valueAsNumber: true,
                  })}
                />
                {errors.freeShippingThreshold && (
                  <p className="text-sm text-destructive mt-1">
                    {errors.freeShippingThreshold.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="taxRate">Taxa de Imposto (%)</Label>
                <Input
                  id="taxRate"
                  type="number"
                  step="0.01"
                  {...register("taxRate", { valueAsNumber: true })}
                />
                {errors.taxRate && (
                  <p className="text-sm text-destructive mt-1">
                    {errors.taxRate.message}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notificações */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notificações
            </CardTitle>
            <CardDescription>
              Configure quando e como receber notificações
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Notificações de Pedidos por Email</Label>
                  <p className="text-sm text-muted-foreground">
                    Receba emails quando novos pedidos forem feitos
                  </p>
                </div>
                <Switch
                  checked={notifications.emailOrders}
                  onCheckedChange={() =>
                    handleNotificationChange("emailOrders")
                  }
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <Label>Notificações de Novos Usuários</Label>
                  <p className="text-sm text-muted-foreground">
                    Receba emails quando novos usuários se cadastrarem
                  </p>
                </div>
                <Switch
                  checked={notifications.emailUsers}
                  onCheckedChange={() => handleNotificationChange("emailUsers")}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <Label>SMS para Pedidos Urgentes</Label>
                  <p className="text-sm text-muted-foreground">
                    Receba SMS para pedidos que precisam de atenção
                  </p>
                </div>
                <Switch
                  checked={notifications.smsOrders}
                  onCheckedChange={() => handleNotificationChange("smsOrders")}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <Label>Notificações Push</Label>
                  <p className="text-sm text-muted-foreground">
                    Receba notificações push no navegador
                  </p>
                </div>
                <Switch
                  checked={notifications.pushNotifications}
                  onCheckedChange={() =>
                    handleNotificationChange("pushNotifications")
                  }
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Aparência */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5" />
              Aparência
            </CardTitle>
            <CardDescription>
              Personalize a aparência da sua loja
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Logo da Loja</Label>
              <div className="mt-2 flex items-center gap-4">
                <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center">
                  <Upload className="h-6 w-6 text-muted-foreground" />
                </div>
                <Button variant="outline" type="button">
                  <Upload className="mr-2 h-4 w-4" />
                  Fazer Upload
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Recomendado: 200x200px, PNG ou JPG
              </p>
            </div>

            <div>
              <Label>Tema Atual</Label>
              <div className="mt-2 flex items-center gap-2">
                <Badge variant="outline">Tema Padrão</Badge>
                <Button variant="outline" size="sm" type="button">
                  Alterar Tema
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Botão de Salvar */}
        <div className="flex justify-end">
          <Button type="submit" disabled={isLoading} size="lg">
            {isLoading ? (
              "Salvando..."
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Salvar Configurações
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
