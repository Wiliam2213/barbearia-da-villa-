import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Clock, User, Calendar as CalendarIcon, Phone, ChevronRight, Sparkles, Loader2 } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { SERVICES, BARBERS, TIME_SLOTS, SITE } from "@/data/site";
import { fetchOccupiedSlots, createBooking } from "@/lib/booking";

export const Route = createFileRoute("/agendamento")({
  head: () => ({
    meta: [
      { title: "Agendar — Navalha & Co." },
      { name: "description", content: "Agende seu horário na Navalha & Co. em poucos cliques. Escolha serviço, barbeiro, data e horário." },
      { property: "og:title", content: "Agendar — Navalha & Co." },
      { property: "og:description", content: "Reserve sua cadeira em menos de 60 segundos." },
    ],
  }),
  component: AgendamentoPage,
});

type Step = 1 | 2 | 3 | 4;

function AgendamentoPage() {
  const [step, setStep] = useState<Step>(1);
  const [serviceId, setServiceId] = useState<string | null>(null);
  const [barberId, setBarberId] = useState<string | null>(null);
  const [date, setDate] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [done, setDone] = useState(false);
  const [occupied, setOccupied] = useState<Set<string>>(new Set());
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const service = SERVICES.find((s) => s.id === serviceId);
  const barber = BARBERS.find((b) => b.id === barberId);

  const dates = useMemo(() => {
    const out: { iso: string; label: string; weekday: string; day: string }[] = [];
    const now = new Date();
    for (let i = 0; i < 14; i++) {
      const d = new Date(now);
      d.setDate(now.getDate() + i);
      out.push({
        iso: d.toISOString().slice(0, 10),
        label: d.toLocaleDateString("pt-BR", { day: "2-digit", month: "short" }),
        weekday: d.toLocaleDateString("pt-BR", { weekday: "short" }).replace(".", ""),
        day: d.toLocaleDateString("pt-BR", { day: "2-digit" }),
      });
    }
    return out;
  }, []);

  // Busca horários ocupados reais quando barbeiro + data estão escolhidos
  useEffect(() => {
    if (!barberId || !date) {
      setOccupied(new Set());
      return;
    }
    let cancelled = false;
    setLoadingSlots(true);
    fetchOccupiedSlots(barberId, date)
      .then((set) => {
        if (!cancelled) setOccupied(set);
      })
      .finally(() => {
        if (!cancelled) setLoadingSlots(false);
      });
    return () => {
      cancelled = true;
    };
  }, [barberId, date]);

  function next() {
    if (step === 1 && !serviceId) return toast.error("Escolha um serviço");
    if (step === 2 && !barberId) return toast.error("Escolha um barbeiro");
    if (step === 3 && (!date || !time)) return toast.error("Escolha data e horário");
    setStep((s) => (Math.min(4, s + 1) as Step));
  }
  function back() {
    setStep((s) => (Math.max(1, s - 1) as Step));
  }

  async function submit() {
    if (!name.trim() || !phone.trim()) return toast.error("Preencha nome e telefone");
    if (!serviceId || !barberId || !date || !time) return toast.error("Dados incompletos");
    setSubmitting(true);
    try {
      await createBooking({ serviceId, barberId, date, time, name, phone });
      setDone(true);
      toast.success("Agendamento confirmado!", {
        description: `${service?.name} com ${barber?.name}`,
      });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Erro ao agendar";
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <SiteLayout>
      <section className="py-20 px-6">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <span className="text-xs uppercase tracking-[0.4em] text-gold">Reserva</span>
            <h1 className="mt-4 font-display text-5xl md:text-6xl">
              Agende sua <span className="text-gradient-gold italic">cadeira.</span>
            </h1>
          </div>

          {!done && <Stepper step={step} />}

          <div className="mt-12 bg-card border border-border rounded-2xl p-6 md:p-10 shadow-elegant">
            {done ? (
              <Confirmation
                service={service?.name ?? ""}
                barber={barber?.name ?? ""}
                date={date ?? ""}
                time={time ?? ""}
                name={name}
              />
            ) : (
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                >
                  {step === 1 && (
                    <div>
                      <StepTitle title="Escolha o serviço" subtitle="Qual ritual você quer hoje?" />
                      <div className="mt-8 grid md:grid-cols-2 gap-4">
                        {SERVICES.map((s) => (
                          <button
                            key={s.id}
                            onClick={() => setServiceId(s.id)}
                            className={`text-left p-5 rounded-xl border transition-smooth ${
                              serviceId === s.id
                                ? "border-gold bg-gold/10 shadow-gold"
                                : "border-border hover:border-gold/50"
                            }`}
                          >
                            <div className="flex items-start justify-between">
                              <div>
                                <div className="font-display text-lg">{s.name}</div>
                                <div className="text-xs text-muted-foreground mt-1 inline-flex items-center gap-1">
                                  <Clock className="size-3" /> {s.duration} min
                                </div>
                              </div>
                              <div className="font-display text-lg text-gradient-gold">R$ {s.price}</div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div>
                      <StepTitle title="Escolha o barbeiro" subtitle="Quem cuidará de você?" />
                      <div className="mt-8 grid md:grid-cols-3 gap-4">
                        {BARBERS.map((b) => (
                          <button
                            key={b.id}
                            onClick={() => setBarberId(b.id)}
                            className={`text-left rounded-xl border overflow-hidden transition-smooth ${
                              barberId === b.id
                                ? "border-gold shadow-gold"
                                : "border-border hover:border-gold/50"
                            }`}
                          >
                            <img src={b.image} alt={b.name} className="w-full h-48 object-cover" />
                            <div className="p-4">
                              <div className="font-display text-lg">{b.name}</div>
                              <div className="text-xs text-gold mt-1">{b.specialty}</div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div>
                      <StepTitle title="Data e horário" subtitle="Próximos 14 dias" />
                      <div className="mt-8">
                        <div className="flex gap-3 overflow-x-auto pb-3">
                          {dates.map((d) => (
                            <button
                              key={d.iso}
                              onClick={() => { setDate(d.iso); setTime(null); }}
                              className={`shrink-0 w-20 py-4 rounded-xl border text-center transition-smooth ${
                                date === d.iso
                                  ? "border-gold bg-gold/10"
                                  : "border-border hover:border-gold/50"
                              }`}
                            >
                              <div className="text-xs uppercase text-muted-foreground">{d.weekday}</div>
                              <div className="font-display text-2xl mt-1">{d.day}</div>
                            </button>
                          ))}
                        </div>

                        {date && (
                          <div className="mt-8">
                            <h4 className="text-xs uppercase tracking-widest text-gold mb-4">Horários disponíveis</h4>
                            <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
                              {TIME_SLOTS.map((t) => {
                                const off = occupied.has(t);
                                return (
                                  <button
                                    key={t}
                                    disabled={off}
                                    onClick={() => setTime(t)}
                                    className={`py-2 rounded-md text-sm border transition-smooth ${
                                      off
                                        ? "opacity-30 line-through cursor-not-allowed border-border"
                                        : time === t
                                          ? "bg-gold text-gold-foreground border-gold"
                                          : "border-border hover:border-gold text-foreground"
                                    }`}
                                  >
                                    {t}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {step === 4 && (
                    <div>
                      <StepTitle title="Seus dados" subtitle="Última etapa" />
                      <div className="mt-8 grid md:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="name">Nome completo</Label>
                          <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Seu nome" className="mt-2" />
                        </div>
                        <div>
                          <Label htmlFor="phone">Telefone / WhatsApp</Label>
                          <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="(11) 99999-9999" className="mt-2" />
                        </div>
                      </div>

                      <div className="mt-8 bg-secondary/40 border border-border rounded-xl p-5 space-y-2 text-sm">
                        <div className="text-xs uppercase tracking-widest text-gold">Resumo</div>
                        <Row label="Serviço" value={`${service?.name} · R$ ${service?.price}`} />
                        <Row label="Barbeiro" value={barber?.name ?? ""} />
                        <Row label="Data" value={new Date(date!).toLocaleDateString("pt-BR", { weekday: "long", day: "2-digit", month: "long" })} />
                        <Row label="Horário" value={time ?? ""} />
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            )}

            {!done && (
              <div className="mt-10 flex items-center justify-between">
                <Button variant="ghost" onClick={back} disabled={step === 1}>
                  Voltar
                </Button>
                {step < 4 ? (
                  <Button variant="hero" size="lg" onClick={next}>
                    Continuar <ChevronRight className="size-4" />
                  </Button>
                ) : (
                  <Button variant="hero" size="lg" onClick={submit}>
                    Confirmar agendamento
                  </Button>
                )}
              </div>
            )}
          </div>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            Prefere humano? <a href={`https://wa.me/${SITE.whatsapp}`} className="text-gold hover:underline">Fale no WhatsApp</a>
          </p>
        </div>
      </section>
    </SiteLayout>
  );
}

function Stepper({ step }: { step: Step }) {
  const items = [
    { n: 1, label: "Serviço", icon: Sparkles },
    { n: 2, label: "Barbeiro", icon: User },
    { n: 3, label: "Data", icon: CalendarIcon },
    { n: 4, label: "Dados", icon: Phone },
  ];
  return (
    <div className="flex items-center justify-center gap-2 md:gap-4">
      {items.map((i, idx) => {
        const active = step === i.n;
        const done = step > i.n;
        const Icon = i.icon;
        return (
          <div key={i.n} className="flex items-center gap-2 md:gap-4">
            <div className={`flex items-center gap-2 ${active || done ? "text-gold" : "text-muted-foreground"}`}>
              <div className={`size-9 rounded-full grid place-items-center border transition-smooth ${
                active ? "border-gold bg-gold/10" : done ? "border-gold bg-gold text-gold-foreground" : "border-border"
              }`}>
                {done ? <Check className="size-4" /> : <Icon className="size-4" />}
              </div>
              <span className="hidden md:inline text-xs uppercase tracking-widest">{i.label}</span>
            </div>
            {idx < items.length - 1 && <div className={`w-6 md:w-12 h-px ${step > i.n ? "bg-gold" : "bg-border"}`} />}
          </div>
        );
      })}
    </div>
  );
}

function StepTitle({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div>
      <h2 className="font-display text-3xl">{title}</h2>
      <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <span className="text-muted-foreground">{label}</span>
      <span className="text-foreground font-medium text-right">{value}</span>
    </div>
  );
}

function Confirmation({ service, barber, date, time, name }: { service: string; barber: string; date: string; time: string; name: string }) {
  return (
    <div className="text-center py-10">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="size-20 mx-auto rounded-full bg-gradient-gold grid place-items-center text-gold-foreground shadow-gold"
      >
        <Check className="size-10" />
      </motion.div>
      <h2 className="mt-8 font-display text-4xl">Tudo certo, {name.split(" ")[0]}!</h2>
      <p className="mt-3 text-muted-foreground">
        Sua cadeira está reservada com <span className="text-gold">{barber}</span>.
      </p>
      <div className="mt-8 inline-block text-left bg-secondary/40 border border-border rounded-xl p-6 space-y-2 text-sm">
        <Row label="Serviço" value={service} />
        <Row label="Data" value={new Date(date).toLocaleDateString("pt-BR", { weekday: "long", day: "2-digit", month: "long" })} />
        <Row label="Horário" value={time} />
      </div>
      <p className="mt-8 text-xs text-muted-foreground">
        Você receberá uma confirmação no WhatsApp em instantes.
      </p>
    </div>
  );
}