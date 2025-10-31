import { formatNotes } from "./commoClient";

type BookingPayload = {
  type: "passenger" | "parcel" | "pets";
  departureCountry: string;
  departureCity: string;
  arrivalCountry: string;
  arrivalCity: string;
  date: string;
  fullName: string;
  phone: string;
  additionalInfo?: string;
};

export default async function sendToTelegram(body: BookingPayload) {
  const text = formatNotes({
    type: body.type,
    departureCountry: body.departureCountry,
    departureCity: body.departureCity,
    arrivalCountry: body.arrivalCountry,
    arrivalCity: body.arrivalCity,
    date: body.date,
    fullName: body.fullName,
    phone: body.phone,
    additionalInfo: body.additionalInfo,
  });

  await fetch(
    `https://api.telegram.org/bot${process.env.TG_BOT_TOKEN}/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: process.env.TG_CHAT_ID, text }),
    }
  );
}
