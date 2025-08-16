import type React from "react";
import { useState, useMemo, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router";
import ProductCard from "@/components/product-card";
import { mockProducts } from "@/data/mock-products";
import type { Product } from "@/types";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Search, Filter } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Função para obter valores únicos de uma propriedade (cores, tamanhos)
const getUniqueValues = (products: Product[], key: keyof Product) => {
  const values = new Set<string>();
  products.forEach((product) => {
    const productValue = product[key];
    if (Array.isArray(productValue)) {
      productValue.forEach((val) => values.add(val as string));
    } else if (typeof productValue === "string") {
      values.add(productValue);
    }
  });
  return Array.from(values).sort();
};

export default function ProductsPage() {
  const { category: categoryParam } = useParams<{ category?: string }>();
  const location = useLocation();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("relevance");
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  // Atualizar filtros baseados nos parâmetros da URL ao carregar
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    setSearchTerm(searchParams.get("q") || "");
    setSortOption(searchParams.get("sort") || "relevance");
    setSelectedColors(searchParams.getAll("color") || []);
    setSelectedSizes(searchParams.getAll("size") || []);
    // Se houver categoria no param, não precisa estar na URL
  }, [location.search]);

  // Atualizar URL quando filtros mudam
  const updateURLParams = () => {
    const params = new URLSearchParams();
    if (searchTerm) params.set("q", searchTerm);
    if (sortOption !== "relevance") params.set("sort", sortOption);
    selectedColors.forEach((color) => params.append("color", color));
    selectedSizes.forEach((size) => params.append("size", size));

    const categoryPath = categoryParam
      ? `/products/${categoryParam}`
      : "/products";
    navigate(`${categoryPath}?${params.toString()}`, { replace: true });
  };

  // Debounce para atualização da URL ao digitar na busca
  useEffect(() => {
    const handler = setTimeout(() => {
      if (
        searchTerm !== (new URLSearchParams(location.search).get("q") || "")
      ) {
        updateURLParams();
      }
    }, 500);
    return () => clearTimeout(handler);
  }, [searchTerm, location.search]);

  // Atualizar URL imediatamente para outros filtros
  useEffect(() => {
    // Evitar chamada inicial desnecessária se os filtros já correspondem à URL
    const currentParams = new URLSearchParams(location.search);
    const sortMatches =
      (currentParams.get("sort") || "relevance") === sortOption;
    const colorsMatch =
      JSON.stringify(currentParams.getAll("color").sort()) ===
      JSON.stringify(selectedColors.sort());
    const sizesMatch =
      JSON.stringify(currentParams.getAll("size").sort()) ===
      JSON.stringify(selectedSizes.sort());

    if (!sortMatches || !colorsMatch || !sizesMatch) {
      updateURLParams();
    }
  }, [sortOption, selectedColors, selectedSizes, categoryParam]);

  const allProducts = useMemo(() => mockProducts, []);
  const availableColors = useMemo(
    () => getUniqueValues(allProducts, "colors"),
    [allProducts]
  );
  const availableSizes = useMemo(
    () => getUniqueValues(allProducts, "sizes"),
    [allProducts]
  );

  const filteredAndSortedProducts = useMemo(() => {
    let products = [...allProducts];

    if (categoryParam) {
      products = products.filter(
        (p) => p.category.toLowerCase() === categoryParam.toLowerCase()
      );
    }

    if (searchTerm) {
      products = products.filter(
        (p) =>
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedColors.length > 0) {
      products = products.filter((p) =>
        p.colors?.some((color) => selectedColors.includes(color))
      );
    }

    if (selectedSizes.length > 0) {
      products = products.filter((p) =>
        p.sizes?.some((size) => selectedSizes.includes(size))
      );
    }

    switch (sortOption) {
      case "price-asc":
        products.sort(
          (a, b) =>
            (a.promotionPrice || a.price) - (b.promotionPrice || b.price)
        );
        break;
      case "price-desc":
        products.sort(
          (a, b) =>
            (b.promotionPrice || b.price) - (a.promotionPrice || a.price)
        );
        break;
      case "name-asc":
        products.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        products.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "rating-desc":
        products.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case "newest": // Simulação, idealmente viria do backend
        products.sort((a, b) => Number.parseInt(b.id) - Number.parseInt(a.id)); // Ordena por ID decrescente
        break;
      default: // relevance (sem ordenação específica aqui, pode ser a ordem original ou do backend)
        break;
    }
    return products;
  }, [
    allProducts,
    categoryParam,
    searchTerm,
    sortOption,
    selectedColors,
    selectedSizes,
  ]);

  const handleCheckboxChange = (
    value: string,
    currentSelected: string[],
    setter: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    const newSelected = currentSelected.includes(value)
      ? currentSelected.filter((item) => item !== value)
      : [...currentSelected, value];
    setter(newSelected);
  };

  const clearFilters = () => {
    setSelectedColors([]);
    setSelectedSizes([]);
    setSearchTerm("");
    // Não reseta categoria ou ordenação por padrão, mas pode ser adicionado
    const categoryPath = categoryParam
      ? `/products/${categoryParam}`
      : "/products";
    const sortQuery = sortOption !== "relevance" ? `?sort=${sortOption}` : "";
    navigate(`${categoryPath}${sortQuery}`, { replace: true });
  };

  const hasActiveFilters =
    selectedColors.length > 0 || selectedSizes.length > 0 || searchTerm !== "";

  const pageTitle = categoryParam
    ? `Moda ${categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1)}`
    : "Todos os Produtos";

  const FiltersComponent = () => (
    <div className="space-y-6">
      <Accordion
        type="multiple"
        defaultValue={["colors", "sizes"]}
        className="w-full"
      >
        <AccordionItem value="colors">
          <AccordionTrigger className="text-base font-medium">
            Cor
          </AccordionTrigger>
          <AccordionContent className="pt-2 space-y-2">
            {availableColors.map((color) => (
              <div key={color} className="flex items-center space-x-2">
                <Checkbox
                  id={`color-${color}`}
                  checked={selectedColors.includes(color)}
                  onCheckedChange={() =>
                    handleCheckboxChange(
                      color,
                      selectedColors,
                      setSelectedColors
                    )
                  }
                />
                <Label
                  htmlFor={`color-${color}`}
                  className="text-sm font-normal cursor-pointer"
                >
                  {color}
                </Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="sizes">
          <AccordionTrigger className="text-base font-medium">
            Tamanho
          </AccordionTrigger>
          <AccordionContent className="pt-2 grid grid-cols-3 gap-2">
            {availableSizes.map((size) => (
              <Button
                key={size}
                variant={selectedSizes.includes(size) ? "default" : "outline"}
                size="sm"
                className={`w-full text-xs h-8 ${
                  selectedSizes.includes(size)
                    ? "bg-primary text-primary-foreground"
                    : "border-border"
                }`}
                onClick={() =>
                  handleCheckboxChange(size, selectedSizes, setSelectedSizes)
                }
              >
                {size}
              </Button>
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      {hasActiveFilters && (
        <Button
          variant="ghost"
          onClick={clearFilters}
          className="w-full text-primary hover:text-primary/80"
        >
          Limpar Filtros
        </Button>
      )}
    </div>
  );

  return (
    <div className="container py-8">
      <div className="mb-6 md:mb-8">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
          {pageTitle}
        </h1>
        <p className="text-muted-foreground mt-1">
          {filteredAndSortedProducts.length}{" "}
          {filteredAndSortedProducts.length === 1
            ? "produto encontrado"
            : "produtos encontrados"}
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Filtros - Sidebar para Desktop, Sheet para Mobile */}
        <aside className="hidden md:block md:w-1/4 lg:w-1/5 space-y-6">
          <h2 className="text-xl font-semibold text-foreground">Filtros</h2>
          <FiltersComponent />
        </aside>

        {/* Conteúdo Principal - Produtos */}
        <main className="w-full md:w-3/4 lg:w-4/5">
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mb-6 p-4 border rounded-lg bg-card">
            <div className="relative w-full sm:max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              <Input
                type="search"
                placeholder="Buscar por nome..."
                className="pl-9 pr-3 py-2 h-10 rounded-md w-full bg-transparent border-border focus:bg-background focus:border-primary text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <Select value={sortOption} onValueChange={setSortOption}>
                <SelectTrigger className="w-full sm:w-[200px] h-10 rounded-md border-border text-sm">
                  <SelectValue placeholder="Ordenar por" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Ordenar por</SelectLabel>
                    <SelectItem value="relevance">Relevância</SelectItem>
                    <SelectItem value="newest">Mais Recentes</SelectItem>
                    <SelectItem value="price-asc">
                      Preço: Menor para Maior
                    </SelectItem>
                    <SelectItem value="price-desc">
                      Preço: Maior para Menor
                    </SelectItem>
                    <SelectItem value="name-asc">Nome: A-Z</SelectItem>
                    <SelectItem value="name-desc">Nome: Z-A</SelectItem>
                    <SelectItem value="rating-desc">
                      Melhor Avaliados
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <div className="md:hidden">
                <Sheet open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
                  <SheetTrigger asChild>
                    <Button
                      variant="outline"
                      className="h-10 rounded-md border-border"
                    >
                      <Filter className="mr-2 h-4 w-4" /> Filtros
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-[300px] p-0">
                    <SheetHeader className="p-6 border-b">
                      <SheetTitle className="text-lg font-semibold">
                        Filtros
                      </SheetTitle>
                    </SheetHeader>
                    <div className="p-6">
                      <FiltersComponent />
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>

          {filteredAndSortedProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {filteredAndSortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Search className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
              <p className="text-xl font-medium text-foreground">
                Nenhum produto encontrado.
              </p>
              <p className="text-muted-foreground mt-2">
                Tente ajustar seus filtros ou buscar por um termo diferente.
              </p>
              {hasActiveFilters && (
                <Button
                  variant="link"
                  onClick={clearFilters}
                  className="mt-4 text-primary hover:text-primary/80"
                >
                  Limpar Filtros Ativos
                </Button>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
