import { Link, useNavigate } from "react-router";
import { ShoppingCart, User, Search, Menu, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/hooks/use-cart";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Início" },
  { href: "/products/masculino", label: "Masculino" },
  { href: "/products/feminino", label: "Feminino" },
  { href: "/products/acessorios", label: "Acessórios" },
  { href: "/promotions", label: "Promoções" },
];

export default function SiteHeader() {
  const { cart } = useCart();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const totalItemsInCart = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur-md border-b border-border/50">
      <div className="container">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Leaf className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl text-foreground group-hover:text-primary transition-colors">
              Spot Commerce
            </span>
          </Link>

          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="text-muted-foreground hover:text-foreground transition-colors font-medium relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar produtos..."
                className="pl-10 pr-4 py-2 h-10 w-[280px] bg-muted/30 border-0 rounded-full focus:bg-background focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/login")}
              className="rounded-full hover:bg-muted/50"
            >
              <User className="h-5 w-5" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="relative rounded-full hover:bg-muted/50"
              onClick={() => navigate("/cart")}
            >
              <ShoppingCart className="h-5 w-5" />
              {totalItemsInCart > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs bg-primary text-primary-foreground">
                  {totalItemsInCart}
                </Badge>
              )}
            </Button>

            <div className="lg:hidden">
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full hover:bg-muted/50"
                  >
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] bg-background">
                  <SheetHeader className="pb-6">
                    <SheetTitle>
                      <Link
                        to="/"
                        className="flex items-center gap-3"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                          <Leaf className="h-5 w-5 text-primary-foreground" />
                        </div>
                        <span className="font-bold text-lg">Spot Commerce</span>
                      </Link>
                    </SheetTitle>
                  </SheetHeader>
                  <nav className="flex flex-col space-y-2">
                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        to={link.href}
                        className="text-base py-3 px-4 rounded-lg hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-colors font-medium"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {link.label}
                      </Link>
                    ))}
                    <div className="pt-4 border-t border-border/50">
                      <Link
                        to="/track-order"
                        className="text-base py-3 px-4 rounded-lg hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-colors font-medium"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Acompanhar Pedido
                      </Link>
                    </div>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
