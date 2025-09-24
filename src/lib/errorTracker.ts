import nodemailer from "nodemailer";

const smtpUser = process.env.SMTP_USER;
const smtpPass = process.env.SMTP_PASS;
const errorReportEmail = "qvvwvvp@gmail.com";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: smtpUser,
    pass: smtpPass,
  },
});

export interface ErrorReport {
  endpoint: string;
  error: string;
  status?: number;
  payload?: unknown;
  timestamp: string;
  userAgent?: string;
  ip?: string;
}

export async function sendErrorReport(report: ErrorReport) {
  try {
    const subject = `Booking Error Report - ${report.endpoint}`;
    const text = `
Booking Form Error Report

Endpoint: ${report.endpoint}
Error: ${report.error}
Status: ${report.status || "N/A"}
Timestamp: ${report.timestamp}
User Agent: ${report.userAgent || "N/A"}
IP: ${report.ip || "N/A"}

Payload:
${JSON.stringify(report.payload, null, 2)}

---
This is an automated error report from the booking system.
    `.trim();

    await transporter.sendMail({
      from: smtpUser,
      to: errorReportEmail,
      subject,
      text,
    });
  } catch (emailError) {
    // Если не можем отправить email с ошибкой, логируем в консоль
    console.error("Failed to send error report:", emailError);
  }
}
