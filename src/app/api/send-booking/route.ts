import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

type BookingPayload = {
  departureCountry: string;
  departureCity: string;
  arrivalCountry: string;
  arrivalCity: string;
  date: string;
  fullName: string;
  phone: string;
};

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
