export interface SendEmailOptions {
    to: string
    subject: string
    text: string
    html?: string
}

export async function sendClientEmail(options: SendEmailOptions): Promise<{ sent: boolean; reason?: string }> {
    const apiKey = process.env.RESEND_API_KEY
    const from = process.env.RESEND_FROM_EMAIL || 'notifications@globalsecuritysolutions.co.za'

    if (!apiKey) {
        return { sent: false, reason: 'RESEND_API_KEY not configured' }
    }

    const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            from,
            to: options.to,
            subject: options.subject,
            text: options.text,
            html: options.html || options.text.replace(/\n/g, '<br>'),
        }),
    })

    if (!response.ok) {
        const body = await response.text()
        throw new Error(`Email send failed: ${body}`)
    }

    return { sent: true }
}
