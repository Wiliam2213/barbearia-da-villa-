import barber1 from "@/assets/barber-1.jpg";
import barber2 from "@/assets/barber-2.jpg";
import barber3 from "@/assets/barber-3.jpg";

export const SITE = {
  name: "Navalha & Co.",
  tagline: "Seu estilo começa aqui.",
  phone: "+55 11 99999-0000",
  whatsapp: "5511999990000",
  address: "Rua Augusta, 1234 — Jardins, São Paulo — SP",
  hours: "Ter–Sáb · 10h às 21h",
  email: "contato@navalhaco.com",
  instagram: "@navalha.co",
};

export const SERVICES = [
  {
    id: "corte-classico",
    name: "Corte Clássico",
    description: "Corte sob medida, máquina e tesoura, finalizado com toalha quente.",
    price: 70,
    duration: 45,
    icon: "scissors",
  },
  {
    id: "barba-real",
    name: "Barba Real",
    description: "Modelagem com navalha, óleos essenciais e toalha quente.",
    price: 55,
    duration: 40,
    icon: "razor",
  },
  {
    id: "combo-cavalheiro",
    name: "Combo Cavalheiro",
    description: "Corte + Barba + ritual completo de cuidados. O nosso queridinho.",
    price: 110,
    duration: 75,
    icon: "crown",
  },
  {
    id: "platinum",
    name: "Experiência Platinum",
    description: "Corte, barba, hidratação capilar, limpeza de pele e drink cortesia.",
    price: 180,
    duration: 120,
    icon: "sparkles",
  },
  {
    id: "infantil",
    name: "Corte Infantil",
    description: "Atendimento especial para os pequenos cavalheiros.",
    price: 50,
    duration: 30,
    icon: "smile",
  },
  {
    id: "pigmentacao",
    name: "Pigmentação",
    description: "Disfarce de falhas com pigmento de longa duração.",
    price: 90,
    duration: 60,
    icon: "brush",
  },
];

export const BARBERS = [
  {
    id: "rafael",
    name: "Rafael Monte",
    specialty: "Cortes clássicos e degradês",
    image: barber1,
  },
  {
    id: "diego",
    name: "Diego Alves",
    specialty: "Navalha e barbas desenhadas",
    image: barber2,
  },
  {
    id: "matheus",
    name: "Matheus Vidal",
    specialty: "Pompadour e estilo vintage",
    image: barber3,
  },
];

export const TESTIMONIALS = [
  {
    name: "Lucas Ferreira",
    role: "Cliente desde 2022",
    text: "Saio da Navalha sentindo que o dia rendeu mais. Atendimento impecável e o melhor degradê da cidade.",
  },
  {
    name: "André Oliveira",
    role: "Empresário",
    text: "Ambiente premium, pontualidade e um cuidado que não se vê em qualquer lugar. Virou ritual semanal.",
  },
  {
    name: "Pedro Henrique",
    role: "Noivo 2024",
    text: "Cuidaram do meu visual no casamento. Profissionais nível concierge, recomendo de olhos fechados.",
  },
];

export const TIME_SLOTS = [
  "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "13:00", "13:30",
  "14:00", "14:30", "15:00", "15:30",
  "16:00", "16:30", "17:00", "17:30",
  "18:00", "18:30", "19:00", "19:30",
  "20:00", "20:30",
];