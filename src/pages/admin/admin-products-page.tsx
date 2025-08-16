"use client";

import { Card } from "@/components/ui/card";

import { useState } from "react";
import { mockProducts } from "@/data/mock-products";
import type { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, PlusCircle, Search } from "lucide-react";
import { formatPrice } from "@/lib/utils";

// Simulação de um modal/dialog para adicionar/editar produto
// import ProductFormDialog from "@/components/admin/product-form-dialog"; // Crie este componente

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>(mockProducts); // Em um app real, viria do backend
  const [searchTerm, setSearchTerm] = useState("");
  // const [isFormOpen, setIsFormOpen] = useState(false);
  // const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Funções mock para CRUD (seriam chamadas de API para o backend)
  const handleDeleteProduct = (productId: string) => {
    if (window.confirm("Tem certeza que deseja excluir este produto?")) {
      setProducts((prev) => prev.filter((p) => p.id !== productId));
      alert(`Produto ${productId} excluído (simulação).`);
    }
  };

  // const handleOpenForm = (product?: Product) => {
  //   setEditingProduct(product || null);
  //   setIsFormOpen(true);
  // };

  // const handleSaveProduct = (productData: Product) => {
  //   if (editingProduct) {
  //     setProducts(prev => prev.map(p => p.id === editingProduct.id ? {...p, ...productData} : p));
  //   } else {
  //     setProducts(prev => [...prev, {...productData, id: String(Date.now())}]); // Mock ID
  //   }
  //   alert(`Produto salvo (simulação).`);
  //   setIsFormOpen(false);
  // };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Gerenciar Produtos
        </h1>
        <Button /* onClick={() => handleOpenForm()} */>
          <PlusCircle className="mr-2 h-4 w-4" /> Adicionar Produto
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
        <Input
          type="search"
          placeholder="Buscar produtos por nome ou categoria..."
          className="pl-9 w-full md:w-1/2 lg:w-1/3"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="hidden sm:table-cell">Imagem</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>Preço</TableHead>
              <TableHead className="hidden md:table-cell">
                Estoque (Mock)
              </TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="hidden sm:table-cell">
                    <img
                      src={product.imageUrl || "/placeholder.svg"}
                      alt={product.name}
                      className="w-12 h-16 object-contain rounded border p-0.5"
                    />
                  </TableCell>
                  <TableCell className="font-medium text-foreground">
                    {product.name}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="capitalize">
                      {product.category}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {formatPrice(product.promotionPrice || product.price)}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Badge
                      variant={
                        product.id.endsWith("1") || product.id.endsWith("3")
                          ? "destructive"
                          : "default"
                      }
                    >
                      {product.id.endsWith("1") || product.id.endsWith("3")
                        ? "Baixo (5)"
                        : "Em Estoque (50+)"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Abrir menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Ações</DropdownMenuLabel>
                        <DropdownMenuItem /* onClick={() => handleOpenForm(product)} */
                        >
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem>Ver Detalhes</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive focus:bg-destructive/10"
                          onClick={() => handleDeleteProduct(product.id)}
                        >
                          Excluir
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="h-24 text-center text-muted-foreground"
                >
                  Nenhum produto encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
      {/* {isFormOpen && (
        <ProductFormDialog 
            isOpen={isFormOpen} 
            onClose={() => setIsFormOpen(false)}
            onSave={handleSaveProduct}
            product={editingProduct}
        />
      )} */}
    </div>
  );
}
