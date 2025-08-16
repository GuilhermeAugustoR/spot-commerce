import { Link, Outlet, useLocation } from "react-router";
import {
  Home,
  ShoppingBag,
  LayoutDashboard,
  Package,
  Users,
  BarChart3,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";

const adminNavLinks = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/products", label: "Produtos", icon: ShoppingBag },
  { href: "/admin/orders", label: "Pedidos", icon: Package },
  { href: "/admin/users", label: "Usuários", icon: Users },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/admin/settings", label: "Configurações", icon: Settings },
];

export default function AdminLayout() {
  const location = useLocation();

  return (
    <div className="flex min-h-screen bg-muted/30">
      <aside className="w-64 bg-background border-r p-6 space-y-6 hidden md:flex flex-col">
        <Link to="/admin" className="flex items-center gap-2 mb-6">
          <LayoutDashboard className="h-6 w-6 text-primary" />
          <span className="font-semibold text-xl text-foreground">
            Admin Spot
          </span>
        </Link>
        <nav className="flex-grow space-y-1">
          {adminNavLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors",
                location.pathname === link.href
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <link.icon className="h-4 w-4" />
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="mt-auto">
          <Link
            to="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          >
            <Home className="h-4 w-4" />
            Voltar à Loja
          </Link>
        </div>
      </aside>
      <div className="flex-1 flex flex-col">
        <header className="bg-background border-b p-4 md:hidden">
          {/* Header mobile para admin, pode ter um menu hamburguer */}
          <Link to="/admin" className="flex items-center gap-2">
            <LayoutDashboard className="h-6 w-6 text-primary" />
            <span className="font-semibold text-xl text-foreground">
              Admin Spot
            </span>
          </Link>
        </header>
        <main className="flex-1 p-6 md:p-8 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
