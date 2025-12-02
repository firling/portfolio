import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const { email, message } = await request.json()

    // Validation simple
    if (!email || !message) {
      return NextResponse.json(
        { error: 'Email et message requis' },
        { status: 400 }
      )
    }

    // Envoi de l'email avec Resend
    const data = await resend.emails.send({
      from: 'Portfolio <onboarding@resend.dev>', // Vous devrez remplacer par votre domaine vérifié
      to: 'julien@anquetil.org',
      replyTo: email,
      subject: `Nouveau message de ${email}`,
      html: `
        <h2>Nouveau message depuis le portfolio</h2>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    })

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error)
    return NextResponse.json(
      { error: 'Erreur lors de l\'envoi du message' },
      { status: 500 }
    )
  }
}
