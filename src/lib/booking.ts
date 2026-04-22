import { supabase } from "@/integrations/supabase/client";
import { SERVICES, BARBERS } from "@/data/site";

export type CreateBookingInput = {
  serviceId: string;
  barberId: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  name: string;
  phone: string;
};

export async function fetchOccupiedSlots(barberId: string, date: string): Promise<Set<string>> {
  const { data, error } = await supabase
    .from("appointments")
    .select("appointment_time")
    .eq("barber_id", barberId)
    .eq("appointment_date", date)
    .eq("status", "confirmed");
  if (error) {
    console.error("fetchOccupiedSlots error", error);
    return new Set();
  }
  return new Set((data ?? []).map((r) => r.appointment_time));
}

export async function createBooking(input: CreateBookingInput) {
  const service = SERVICES.find((s) => s.id === input.serviceId);
  const barber = BARBERS.find((b) => b.id === input.barberId);
  if (!service || !barber) throw new Error("Serviço ou barbeiro inválido");

  const name = input.name.trim();
  const phone = input.phone.trim();
  if (name.length < 2) throw new Error("Nome muito curto");
  if (phone.length < 8) throw new Error("Telefone inválido");

  const { data, error } = await supabase
    .from("appointments")
    .insert({
      service_id: service.id,
      service_name: service.name,
      service_price: service.price,
      service_duration: service.duration,
      barber_id: barber.id,
      barber_name: barber.name,
      appointment_date: input.date,
      appointment_time: input.time,
      client_name: name,
      client_phone: phone,
      status: "confirmed",
    })
    .select()
    .single();

  if (error) {
    // Conflito de slot único = horário tomado entre o load e o submit
    if (error.code === "23505") {
      throw new Error("Esse horário acabou de ser reservado por outro cliente. Escolha outro.");
    }
    throw new Error(error.message || "Erro ao criar agendamento");
  }
  return data;
}