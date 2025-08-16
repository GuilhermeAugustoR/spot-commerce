import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router";
import SiteHeader from "@/components/layout/site-header";
import SiteFooter from "@/components/layout/site-footer";
import AdminLayout from "@/components/layout/admin-layout";
import HomePage from "@/pages/home-page";
import ProductsPage from "@/pages/products-page";
import ProductDetailPage from "@/pages/product-detail-page";
import CartPage from "@/pages/cart-page";
import CheckoutPage from "@/pages/checkout-page";
import LoginPage from "@/pages/login-page";
import PromotionsPage from "@/pages/promotions-page";
import TrackOrderPage from "@/pages/track-order-page";
import OrderConfirmationPage from "@/pages/order-confirmation-page";
import AboutPage from "@/pages/about-page";
import ContactPage from "@/pages/contact-page";
import FAQPage from "@/pages/faq-page";
import TermsPage from "@/pages/terms-page";
import PrivacyPage from "@/pages/privacy-page";
import ReturnsPage from "@/pages/returns-page";
import AdminDashboardPage from "@/pages/admin/admin-dashboard-page";
import AdminProductsPage from "@/pages/admin/admin-products-page";
import AdminOrdersPage from "@/pages/admin/admin-orders-page";
import AdminUsersPage from "@/pages/admin/admin-users-page";
import AdminAnalyticsPage from "@/pages/admin/admin-analytics-page";
import AdminSettingsPage from "@/pages/admin/admin-settings-page";

// Layout principal da loja
function SiteLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-grow">
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Rotas da Loja Principal */}
        <Route path="/" element={<SiteLayout />}>
          <Route index element={<HomePage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="products/:category" element={<ProductsPage />} />
          <Route path="product/:productId" element={<ProductDetailPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="checkout" element={<CheckoutPage />} />
          <Route
            path="order-confirmation/:orderId"
            element={<OrderConfirmationPage />}
          />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<LoginPage />} />
          <Route path="promotions" element={<PromotionsPage />} />
          <Route path="track-order" element={<TrackOrderPage />} />

          {/* Páginas Institucionais */}
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="faq" element={<FAQPage />} />
          <Route path="terms" element={<TermsPage />} />
          <Route path="privacy" element={<PrivacyPage />} />
          <Route path="returns" element={<ReturnsPage />} />

          {/* Rota 404 para páginas não encontradas da loja */}
          <Route
            path="*"
            element={
              <div className="container py-12 text-center">
                <h1 className="text-3xl font-bold">Página Não Encontrada</h1>
                <p className="mt-4 text-muted-foreground">
                  A página que você está procurando não existe.
                </p>
              </div>
            }
          />
        </Route>

        {/* Rotas do Painel de Administração */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboardPage />} />
          <Route path="products" element={<AdminProductsPage />} />
          <Route path="orders" element={<AdminOrdersPage />} />
          <Route path="users" element={<AdminUsersPage />} />
          <Route path="analytics" element={<AdminAnalyticsPage />} />
          <Route path="settings" element={<AdminSettingsPage />} />

          {/* Rota 404 para páginas não encontradas do admin */}
          <Route
            path="*"
            element={
              <div className="space-y-6 text-center">
                <h1 className="text-3xl font-bold">
                  Página Admin Não Encontrada
                </h1>
                <p className="text-muted-foreground">
                  A página de administração que você está procurando não existe.
                </p>
              </div>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
