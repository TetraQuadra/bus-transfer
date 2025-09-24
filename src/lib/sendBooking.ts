export type SendBookingPayload = {
  departureCountry: string;
  departureCity: string;
  arrivalCountry: string;
  arrivalCity: string;
  date: string;
  fullName: string;
  phone: string;
};

export async function sendBooking(payload: SendBookingPayload): Promise<void> {
  const res = await fetch("/api/send-booking", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    throw new Error("Send failed");
  }
}
