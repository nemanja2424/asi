import nodemailer from "nodemailer";

export const runtime = "nodejs";

export async function POST(request) {
  let data;
  try {
    const body = await request.text();
    if (body.length > 20000) {
      return Response.json({ error: "Message is too long." }, { status: 413 });
    }
    data = JSON.parse(body);
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const name = typeof data?.name === "string" ? data.name.trim() : "";
  const email = typeof data?.email === "string" ? data.email.trim() : "";
  const message = typeof data?.message === "string" ? data.message.trim() : "";
  if (!name || name.length > 120 || /[\r\n]/.test(name) ||
      !email || email.length > 254 || !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(email) ||
      !message || message.length > 5000) {
    return Response.json({ error: "Please enter your name, a valid email and a message (up to 5,000 characters)." }, { status: 400 });
  }

  const { SMTP_SERVER, SMTP_PORT, EMAIL, EMAIL_PWD } = process.env;
  if (!SMTP_SERVER || !SMTP_PORT || !EMAIL || !EMAIL_PWD) {
    return Response.json({ error: "Sending is currently unavailable. Please try again later." }, { status: 503 });
  }

  const transport = nodemailer.createTransport({
    host: SMTP_SERVER,
    port: Number(SMTP_PORT),
    secure: Number(SMTP_PORT) === 465,
    auth: { user: EMAIL, pass: EMAIL_PWD },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 20000,
  });

  try {
    await transport.sendMail({
      from: { name: "ASI Website", address: EMAIL },
      to: "asi.solutions45@gmail.com",
      replyTo: { name, address: email },
      subject: `New project inquiry from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    });
    return Response.json({ success: true });
  } catch {
    return Response.json({ error: "Your message could not be sent. Please try again." }, { status: 502 });
  } finally {
    transport.close();
  }
}
