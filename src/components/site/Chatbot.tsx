import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { SITE } from "@/data/site";

type Msg = { from: "bot" | "user"; text: string; options?: { label: string; value: string }[] };

const initialMsg: Msg = {
  from: "bot",
  text: "Olá! Sou o concierge da Navalha & Co. Como posso te ajudar hoje?",
  options: [
    { label: "Agendar horário", value: "book" },
    { label: "Ver serviços", value: "services" },
    { label: "Falar com atendente", value: "human" },
    { label: "Endereço e horário", value: "info" },
  ],
};

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([initialMsg]);

  function handleOption(value: string) {
    setMessages((prev) => [...prev, { from: "user", text: optionLabel(value) }]);
    setTimeout(() => {
      setMessages((prev) => [...prev, replyFor(value)]);
    }, 400);
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 size-14 rounded-full bg-gradient-gold text-gold-foreground shadow-gold flex items-center justify-center hover:scale-105 transition-smooth"
        aria-label="Abrir chat"
      >
        <MessageCircle className="size-6" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-50 w-[min(92vw,380px)] h-[520px] bg-card border border-border rounded-xl shadow-elegant flex flex-col overflow-hidden"
          >
            <div className="bg-gradient-onyx p-4 flex items-center justify-between border-b border-border">
              <div>
                <div className="font-display text-lg text-gradient-gold">Concierge</div>
                <div className="text-xs text-muted-foreground">Online agora</div>
              </div>
              <button onClick={() => setOpen(false)} aria-label="Fechar">
                <X className="size-5 text-muted-foreground hover:text-gold" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((m, i) => (
                <div key={i} className={m.from === "bot" ? "" : "flex justify-end"}>
                  <div
                    className={
                      m.from === "bot"
                        ? "bg-secondary text-foreground rounded-2xl rounded-tl-sm px-4 py-2 text-sm max-w-[85%]"
                        : "bg-gold text-gold-foreground rounded-2xl rounded-tr-sm px-4 py-2 text-sm max-w-[85%]"
                    }
                  >
                    {m.text}
                  </div>
                  {m.options && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {m.options.map((o) => (
                        <button
                          key={o.value}
                          onClick={() => handleOption(o.value)}
                          className="text-xs border border-gold/50 text-gold px-3 py-1.5 rounded-full hover:bg-gold hover:text-gold-foreground transition-smooth"
                        >
                          {o.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="border-t border-border p-3 flex gap-2">
              <Link
                to="/agendamento"
                onClick={() => setOpen(false)}
                className="flex-1 bg-gradient-gold text-gold-foreground text-sm font-medium rounded-md py-2 text-center hover:scale-[1.02] transition-smooth"
              >
                Agendar agora
              </Link>
              <a
                href={`https://wa.me/${SITE.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                className="size-9 grid place-items-center border border-gold rounded-md text-gold hover:bg-gold hover:text-gold-foreground transition-smooth"
                aria-label="WhatsApp"
              >
                <Send className="size-4" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function optionLabel(v: string) {
  switch (v) {
    case "book": return "Quero agendar um horário";
    case "services": return "Quais são os serviços?";
    case "human": return "Quero falar com atendente";
    case "info": return "Qual o endereço e horário?";
    default: return v;
  }
}

function replyFor(v: string): Msg {
  switch (v) {
    case "book":
      return {
        from: "bot",
        text: "Perfeito! Você pode agendar em poucos cliques pelo botão abaixo, ou se preferir falar com um atendente, é só clicar.",
        options: [{ label: "Falar no WhatsApp", value: "human" }],
      };
    case "services":
      return {
        from: "bot",
        text: "Temos Corte Clássico (R$70), Barba Real (R$55), Combo Cavalheiro (R$110) e a Experiência Platinum (R$180). Veja todos com fotos na página de Serviços.",
      };
    case "human":
      return {
        from: "bot",
        text: `Claro! É só chamar a gente no WhatsApp ${SITE.phone}. Respondemos em minutos.`,
      };
    case "info":
      return {
        from: "bot",
        text: `Estamos em ${SITE.address}. Funcionamos ${SITE.hours}.`,
      };
    default:
      return { from: "bot", text: "Não entendi, escolha uma das opções acima." };
  }
}