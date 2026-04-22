import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Clock, Scissors } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { SERVICES } from "@/data/site";

export const Route = createFileRoute("/servicos")({
  head: () => ({
    meta: [
      { title: "Serviços — Navalha & Co." },
      { name: "description", content: "Conheça os rituais da Navalha & Co.: corte clássico, barba real, combo cavalheiro e a Experiência Platinum." },
      { property: "og:title", content: "Serviços — Navalha & Co." },
      { property: "og:description", content: "Cortes, barba e rituais de cuidado em ambiente premium." },
    ],
  }),
  component: ServicosPage,
});

function ServicosPage() {
  return (
    <SiteLayout>
      <section className="py-24 px-6">
        <div className="mx-auto max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-[0.4em] text-gold">Cardápio</span>
            <h1 className="mt-4 font-display text-5xl md:text-6xl">
              Rituais <span className="text-gradient-gold italic">Navalha</span>
            </h1>
            <p className="mt-6 text-muted-foreground text-lg">
              Cada serviço é uma experiência completa. Tempo dedicado, produtos selecionados, mãos especialistas.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {SERVICES.map((s, i) => (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="bg-card border border-border rounded-xl p-8 flex gap-6 hover:border-gold transition-smooth"
              >
                <div className="size-14 shrink-0 rounded-full bg-gradient-gold grid place-items-center text-gold-foreground">
                  <Scissors className="size-6" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-display text-2xl">{s.name}</h3>
                    <div className="font-display text-2xl text-gradient-gold whitespace-nowrap">R$ {s.price}</div>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.description}</p>
                  <div className="mt-6 flex items-center justify-between">
                    <span className="text-xs text-muted-foreground inline-flex items-center gap-1">
                      <Clock className="size-3 text-gold" /> {s.duration} min
                    </span>
                    <Button asChild variant="goldOutline" size="sm">
                      <Link to="/agendamento" search={{ servico: s.id } as never}>Agendar</Link>
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}