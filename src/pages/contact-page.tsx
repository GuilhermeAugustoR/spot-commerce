import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { contactService } from "@/services/contact.service";

const contactSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  subject: z.string().min(5, "Assunto deve ter pelo menos 5 caracteres"),
  message: z.string().min(10, "Mensagem deve ter pelo menos 10 caracteres"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitMessage(null);

    try {
      const response = await contactService.sendMessage(data);
      if (response.success) {
        setSubmitMessage(response.message || "Mensagem enviada com sucesso!");
        reset();
      }
    } catch (error) {
      setSubmitMessage("Erro ao enviar mensagem. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Endereço",
      content: "Av. Paulista, 1000 - Bela Vista\nSão Paulo, SP - 01310-100",
    },
    {
      icon: Phone,
      title: "Telefone",
      content: "(11) 3000-0000\n(11) 99999-9999",
    },
    {
      icon: Mail,
      title: "Email",
      content: "contato@spotcommerce.com\nsuporte@spotcommerce.com",
    },
    {
      icon: Clock,
      title: "Horário de Atendimento",
      content: "Segunda a Sexta: 9h às 18h\nSábado: 9h às 14h",
    },
  ];

  return (
    <div className="container py-12 space-y-12">
      {/* Header */}
      <section className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
          Entre em Contato
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Estamos aqui para ajudar! Entre em contato conosco através dos canais
          abaixo ou envie uma mensagem usando o formulário.
        </p>
      </section>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Informações de Contato */}
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Informações de Contato
            </h2>
            <div className="grid gap-6">
              {contactInfo.map((info, index) => (
                <Card key={index}>
                  <CardContent className="flex items-start gap-4 p-6">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <info.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">
                        {info.title}
                      </h3>
                      <p className="text-sm text-muted-foreground whitespace-pre-line">
                        {info.content}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* FAQ Rápido */}
          <Card>
            <CardHeader>
              <CardTitle>Perguntas Frequentes</CardTitle>
              <CardDescription>
                Antes de entrar em contato, confira se sua dúvida já foi
                respondida.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full" asChild>
                <a href="/faq">Ver FAQ Completo</a>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Formulário de Contato */}
        <Card>
          <CardHeader>
            <CardTitle>Envie uma Mensagem</CardTitle>
            <CardDescription>
              Preencha o formulário abaixo e responderemos o mais breve
              possível.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Nome *</Label>
                  <Input
                    id="name"
                    {...register("name")}
                    placeholder="Seu nome completo"
                  />
                  {errors.name && (
                    <p className="text-sm text-destructive mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    {...register("email")}
                    placeholder="seu@email.com"
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="subject">Assunto *</Label>
                <Input
                  id="subject"
                  {...register("subject")}
                  placeholder="Qual é o assunto da sua mensagem?"
                />
                {errors.subject && (
                  <p className="text-sm text-destructive mt-1">
                    {errors.subject.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="message">Mensagem *</Label>
                <Textarea
                  id="message"
                  {...register("message")}
                  placeholder="Descreva sua dúvida ou solicitação..."
                  rows={5}
                />
                {errors.message && (
                  <p className="text-sm text-destructive mt-1">
                    {errors.message.message}
                  </p>
                )}
              </div>

              {submitMessage && (
                <div
                  className={`p-3 rounded-md text-sm ${
                    submitMessage.includes("Erro")
                      ? "bg-destructive/10 text-destructive"
                      : "bg-primary/10 text-primary"
                  }`}
                >
                  {submitMessage}
                </div>
              )}

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  "Enviando..."
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Enviar Mensagem
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
