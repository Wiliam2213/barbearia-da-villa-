
-- Appointments table for Navalha & Co.
CREATE TABLE public.appointments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  service_id TEXT NOT NULL,
  service_name TEXT NOT NULL,
  service_price NUMERIC(10,2) NOT NULL,
  service_duration INTEGER NOT NULL,
  barber_id TEXT NOT NULL,
  barber_name TEXT NOT NULL,
  appointment_date DATE NOT NULL,
  appointment_time TEXT NOT NULL,
  client_name TEXT NOT NULL,
  client_phone TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'confirmed',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT appointments_unique_slot UNIQUE (barber_id, appointment_date, appointment_time),
  CONSTRAINT appointments_status_check CHECK (status IN ('confirmed','cancelled','completed'))
);

CREATE INDEX appointments_barber_date_idx ON public.appointments (barber_id, appointment_date);

ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;

-- Public booking flow: anyone can read occupied slots and create a reservation.
-- Updates and deletes are restricted (no policies = blocked) — admin will use service role later.
CREATE POLICY "Anyone can view appointments (for slot availability)"
  ON public.appointments FOR SELECT
  USING (true);

CREATE POLICY "Anyone can create an appointment"
  ON public.appointments FOR INSERT
  WITH CHECK (
    char_length(client_name) BETWEEN 2 AND 120
    AND char_length(client_phone) BETWEEN 8 AND 30
    AND appointment_date >= CURRENT_DATE
  );
