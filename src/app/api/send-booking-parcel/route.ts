import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { sendErrorReport } from "@/lib/errorTracker";

type ParcelBookingPayload = {
  departureCountry: string;
  departureCity: string;
  arrivalCountry: string;
  arrivalCity: string;
  date: string;
  fullName: string;
  phone: string;
  parcelWeight: string;
};

function requiredEnv(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env ${name}`);
  return v;
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Partial<ParcelBookingPayload>;
    const {
      departureCountry,
      departureCity,
      arrivalCountry,
      arrivalCity,
      date,
      fullName,
      phone,
      parcelWeight,
    } = body;

    const missing: string[] = [];
    if (!departureCountry) missing.push("departureCountry");
    if (!departureCity) missing.push("departureCity");
    if (!arrivalCountry) missing.push("arrivalCountry");
    if (!arrivalCity) missing.push("arrivalCity");
    if (!fullName) missing.push("fullName");
    if (!phone) missing.push("phone");
    if (!parcelWeight) missing.push("parcelWeight");

    if (missing.length > 0) {
      await sendErrorReport({
        endpoint: "/api/send-booking-parcel",
        error: `Invalid payload: missing fields ${missing.join(", ")}`,
        status: 400,
        payload: body,
        timestamp: new Date().toISOString(),
        userAgent: req.headers.get("user-agent") || undefined,
        ip:
          req.headers.get("x-forwarded-for") ||
          req.headers.get("x-real-ip") ||
          undefined,
      });

      return NextResponse.json(
        { ok: false, error: "Invalid payload", missing },
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

    const subject = `Parcel delivery request: ${departureCity} → ${arrivalCity}${
      date ? ` (${date})` : ""
    }`;
    const text = `New PARCEL request\n\nFrom: ${departureCountry}, ${departureCity}\nTo: ${arrivalCountry}, ${arrivalCity}${
      date ? `\nDate: ${date}` : ""
    }\nName: ${fullName}\nPhone: ${phone}\n\nParcel weight: ${parcelWeight}`;

    await transporter.sendMail({ from: smtpUser, to: mailTo, subject, text });

    return NextResponse.json({ ok: true });
  } catch (e) {
    await sendErrorReport({
      endpoint: "/api/send-booking-parcel",
      error: e instanceof Error ? e.message : "Unknown error",
      status: 500,
      timestamp: new Date().toISOString(),
      userAgent: req.headers.get("user-agent") || undefined,
      ip:
        req.headers.get("x-forwarded-for") ||
        req.headers.get("x-real-ip") ||
        undefined,
    });

    return NextResponse.json(
      { ok: false, error: "Internal error" },
      { status: 500 }
    );
  }
}
