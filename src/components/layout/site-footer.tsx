import { Link } from "react-router";
import {
  Leaf,
  Facebook,
  Instagram,
  Twitter,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export default function SiteFooter() {
  return (
    <footer className="bg-muted/30 mt-24">
      <div className="container">
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div className="lg:col-span-1 space-y-4">
              <Link to="/" className="flex items-center gap-3 group mb-4">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                  <Leaf className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="font-bold text-xl text-foreground">
                  Spot Commerce
                </span>
              </Link>
              <p className="text-muted-foreground leading-relaxed max-w-sm">
                Descubra a moda que reflete sua essência. Qualidade, estilo e
                sustentabilidade em cada peça.
              </p>
              <div className="flex space-x-4 pt-4">
                <Link
                  to="#"
                  className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <Facebook className="h-4 w-4" />
                </Link>
                <Link
                  to="#"
                  className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <Instagram className="h-4 w-4" />
                </Link>
                <Link
                  to="#"
                  className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <Twitter className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-4">Navegação</h4>
              <nav className="flex flex-col space-y-3">
                <Link
                  to="/products/masculino"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Masculino
                </Link>
                <Link
                  to="/products/feminino"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Feminino
                </Link>
                <Link
                  to="/products/acessorios"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Acessórios
                </Link>
                <Link
                  to="/promotions"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Promoções
                </Link>
              </nav>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-4">Suporte</h4>
              <nav className="flex flex-col space-y-3">
                <Link
                  to="/contact"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Contato
                </Link>
                <Link
                  to="/faq"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  FAQ
                </Link>
                <Link
                  to="/track-order"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Acompanhar Pedido
                </Link>
                <Link
                  to="/returns"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Trocas e Devoluções
                </Link>
              </nav>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-4">Contato</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Mail className="h-4 w-4 text-primary" />
                  <span className="text-sm">contato@spotcommerce.com</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Phone className="h-4 w-4 text-primary" />
                  <span className="text-sm">(11) 3000-0000</span>
                </div>
                <div className="flex items-start gap-3 text-muted-foreground">
                  <MapPin className="h-4 w-4 text-primary mt-0.5" />
                  <span className="text-sm">
                    Av. Paulista, 1000
                    <br />
                    São Paulo, SP
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-border/50 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
              <Link
                to="/terms"
                className="hover:text-primary transition-colors"
              >
                Termos de Serviço
              </Link>
              <Link
                to="/privacy"
                className="hover:text-primary transition-colors"
              >
                Política de Privacidade
              </Link>
              <Link
                to="/about"
                className="hover:text-primary transition-colors"
              >
                Sobre Nós
              </Link>
            </div>
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Spot Commerce. Todos os direitos
              reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
