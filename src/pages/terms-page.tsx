import { Card, CardContent } from "@/components/ui/card";

export default function TermsPage() {
  return (
    <div className="container py-12 max-w-4xl">
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            Termos de Serviço
          </h1>
          <p className="text-lg text-muted-foreground">
            Última atualização: Janeiro de 2024
          </p>
        </div>

        <Card>
          <CardContent className="p-8 space-y-6">
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                1. Aceitação dos Termos
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Ao acessar e usar o site da Spot Commerce, você aceita e
                concorda em ficar vinculado aos termos e condições deste acordo.
                Se você não concordar com qualquer parte destes termos, não deve
                usar nosso serviço.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                2. Descrição do Serviço
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                A Spot Commerce é uma plataforma de e-commerce que oferece
                produtos de moda e acessórios. Reservamo-nos o direito de
                modificar ou descontinuar, temporária ou permanentemente, o
                serviço com ou sem aviso prévio.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                3. Conta do Usuário
              </h2>
              <div className="text-muted-foreground leading-relaxed space-y-3">
                <p>
                  Para usar certas funcionalidades do nosso serviço, você deve
                  criar uma conta. Você é responsável por:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Manter a confidencialidade de sua senha</li>
                  <li>Todas as atividades que ocorrem em sua conta</li>
                  <li>
                    Notificar-nos imediatamente sobre qualquer uso não
                    autorizado
                  </li>
                  <li>Fornecer informações precisas e atualizadas</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                4. Pedidos e Pagamentos
              </h2>
              <div className="text-muted-foreground leading-relaxed space-y-3">
                <p>Ao fazer um pedido, você concorda que:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>
                    Todas as informações fornecidas são verdadeiras e precisas
                  </li>
                  <li>
                    Você tem autorização para usar o método de pagamento
                    selecionado
                  </li>
                  <li>
                    Os preços estão sujeitos a alterações sem aviso prévio
                  </li>
                  <li>
                    Reservamo-nos o direito de recusar ou cancelar pedidos
                  </li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                5. Entrega e Devolução
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Os prazos de entrega são estimativas e podem variar. Oferecemos
                política de devolução de 30 dias para produtos em condições
                originais. Consulte nossa página de "Trocas e Devoluções" para
                mais detalhes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                6. Propriedade Intelectual
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Todo o conteúdo do site, incluindo textos, gráficos, logos,
                imagens e software, é propriedade da Spot Commerce e está
                protegido por leis de direitos autorais e marcas registradas.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                7. Limitação de Responsabilidade
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                A Spot Commerce não será responsável por danos indiretos,
                incidentais, especiais ou consequenciais resultantes do uso ou
                incapacidade de usar nosso serviço.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                8. Modificações dos Termos
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Reservamo-nos o direito de modificar estes termos a qualquer
                momento. As alterações entrarão em vigor imediatamente após a
                publicação no site. O uso continuado do serviço constitui
                aceitação dos novos termos.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                9. Contato
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Se você tiver dúvidas sobre estes Termos de Serviço, entre em
                contato conosco através da nossa página de contato ou pelo
                email: legal@spotcommerce.com
              </p>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
