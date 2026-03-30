import { NextResponse } from "next/server"
import { Resend } from "resend"
import prisma from "@/lib/prisma"

export async function POST(req: Request) {
  try {
    const { name, email, message, subject } = await req.json()

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    // persist message to DB (best-effort)
    let persisted = false

    // Defensive check: ensure Prisma client has the `message` model
    // If you recently edited `prisma/schema.prisma`, you must run `npx prisma generate` and push migrations.
    if (!prisma || typeof (prisma as any).message?.create !== 'function') {
      console.error('Prisma client does not expose `message` model. Did you regenerate the client after updating schema?')
      if (process.env.NODE_ENV !== 'production') {
        console.error('Prisma client keys:', Object.keys(prisma ?? {}))
      }
      return NextResponse.json({ error: 'Server misconfigured: Prisma client missing Message model. Run `npx prisma generate` and `npx prisma db push`.' }, { status: 500 })
    }

    try {
      await prisma.message.create({
        data: {
          name: String(name).slice(0, 200),
          email: String(email).slice(0, 200),
          subject: subject ? String(subject).slice(0, 200) : undefined,
          body: String(message).slice(0, 5000),
        },
      })
      persisted = true
    } catch (dbErr) {
      console.error("Unable to persist contact message:", dbErr)
    }

    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      console.error("RESEND_API_KEY is not configured")
      // If the message persisted, return success but note that email wasn't sent.
      if (persisted) {
        return NextResponse.json({ success: true, persisted: true, emailSent: false, warning: "Email service not configured" })
      }
      return NextResponse.json(
        { error: "Email service is not configured" },
        { status: 500 }
      )
    }

    const resend = new Resend(apiKey)

    try {
      const data = await resend.emails.send({
        from: "AI Society <onboarding@resend.dev>",
        to: ["aisociety@adelphi.edu"],
        subject: `New Contact Form Submission from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject || ""}\n\nMessage:\n${message}`,
      })
      return NextResponse.json({ success: true, persisted, emailSent: true, data })
    } catch (sendErr) {
      console.error("Error sending email via Resend:", sendErr)
      // If DB persisted, return success with emailSent false; otherwise return 500.
      if (persisted) {
        return NextResponse.json({ success: true, persisted: true, emailSent: false, warning: "Email send failed" })
      }
      const body = process.env.NODE_ENV !== 'production' ? { error: 'Email send failed', details: String(sendErr) } : { error: 'Email send failed' }
      return NextResponse.json(body, { status: 500 })
    }
  } catch (error) {
    console.error("Error sending email:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
