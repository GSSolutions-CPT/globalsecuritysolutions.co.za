import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/portal/supabase/server'
import { getRequiredStaffRoles, type StaffRole } from '@/lib/portal/permissions'
import { sendClientEmail } from '@/lib/portal/email'

export async function POST(request: NextRequest) {
    try {
        const supabase = await createServerSupabaseClient()
        const { data: { user }, error: authError } = await supabase.auth.getUser()

        if (authError || !user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const { data: staffProfile, error: profileError } = await supabase
            .from('users')
            .select('role')
            .eq('id', user.id)
            .maybeSingle()

        if (profileError || !staffProfile) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
        }

        const role = staffProfile.role as StaffRole
        const requiredRoles = getRequiredStaffRoles('/portal/sales')
        if (requiredRoles !== 'all_staff' && !requiredRoles?.includes(role)) {
            return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 })
        }

        const body = await request.json()
        const quotationId = body?.quotationId as string | undefined

        if (!quotationId) {
            return NextResponse.json({ error: 'Missing quotationId' }, { status: 400 })
        }

        const { data: quotation, error: fetchError } = await supabase
            .from('quotations')
            .select(`
                id,
                client_id,
                status,
                total_amount,
                payment_request_sent,
                clients (name, email)
            `)
            .eq('id', quotationId)
            .maybeSingle()

        if (fetchError || !quotation) {
            return NextResponse.json({ error: 'Quotation not found' }, { status: 404 })
        }

        if (!['Approved', 'Accepted'].includes(quotation.status)) {
            return NextResponse.json({ error: 'Payment can only be requested for approved quotations' }, { status: 400 })
        }

        if (quotation.payment_request_sent) {
            return NextResponse.json({ error: 'Payment request already sent', alreadySent: true }, { status: 409 })
        }

        const { error: updateError } = await supabase
            .from('quotations')
            .update({ payment_request_sent: true })
            .eq('id', quotationId)

        if (updateError) {
            return NextResponse.json({ error: updateError.message }, { status: 500 })
        }

        await supabase.from('activity_log').insert([{
            type: 'Payment Requested',
            description: `Outstanding payment requested for Quote #${quotationId.substring(0, 6)}`,
            related_entity_id: quotationId,
            related_entity_type: 'quotation',
        }])

        const clientRecord = quotation.clients as { name?: string; email?: string } | null
        const clientEmail = clientRecord?.email?.trim() || null
        const clientName = clientRecord?.name || 'Client'

        const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || request.nextUrl.origin
        const portalUrl = `${siteUrl}/portal/client-portal`
        const mailtoSubject = encodeURIComponent(`Payment reminder – Quote #${quotationId.substring(0, 6)}`)
        const mailtoBody = encodeURIComponent(
            `Hi ${clientName},\n\n` +
            `This is a friendly reminder that an outstanding payment is due on your quotation #${quotationId.substring(0, 6)}.\n\n` +
            `Please log in to your client portal to complete payment:\n${portalUrl}\n\n` +
            `Thank you,\nGlobal Security Solutions`
        )
        const mailtoLink = clientEmail ? `mailto:${clientEmail}?subject=${mailtoSubject}&body=${mailtoBody}` : null

        let emailSent = false
        if (clientEmail) {
            try {
                const emailResult = await sendClientEmail({
                    to: clientEmail,
                    subject: `Payment reminder – Quote #${quotationId.substring(0, 6)}`,
                    text:
                        `Hi ${clientName},\n\n` +
                        `This is a friendly reminder that an outstanding payment is due on your quotation #${quotationId.substring(0, 6)}.\n\n` +
                        `Please log in to your client portal to complete payment:\n${portalUrl}\n\n` +
                        `Thank you,\nGlobal Security Solutions`,
                })
                emailSent = emailResult.sent
            } catch (emailError) {
                console.error('Failed to send payment reminder email:', emailError)
            }
        }

        return NextResponse.json({
            success: true,
            quotationId,
            clientEmail,
            clientName,
            portalUrl,
            mailtoLink,
            emailSent,
            message: emailSent
                ? 'Payment request recorded and email sent to client.'
                : clientEmail
                ? 'Payment request recorded. Client will see a notification in their portal.'
                : 'Payment request recorded. No client email on file — they will see a notification when they log in.',
        })
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Failed to send payment request'
        return NextResponse.json({ error: message }, { status: 500 })
    }
}