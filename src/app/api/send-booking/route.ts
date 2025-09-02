import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer"; // ENABLE WHEN REAL SENDING IS NEEDED

type BookingPayload = {
  departureCountry: string;
  departureCity: string;
  arrivalCountry: string;
  arrivalCity: string;
  date: string;
  fullName: string;
  phone: string;
};

// ENABLE WHEN REAL SENDING IS NEEDED
function requiredEnv(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env ${name}`);
  return v;
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as BookingPayload;

    const {
      departureCountry,
      departureCity,
      arrivalCountry,
      arrivalCity,
      date,
      fullName,
      phone,
    } = body;
    if (
      !departureCountry ||
      !departureCity ||
      !arrivalCountry ||
      !arrivalCity ||
      !date ||
      !fullName ||
      !phone
    ) {
      return NextResponse.json(
        { ok: false, error: "Invalid payload" },
        { status: 400 }
      );
    }

    // TEST MODE: disable actual sending. Uncomment below and remove this line to enable.
    // await new Promise((resolve) => setTimeout(resolve, 1000));
    // return NextResponse.json({ ok: true, test: true });

    // REAL SENDING
    const smtpUser = requiredEnv("SMTP_USER");
    const smtpPass = requiredEnv("SMTP_PASS");
    const mailTo = requiredEnv("BOOKING_MAIL_TO");

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: { user: smtpUser, pass: smtpPass },
    });

    const subject = `Booking request: ${departureCity} → ${arrivalCity} (${date})`;
    const text = `New booking request\n\nFrom: ${departureCountry}, ${departureCity}\nTo: ${arrivalCountry}, ${arrivalCity}\nDate: ${date}\nName: ${fullName}\nPhone: ${phone}`;

    await transporter.sendMail({
      from: smtpUser,
      to: mailTo,
      subject,
      text,
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("send-booking error", e);
    return NextResponse.json(
      { ok: false, error: "Internal error" },
      { status: 500 }
    );
  }
}
