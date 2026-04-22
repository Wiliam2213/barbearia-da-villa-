import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Phone, Clock, Instagram, Mail } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { SITE } from "@/data/site";

export const Route = createFileRoute("/contato")({
  head: () => ({
    meta: [
      { title: "Contato — Navalha & Co." },
      { name: "description", content: "Endereço, telefone, horário e WhatsApp da Navalha & Co. — barbearia premium em São Paulo." },
      { property: "og:title", content: "Contato — Navalha & Co." },
      { property: "og:description", content: "Fale com a gente. Estamos no coração de SP." },
    ],
  }),
  component: ContatoPage,
});

function ContatoPage() {
  return (
    <SiteLayout>
      <section className="py-24 px-6">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-[0.4em] text-gold">Visite-nos</span>
            <h1 className="mt-4 font-display text-5xl md:text-6xl">
              Onde a <span className="text-gradient-gold italic">magia acontece.</span>
            </h1>
          </div>

          <div className="grid md:grid-cols-2 gap-10 items-stretch">
            <div className="space-y-4">
              <Info icon={<MapPin className="size-5" />} label="Endereço" value={SITE.address} />
              <Info icon={<Phone className="size-5" />} label="Telefone" value={SITE.phone} />
              <Info icon={<Clock className="size-5" />} label="Horário" value={SITE.hours} />
              <Info icon={<Mail className="size-5" />} label="Email" value={SITE.email} />
              <Info icon={<Instagram className="size-5" />} label="Instagram" value={SITE.instagram} />

              <div className="pt-4 flex gap-3">
                <Button asChild variant="hero" size="lg">
                  <a href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noreferrer">WhatsApp</a>
                </Button>
                <Button asChild variant="goldOutline" size="lg">
                  <a href={`tel:${SITE.phone.replace(/\s/g, "")}`}>Ligar agora</a>
                </Button>
              </div>
            </div>

            <div className="rounded-xl overflow-hidden border border-border min-h-[420px] shadow-elegant">
              <iframe
                title="Mapa Navalha & Co."
                src="https://www.openstreetmap.org/export/embed.html?bbox=-46.661,-23.561,-46.649,-23.553&layer=mapnik"
                className="w-full h-full min-h-[420px] grayscale-[40%]"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function Info({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex gap-4 bg-card border border-border rounded-xl p-5">
      <div className="size-10 rounded-full bg-gradient-gold text-gold-foreground grid place-items-center shrink-0">
        {icon}
      </div>
      <div>
        <div className="text-xs uppercase tracking-widest text-gold">{label}</div>
        <div className="text-foreground mt-1">{value}</div>
      </div>
    </div>
  );
}