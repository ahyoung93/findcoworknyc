import { Resend } from 'resend'

if (!process.env.RESEND_API_KEY) {
  console.warn('RESEND_API_KEY not set - email will not work')
}

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

interface SendCompletionEmailParams {
  to: string
  chainId: string
  sentence: string
  contributors: string[]
}

export async function sendCompletionEmail({
  to,
  chainId,
  sentence,
  contributors
}: SendCompletionEmailParams) {
  if (!resend) {
    console.error('Resend not configured')
    return { success: false, error: 'Email service not configured' }
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
  const storyUrl = `${appUrl}/s/${chainId}`
  const contributorsText = contributors.slice(0, 4).join(', ')

  try {
    await resend.emails.send({
      from: 'baton <no-reply@yourdomain.com>', // Update with your domain
      to,
      subject: "it's done. somehow.",
      html: `
        <div style="font-family: system-ui, -apple-system, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="font-size: 24px; margin-bottom: 20px; font-weight: normal;">
            your sentence is complete.
          </h2>

          <p style="font-size: 18px; line-height: 1.6; margin: 30px 0; padding: 20px; background: #f5f5f5; border-radius: 8px;">
            "${sentence}"
          </p>

          <p style="color: #666; font-size: 14px; margin-bottom: 30px;">
            written by — ${contributorsText}
          </p>

          <a href="${storyUrl}" style="display: inline-block; background: #4C6FFF; color: white; padding: 12px 24px; text-decoration: none; border-radius: 24px; font-size: 16px;">
            see the full story
          </a>

          <hr style="margin: 40px 0; border: none; border-top: 1px solid #e5e5e5;" />

          <p style="color: #999; font-size: 12px;">
            you're receiving this because you opted in for completion notification.
            <br />
            democracy, but for nonsense.
          </p>
        </div>
      `
    })

    return { success: true }
  } catch (error) {
    console.error('Failed to send email:', error)
    return { success: false, error: String(error) }
  }
}
