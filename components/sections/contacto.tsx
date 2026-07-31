"use client";

// Client Component: react-hook-form (estado do formulário) e o estado de
// confirmação pós-submit exigem hooks — nenhum dos dois existe em Server
// Components.

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Clock, MapPin, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { WhatsappButton } from "@/components/ui/whatsapp-button";
import { CONTACT_INFO } from "@/lib/contact-info";

const contactFormSchema = z.object({
  nome: z.string().min(1, "O nome é obrigatório."),
  email: z.email("Introduza um email válido."),
  telefone: z
    .string()
    .min(1, "O telefone é obrigatório.")
    .regex(
      /^(\+351\s?)?[239]\d{8}$/,
      "Introduza um número de telefone português válido.",
    ),
  assunto: z.string().optional(),
  mensagem: z.string().min(10, "A mensagem deve ter pelo menos 10 caracteres."),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const DEFAULT_VALUES: ContactFormValues = {
  nome: "",
  email: "",
  telefone: "",
  assunto: "",
  mensagem: "",
};

function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: DEFAULT_VALUES,
  });

  const onSubmit = (data: ContactFormValues) => {
    // Sem integração de envio real ainda — ver TASKS.md (substituir por
    // Resend antes do lançamento). console.log só para debug em dev.
    if (process.env.NODE_ENV !== "production") {
      console.log(data);
    }
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-card flex flex-col items-start gap-4 rounded-lg border p-6">
        <h3 className="font-heading text-foreground text-xl font-medium">
          Obrigado pelo contacto!
        </h3>
        <p className="text-muted-foreground text-sm">
          Esta funcionalidade estará disponível brevemente. Entretanto, pode
          contactar-nos diretamente por telefone ou WhatsApp.
        </p>
        <WhatsappButton />
        <Button
          type="button"
          variant="ghost"
          onClick={() => {
            form.reset(DEFAULT_VALUES);
            setSubmitted(false);
          }}
        >
          Enviar nova mensagem
        </Button>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
        noValidate
      >
        <FormField
          control={form.control}
          name="nome"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input placeholder="O seu nome" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="oseuemail@exemplo.com"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="telefone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Telefone</FormLabel>
              <FormControl>
                <Input type="tel" placeholder="912 345 678" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="assunto"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Assunto (opcional)</FormLabel>
              <FormControl>
                <Input placeholder="Ex.: Ortodontia" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="mensagem"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mensagem</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Como podemos ajudar?"
                  rows={5}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="bg-accent text-accent-foreground hover:bg-accent/90"
        >
          Enviar Mensagem
        </Button>
      </form>
    </Form>
  );
}

function ContactInfo() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-start gap-3">
        <Phone
          className="text-primary mt-0.5 size-5 shrink-0"
          aria-hidden="true"
        />
        <div>
          <h3 className="font-heading text-foreground text-base font-medium">
            Telefone
          </h3>
          <p className="text-muted-foreground text-sm">{CONTACT_INFO.phone}</p>
        </div>
      </div>

      <div className="flex items-start gap-3">
        <MapPin
          className="text-primary mt-0.5 size-5 shrink-0"
          aria-hidden="true"
        />
        <div>
          <h3 className="font-heading text-foreground text-base font-medium">
            Morada
          </h3>
          <p className="text-muted-foreground text-sm">
            {CONTACT_INFO.address}
          </p>
        </div>
      </div>

      <div className="flex items-start gap-3">
        <Clock
          className="text-primary mt-0.5 size-5 shrink-0"
          aria-hidden="true"
        />
        <div>
          <h3 className="font-heading text-foreground text-base font-medium">
            Horário
          </h3>
          <p className="text-muted-foreground text-sm">{CONTACT_INFO.hours}</p>
        </div>
      </div>

      <WhatsappButton />
    </div>
  );
}

export function Contacto() {
  return (
    <section
      id="contacto"
      className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8"
    >
      <div className="mx-auto mb-12 max-w-2xl text-center">
        <h2 className="font-heading text-foreground text-3xl font-medium tracking-tight sm:text-4xl">
          Contacto
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        <ContactForm />
        <ContactInfo />
      </div>
    </section>
  );
}

export default Contacto;
