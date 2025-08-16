import { Card, CardContent } from "@/components/ui/card";

export default function PrivacyPage() {
  return (
    <div className="container py-12 max-w-4xl">
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            Política de Privacidade
          </h1>
          <p className="text-lg text-muted-foreground">
            Última atualização: Janeiro de 2024
          </p>
        </div>

        <Card>
          <CardContent className="p-8 space-y-6">
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                1. Informações que Coletamos
              </h2>
              <div className="text-muted-foreground leading-relaxed space-y-3">
                <p>
                  Coletamos informações que você nos fornece diretamente,
                  incluindo:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Informações de conta (nome, email, senha)</li>
                  <li>Informações de pagamento e entrega</li>
                  <li>Histórico de pedidos e preferências</li>
                  <li>Comunicações conosco</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                2. Como Usamos suas Informações
              </h2>
              <div className="text-muted-foreground leading-relaxed space-y-3">
                <p>Utilizamos suas informações para:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Processar e entregar seus pedidos</li>
                  <li>Fornecer atendimento ao cliente</li>
                  <li>Personalizar sua experiência de compra</li>
                  <li>Enviar comunicações sobre produtos e promoções</li>
                  <li>Melhorar nossos serviços</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                3. Compartilhamento de Informações
              </h2>
              <div className="text-muted-foreground leading-relaxed space-y-3">
                <p>Podemos compartilhar suas informações com:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>
                    Prestadores de serviços (pagamento, entrega, marketing)
                  </li>
                  <li>Autoridades legais quando exigido por lei</li>
                  <li>Parceiros comerciais com seu consentimento</li>
                </ul>
                <p>Nunca vendemos suas informações pessoais para terceiros.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                4. Cookies e Tecnologias Similares
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Utilizamos cookies e tecnologias similares para melhorar sua
                experiência, analisar o uso do site e personalizar conteúdo.
                Você pode controlar o uso de cookies através das configurações
                do seu navegador.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                5. Segurança dos Dados
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Implementamos medidas de segurança técnicas e organizacionais
                para proteger suas informações pessoais contra acesso não
                autorizado, alteração, divulgação ou destruição.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                6. Seus Direitos
              </h2>
              <div className="text-muted-foreground leading-relaxed space-y-3">
                <p>Você tem o direito de:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Acessar suas informações pessoais</li>
                  <li>Corrigir informações incorretas</li>
                  <li>Solicitar a exclusão de seus dados</li>
                  <li>Retirar o consentimento para processamento</li>
                  <li>Portabilidade de dados</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                7. Retenção de Dados
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Mantemos suas informações pessoais pelo tempo necessário para
                cumprir os propósitos descritos nesta política, a menos que um
                período de retenção mais longo seja exigido ou permitido por
                lei.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                8. Alterações nesta Política
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Podemos atualizar esta política periodicamente. Notificaremos
                sobre mudanças significativas através do nosso site ou por
                email.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                9. Contato
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Para questões sobre esta Política de Privacidade ou para exercer
                seus direitos, entre em contato conosco em:
                privacy@spotcommerce.com
              </p>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
