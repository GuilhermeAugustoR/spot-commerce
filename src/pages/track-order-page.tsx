"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

// Mock de status de pedido
const mockOrderStatus = {
  "12345XYZ": {
    status: "Em trânsito",
    details: "Seu pedido saiu para entrega.",
    estimatedDelivery: "28 de Junho, 2025",
    items: [
      { name: "Camiseta Básica de Algodão", quantity: 1 },
      { name: "Calça Jeans Slim Fit", quantity: 1 },
    ],
    history: [
      { date: "25/06/2025", status: "Pedido realizado" },
      { date: "26/06/2025", status: "Pagamento confirmado" },
      { date: "27/06/2025", status: "Pedido enviado" },
      { date: "28/06/2025", status: "Em trânsito" },
    ],
  },
  "98765ABC": {
    status: "Entregue",
    details: "Seu pedido foi entregue com sucesso.",
    estimatedDelivery: "20 de Junho, 2025",
    items: [{ name: "Vestido Floral Midi", quantity: 1 }],
    history: [
      { date: "18/06/2025", status: "Pedido realizado" },
      { date: "18/06/2025", status: "Pagamento confirmado" },
      { date: "19/06/2025", status: "Pedido enviado" },
      { date: "20/06/2025", status: "Entregue" },
    ],
  },
};

type OrderStatusKey = keyof typeof mockOrderStatus;

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState("");
  const [orderDetails, setOrderDetails] = useState<
    (typeof mockOrderStatus)[OrderStatusKey] | null | undefined
  >(null); // undefined for not found

  const handleTrackOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderId in mockOrderStatus) {
      setOrderDetails(mockOrderStatus[orderId as OrderStatusKey]);
    } else {
      setOrderDetails(undefined); // Pedido não encontrado
    }
  };

  return (
    <div className="flex flex-col items-center py-12 space-y-8">
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Acompanhar Pedido</CardTitle>
          <CardDescription>
            Insira o ID do seu pedido para ver o status.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleTrackOrder}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="orderId">ID do Pedido</Label>
              <Input
                id="orderId"
                placeholder="Ex: 12345XYZ"
                value={orderId}
                onChange={(e) => {
                  setOrderId(e.target.value.toUpperCase());
                  setOrderDetails(null); // Limpa detalhes ao digitar novo ID
                }}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">
              Rastrear
            </Button>
          </CardFooter>
        </form>
      </Card>

      {orderDetails === undefined && (
        <Card className="w-full max-w-lg">
          <CardHeader>
            <CardTitle className="text-destructive">
              Pedido não encontrado
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>Verifique o ID do pedido e tente novamente.</p>
          </CardContent>
        </Card>
      )}

      {orderDetails && orderDetails !== undefined && (
        <Card className="w-full max-w-lg">
          <CardHeader>
            <CardTitle>Status do Pedido: {orderId}</CardTitle>
            <CardDescription>
              Status atual:{" "}
              <span className="font-semibold text-primary">
                {orderDetails.status}
              </span>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>{orderDetails.details}</p>
            <p>
              <strong>Entrega Estimada:</strong>{" "}
              {orderDetails.estimatedDelivery}
            </p>
            <div>
              <h4 className="font-semibold mb-1">Itens do Pedido:</h4>
              <ul className="list-disc list-inside text-sm text-muted-foreground">
                {orderDetails.items.map((item) => (
                  <li key={item.name}>
                    {item.name} (x{item.quantity})
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Histórico do Pedido:</h4>
              <ul className="space-y-2 text-sm">
                {orderDetails.history.map((entry, index) => (
                  <li key={index} className="flex justify-between">
                    <span>{entry.status}</span>
                    <span className="text-muted-foreground">{entry.date}</span>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
