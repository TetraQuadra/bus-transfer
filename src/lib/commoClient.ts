const BASE_URL =
  process.env.COMMO_API_URL || "https://svitperevezengroup.kommo.com/api/v4";
const TOKEN = process.env.COMMO_AUTH_TOKEN || "";
const ENABLED = process.env.COMMO_ENABLED !== "false";

const headers = {
  Authorization: `Bearer ${TOKEN}`,
  "Content-Type": "application/json",
  Accept: "application/json",
};

async function findContactByPhone(phone: string) {
  const res = await fetch(
    `${BASE_URL}/contacts?query=${encodeURIComponent(phone)}`,
    { headers }
  );

  if (!res.ok) throw new Error(`Помилка пошуку контакту: ${res.statusText}`);

  try {
    const text = await res.text();
    if (!text) return null;

    const data = JSON.parse(text);
    return data?._embedded?.contacts?.[0] || null;
  } catch {
    return null;
  }
}

async function createContact(phone: string, name?: string) {
  const payload = [
    {
      name: name || "Без імені",
      custom_fields_values: [
        { field_code: "PHONE", values: [{ value: phone }] },
      ],
    },
  ];

  const res = await fetch(`${BASE_URL}/contacts`, {
    method: "POST",
    headers,
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Помилка створення контакту: ${res.status} - ${text}`);
  }

  const data = await res.json();
  return data?._embedded?.contacts?.[0];
}

async function createLead(contactId: number) {
  const payload = [
    {
      _embedded: { contacts: [{ id: contactId }] },
      tags_to_add: [{ id: 118558, name: "Сайт svitperevezen" }],
    },
  ];

  const res = await fetch(`${BASE_URL}/leads`, {
    method: "POST",
    headers,
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Помилка створення ліда: ${res.status} - ${text}`);
  }

  const data = await res.json();
  return data?._embedded?.leads?.[0];
}

async function addNote(leadId: number, text: string) {
  const payload = [
    {
      entity_id: leadId,
      note_type: "common",
      params: { text },
    },
  ];

  const res = await fetch(`${BASE_URL}/leads/notes`, {
    method: "POST",
    headers,
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const t = await res.text();
    throw new Error(`Помилка додавання нотатки: ${res.status} - ${t}`);
  }

  return res.json();
}

function formatNotes(data: {
  type: "passenger" | "parcel" | "pets";
  departureCountry: string;
  departureCity: string;
  arrivalCountry: string;
  arrivalCity: string;
  date?: string;
  fullName: string;
  phone: string;
  additionalInfo?: string;
}) {
  const typeLabels = {
    passenger: "Пасажирське перевезення",
    parcel: "Доставлення посилок",
    pets: "Перевезення тварин",
  };

  let note = `🆕 Нова заявка: ${typeLabels[data.type]}\n`;
  note += `Маршрут: ${data.departureCountry}, ${data.departureCity} → ${data.arrivalCountry}, ${data.arrivalCity}\n`;
  if (data.date) note += `Дата: ${data.date}\n`;
  note += `Клієнт: ${data.fullName}\n`;
  note += `Телефон: ${data.phone}\n`;
  if (data.additionalInfo)
    note += `Додаткова інформація: ${data.additionalInfo}\n`;
  return note;
}

export async function sendToCommo(bookingData: {
  type: "passenger" | "parcel" | "pets";
  departureCountry: string;
  departureCity: string;
  arrivalCountry: string;
  arrivalCity: string;
  date?: string;
  fullName: string;
  phone: string;
  additionalInfo?: string;
}) {
  if (!ENABLED) {
    return { success: true, data: { disabled: true } };
  }

  try {
    const { phone, fullName } = bookingData;
    console.log(`🔍 Пошук контакту за телефоном: ${phone}`);

    const normalizedPhone = phone.replace(/[^0-9]/g, "");

    const contact =
      (await findContactByPhone(normalizedPhone)) ||
      (await createContact(normalizedPhone, fullName));

    console.log(`✅ Контакт ID: ${contact.id}`);

    const lead = await createLead(contact.id);
    console.log(`🎯 Лід створено: ${lead.id}`);

    const noteText = formatNotes(bookingData);
    await addNote(lead.id, noteText);

    console.log(`🗒️ Нотатку додано до ліда ${lead.id}`);

    return { success: true, leadId: lead.id, contactId: contact.id };
  } catch (error) {
    console.error("❌ Помилка Kommo:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Невідома помилка",
    };
  }
}
