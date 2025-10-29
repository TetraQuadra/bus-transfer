/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { sendErrorReport } from "@/lib/errorTracker";
import { sendToCommo } from "@/lib/commoClient";

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
    const body = (await req.json()) as Partial<BookingPayload>;

    const {
      departureCountry,
      departureCity,
      arrivalCountry,
      arrivalCity,
      date,
      fullName,
      phone,
    } = body;
    const missing: string[] = [];
    if (!departureCountry) missing.push("departureCountry");
    if (!departureCity) missing.push("departureCity");
    if (!arrivalCountry) missing.push("arrivalCountry");
    if (!arrivalCity) missing.push("arrivalCity");
    if (!date) missing.push("date");
    if (!fullName) missing.push("fullName");
    if (!phone) missing.push("phone");
    if (missing.length > 0) {
      await sendErrorReport({
        endpoint: "/api/send-booking",
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

    // TEST MODE: disable actual sending. Uncomment below and remove this line to enable.
    // await new Promise((resolve) => setTimeout(resolve, 1000));
    // return NextResponse.json({ ok: true, test: true });

    // REAL SENDING
    // const smtpUser = requiredEnv("SMTP_USER");
    // const smtpPass = requiredEnv("SMTP_PASS");
    // const mailTo = requiredEnv("BOOKING_MAIL_TO");

    // const transporter = nodemailer.createTransport({
    //   host: "smtp.gmail.com",
    //   port: 465,
    //   secure: true,
    //   auth: { user: smtpUser, pass: smtpPass },
    // });

    // const subject = `Booking request: ${departureCity} → ${arrivalCity} (${date})`;
    // const text = `New booking request\n\nFrom: ${departureCountry}, ${departureCity}\nTo: ${arrivalCountry}, ${arrivalCity}\nDate: ${date}\nName: ${fullName}\nPhone: ${phone}`;

    // await transporter.sendMail({
    //   from: smtpUser,
    //   to: mailTo,
    //   subject,
    //   text,
    // });

    try {
      const commoResult = await sendToCommo({
        type: "passenger",
        departureCountry: departureCountry!,
        departureCity: departureCity!,
        arrivalCountry: arrivalCountry!,
        arrivalCity: arrivalCity!,
        date: date!,
        fullName: fullName!,
        phone: phone!,
      });

      if (!commoResult.success) {
        console.warn("Failed to send to Commo CRM:", commoResult.error);
      }
    } catch (commoError) {
      console.warn("Commo CRM integration error:", commoError);
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    await sendErrorReport({
      endpoint: "/api/send-booking",
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
