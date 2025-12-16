import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const CONTACT_RECIPIENT = process.env.CONTACT_RECIPIENT || "request@martis.me";
const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = Number(process.env.SMTP_PORT) || 587;
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;
const SMTP_FROM = process.env.SMTP_FROM || SMTP_USER;

const transportRequired =
  !SMTP_HOST || !SMTP_USER || !SMTP_PASS || !SMTP_FROM || !CONTACT_RECIPIENT;

const transporter = !transportRequired
  ? nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_PORT === 465,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    })
  : null;

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  if (!transporter) {
    console.error("Contact form is not configured correctly.");
    return NextResponse.json(
      {
        success: false,
        error: "Contact form is temporarily unavailable.",
      },
      { status: 500 },
    );
  }

  try {
    const body = await request.json();
    const name = String(body?.name ?? "").trim();
    const email = String(body?.email ?? "").trim();
    const message = String(body?.message ?? "").trim();

    if (!name || !email || !message) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required fields.",
        },
        { status: 400 },
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        {
          success: false,
          error: "Email is invalid.",
        },
        { status: 400 },
      );
    }

    await transporter.sendMail({
      from: SMTP_FROM,
      to: CONTACT_RECIPIENT,
      replyTo: email,
      subject: `New contact request from ${name}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        "",
        "Message:",
        message,
      ].join("\n"),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to send contact email:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to send the message.",
      },
      { status: 500 },
    );
  }
}
