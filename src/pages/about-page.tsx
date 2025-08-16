import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Users, Target, Award, Heart } from "lucide-react";

export default function AboutPage() {
  const values = [
    {
      icon: Heart,
      title: "Paixão pela Moda",
      description:
        "Acreditamos que a moda é uma forma de expressão pessoal e deve refletir a individualidade de cada pessoa.",
    },
    {
      icon: Award,
      title: "Qualidade Premium",
      description:
        "Selecionamos cuidadosamente cada peça, priorizando materiais de alta qualidade e acabamento impecável.",
    },
    {
      icon: Users,
      title: "Experiência do Cliente",
      description:
        "Nosso compromisso é proporcionar uma experiência de compra excepcional, do primeiro clique à entrega.",
    },
    {
      icon: Target,
      title: "Sustentabilidade",
      description:
        "Trabalhamos com fornecedores que compartilham nossos valores de responsabilidade ambiental e social.",
    },
  ];

  return (
    <div className="container py-12 space-y-16">
      {/* Hero Section */}
      <section className="text-center space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
          Sobre a Spot Commerce
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Nascemos da paixão pela moda e do desejo de democratizar o acesso a
          peças de qualidade, criando uma experiência de compra única e
          personalizada para cada cliente.
        </p>
      </section>

      {/* Nossa História */}
      <section className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-foreground">Nossa História</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              A Spot Commerce foi fundada em 2020 com uma visão clara: tornar a
              moda acessível e sustentável para todos. Começamos como uma
              pequena loja online, focada em curadoria de peças únicas e
              atemporais.
            </p>
            <p>
              Hoje, somos uma das principais plataformas de e-commerce de moda
              do Brasil, atendendo milhares de clientes em todo o país. Nossa
              jornada é marcada pela constante busca por inovação e excelência
              no atendimento.
            </p>
            <p>
              Acreditamos que cada peça de roupa conta uma história, e queremos
              fazer parte da sua história, oferecendo produtos que combinam
              estilo, qualidade e responsabilidade social.
            </p>
          </div>
        </div>
        <div className="relative">
          <img
            src="/placeholder.svg?height=500&width=600"
            alt="Equipe Spot Commerce"
            className="rounded-lg shadow-lg w-full h-auto"
          />
        </div>
      </section>

      {/* Nossos Valores */}
      <section className="space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-foreground">Nossos Valores</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Os princípios que guiam cada decisão e definem quem somos como
            empresa.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <Card key={index} className="text-center h-full">
              <CardHeader className="pb-4">
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <value.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-lg">{value.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm leading-relaxed">
                  {value.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Números */}
      <section className="bg-muted/30 rounded-lg p-8 md:p-12">
        <div className="text-center space-y-8">
          <h2 className="text-3xl font-bold text-foreground">
            Spot Commerce em Números
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "50K+", label: "Clientes Satisfeitos" },
              { number: "1000+", label: "Produtos Únicos" },
              { number: "99%", label: "Satisfação do Cliente" },
              { number: "4 Anos", label: "No Mercado" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compromisso */}
      <section className="text-center space-y-6">
        <h2 className="text-3xl font-bold text-foreground">
          Nosso Compromisso
        </h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Continuamos evoluindo para oferecer sempre o melhor em moda,
          tecnologia e atendimento. Nosso compromisso é com você, nosso cliente,
          e com um futuro mais sustentável e inclusivo para a indústria da moda.
        </p>
      </section>
    </div>
  );
}
