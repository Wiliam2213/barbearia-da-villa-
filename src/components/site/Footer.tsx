import { Link } from "@tanstack/react-router";
import { Instagram, MapPin, Phone, Clock } from "lucide-react";
import { SITE } from "@/data/site";

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-onyx mt-24">
      <div className="mx-auto max-w-7xl px-6 py-16 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="font-display text-2xl">
            <span className="text-gradient-gold">Navalha</span>
            <span className="text-foreground"> &amp; Co.</span>
          </div>
          <p className="mt-4 text-sm text-muted-foreground max-w-sm leading-relaxed">
            Mais que uma barbearia. Um ritual de cuidado, estilo e presença para o
            cavalheiro contemporâneo.
          </p>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-widest text-gold mb-4">Navegação</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/" className="hover:text-gold transition-smooth">Início</Link></li>
            <li><Link to="/servicos" className="hover:text-gold transition-smooth">Serviços</Link></li>
            <li><Link to="/agendamento" className="hover:text-gold transition-smooth">Agendar</Link></li>
            <li><Link to="/contato" className="hover:text-gold transition-smooth">Contato</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-widest text-gold mb-4">Visite-nos</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex gap-2"><MapPin className="size-4 text-gold shrink-0 mt-0.5" />{SITE.address}</li>
            <li className="flex gap-2"><Phone className="size-4 text-gold shrink-0 mt-0.5" />{SITE.phone}</li>
            <li className="flex gap-2"><Clock className="size-4 text-gold shrink-0 mt-0.5" />{SITE.hours}</li>
            <li className="flex gap-2"><Instagram className="size-4 text-gold shrink-0 mt-0.5" />{SITE.instagram}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/30 py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} {SITE.name}. Todos os direitos reservados.
      </div>
    </footer>
  );
}