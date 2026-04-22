import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Scissors, Star, Clock, MapPin, ChevronRight } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { SERVICES, BARBERS, TESTIMONIALS, SITE } from "@/data/site";
import heroImg from "@/assets/hero-barber.jpg";
import shopImg from "@/assets/shop-interior.jpg";
import toolsImg from "@/assets/tools.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Navalha & Co. — Barbearia premium em São Paulo" },
      { name: "description", content: "Barbearia premium em São Paulo. Corte, barba e ritual de cuidados em ambiente exclusivo. Agende seu horário online." },
      { property: "og:title", content: "Navalha & Co. — Barbearia premium" },
      { property: "og:description", content: "Mais que uma barbearia. Um ritual de estilo e presença para o cavalheiro contemporâneo." },
      { property: "og:image", content: "/src/assets/hero-barber.jpg" },
    ],
  }),
  component: Index,
});

function Index() {
  const featured = SERVICES.slice(0, 3);
  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative h-[92vh] min-h-[600px] overflow-hidden">
        <img
          src={heroImg}
          alt="Cliente recebendo corte premium na Navalha & Co."
          className="absolute inset-0 w-full h-full object-cover"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="relative z-10 mx-auto max-w-7xl px-6 h-full flex flex-col justify-end pb-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-xs uppercase tracking-[0.4em] text-gold mb-6"
          >
            Desde 2014 · São Paulo
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-5xl md:text-7xl lg:text-8xl leading-[1.05] max-w-4xl"
          >
            Seu estilo <br />
            <span className="text-gradient-gold italic">começa aqui.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-6 max-w-xl text-lg text-muted-foreground"
          >
            Cortes precisos, barbas desenhadas e um ritual de cuidado que transforma sua rotina em experiência.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mt-10 flex flex-col sm:flex-row gap-4"
          >
            <Button asChild variant="hero" size="xl">
              <Link to="/agendamento">Agendar horário</Link>
            </Button>
            <Button asChild variant="goldOutline" size="xl">
              <a href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noreferrer">
                Falar no WhatsApp
              </a>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* MANIFESTO */}
      <section className="py-24 px-6">
        <div className="mx-auto max-w-5xl text-center">
          <span className="text-xs uppercase tracking-[0.4em] text-gold">Manifesto</span>
          <h2 className="mt-6 font-display text-3xl md:text-5xl leading-tight">
            Um cavalheiro não busca apenas um corte.
            <br />
            <span className="text-gradient-gold italic">Busca uma assinatura.</span>
          </h2>
          <p className="mt-8 text-muted-foreground text-lg leading-relaxed max-w-3xl mx-auto">
            Na Navalha &amp; Co., cada detalhe é projetado para que você saia com mais do que um visual renovado: uma postura. Toalha quente, óleos selecionados, navalha afiada e tempo só para você.
          </p>
        </div>
      </section>

      {/* SERVIÇOS DESTAQUE */}
      <section className="py-24 px-6 bg-gradient-onyx">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
            <div>
              <span className="text-xs uppercase tracking-[0.4em] text-gold">Serviços</span>
              <h2 className="mt-4 font-display text-4xl md:text-5xl">Nossos rituais</h2>
            </div>
            <Link to="/servicos" className="text-sm text-gold hover:text-gold-soft inline-flex items-center gap-1">
              Ver todos <ChevronRight className="size-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {featured.map((s, i) => (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group bg-card border border-border rounded-xl p-8 hover:border-gold transition-smooth"
              >
                <Scissors className="size-8 text-gold mb-6" />
                <h3 className="font-display text-2xl">{s.name}</h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{s.description}</p>
                <div className="mt-8 flex items-end justify-between">
                  <div className="text-2xl font-display text-gradient-gold">R$ {s.price}</div>
                  <div className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="size-3" /> {s.duration} min
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AMBIENTE / SOBRE */}
      <section className="py-24 px-6">
        <div className="mx-auto max-w-7xl grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <img src={shopImg} alt="Ambiente da Navalha & Co." loading="lazy" width={1600} height={1000} className="rounded-xl shadow-elegant w-full" />
            <img src={toolsImg} alt="Ferramentas premium" loading="lazy" width={1400} height={900} className="hidden md:block absolute -bottom-12 -right-12 w-1/2 rounded-xl shadow-gold border-4 border-background" />
          </motion.div>
          <div>
            <span className="text-xs uppercase tracking-[0.4em] text-gold">A casa</span>
            <h2 className="mt-4 font-display text-4xl md:text-5xl leading-tight">
              Um templo masculino no <span className="text-gradient-gold italic">coração de SP.</span>
            </h2>
            <p className="mt-6 text-muted-foreground leading-relaxed">
              Ambiente com curadoria de iluminação, mármore preto, cadeiras italianas e trilha sonora pensada nota por nota. Aqui o tempo desacelera.
            </p>
            <div className="mt-10 grid grid-cols-3 gap-4">
              {[
                { v: "10+", l: "Anos de casa" },
                { v: "30k", l: "Atendimentos" },
                { v: "4.9★", l: "Avaliação Google" },
              ].map((x) => (
                <div key={x.l} className="border border-border rounded-lg p-4 text-center">
                  <div className="font-display text-2xl text-gradient-gold">{x.v}</div>
                  <div className="text-xs text-muted-foreground mt-1">{x.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* BARBEIROS */}
      <section className="py-24 px-6 bg-gradient-onyx">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-[0.4em] text-gold">Time</span>
            <h2 className="mt-4 font-display text-4xl md:text-5xl">Mestres da navalha</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {BARBERS.map((b, i) => (
              <motion.div
                key={b.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative overflow-hidden rounded-xl"
              >
                <img src={b.image} alt={b.name} loading="lazy" width={900} height={1100} className="w-full h-[480px] object-cover group-hover:scale-105 transition-smooth" />
                <div className="absolute inset-0 bg-gradient-to-t from-onyx via-onyx/40 to-transparent" />
                <div className="absolute bottom-0 inset-x-0 p-6">
                  <h3 className="font-display text-2xl">{b.name}</h3>
                  <p className="text-sm text-gold mt-1">{b.specialty}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* DEPOIMENTOS */}
      <section className="py-24 px-6">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-[0.4em] text-gold">Provas sociais</span>
            <h2 className="mt-4 font-display text-4xl md:text-5xl">O que dizem os clientes</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="bg-card border border-border rounded-xl p-8">
                <div className="flex gap-1 text-gold mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="size-4 fill-current" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">"{t.text}"</p>
                <div className="mt-6">
                  <div className="font-display text-base">{t.name}</div>
                  <div className="text-xs text-gold mt-0.5">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-24 px-6">
        <div className="mx-auto max-w-5xl bg-gradient-onyx border border-gold/30 rounded-2xl p-12 md:p-16 text-center shadow-elegant">
          <MapPin className="size-8 text-gold mx-auto mb-6" />
          <h2 className="font-display text-4xl md:text-5xl">
            Pronto para a próxima <span className="text-gradient-gold italic">cadeira?</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Reserve seu horário em menos de 60 segundos. Sem ligação, sem fila.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="hero" size="xl">
              <Link to="/agendamento">Agendar agora</Link>
            </Button>
            <Button asChild variant="goldOutline" size="xl">
              <Link to="/contato">Como chegar</Link>
            </Button>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
