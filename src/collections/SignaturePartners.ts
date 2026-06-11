import type { CollectionConfig } from 'payload'

const sendBrevo = async (payload: {
  sender: { email: string; name: string }
  to: { email: string; name?: string }[]
  subject: string
  htmlContent: string
}) => {
  const apiKey = (process.env.BREVO_API_KEY || '').trim()
  if (!apiKey) {
    console.error('BREVO_API_KEY not set')
    return
  }

  for (let attempt = 1; attempt <= 2; attempt++) {
    const ctrl = new AbortController()
    const timer = setTimeout(() => ctrl.abort(), 10000)
    try {
      const res = await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'api-key': apiKey },
        body: JSON.stringify(payload),
        signal: ctrl.signal,
      })
      clearTimeout(timer)
      const text = await res.text().catch(() => '<no-body>')
      if (!res.ok) throw new Error(`Brevo ${res.status}: ${text}`)
      console.log(`Brevo email sent (attempt ${attempt})`)
      return
    } catch (err: any) {
      clearTimeout(timer)
      console.error(`Brevo attempt ${attempt} failed:`, err?.message)
      if (attempt === 2) throw err
      await new Promise((r) => setTimeout(r, 400))
    }
  }
}

const row = (label: string, value: unknown) =>
  `<tr><td style="padding:8px;border:1px solid #ddd"><strong>${label}</strong></td><td style="padding:8px;border:1px solid #ddd">${value ?? '—'}</td></tr>`

export const SignaturePartners: CollectionConfig = {
  slug: 'signature-partners',
  admin: {
    useAsTitle: 'firstName',
    defaultColumns: ['firstName', 'lastName', 'email', 'phone', 'primaryBusiness', 'createdAt'],
    group: 'Marketing',
  },
  access: {
    read: ({ req: { user } }) => Boolean(user),
    create: () => true,
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'firstName', label: 'First Name', type: 'text', required: true },
        { name: 'lastName', label: 'Last Name', type: 'text', required: true },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'email', label: 'Email Address', type: 'email', required: true },
        { name: 'phone', label: 'Mobile Number', type: 'text', required: true },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'companyName', label: 'Company Name', type: 'text', required: true },
        { name: 'companyWebsite', label: 'Company Website', type: 'text' },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'designation', label: 'Designation', type: 'text', required: true },
        { name: 'reraNumber', label: 'RERA Number', type: 'text' },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'instagramProfile', label: 'Instagram Profile', type: 'text' },
        {
          name: 'yearsOfExperience',
          label: 'Years of Experience',
          type: 'select',
          options: ['0-2 Years', '3-5 Years', '5-10 Years', '10+ Years'].map((v) => ({ label: v, value: v })),
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'primaryBusiness',
          label: 'Primary Business',
          type: 'select',
          options: [
            'Residential Sales',
            'Luxury Residential',
            'Commercial',
            'Off Plan',
            'Secondary Market',
            'Interior Design',
            'Property Investment',
          ].map((v) => ({ label: v, value: v })),
        },
        {
          name: 'monthlyClientReferrals',
          label: 'Monthly Client Referrals',
          type: 'select',
          options: ['1-5', '6-10', '11-20', '20+'].map((v) => ({ label: v, value: v })),
        },
      ],
    },
    { name: 'marketingConsent', label: 'Marketing Consent', type: 'checkbox', defaultValue: false },
    { name: 'termsAccepted', label: 'Terms Accepted', type: 'checkbox', defaultValue: false },
  ],
  timestamps: true,

  hooks: {
    afterChange: [
      async ({ doc, operation }) => {
        if (operation !== 'create') return

        const verifiedSender = process.env.VERIFIED_SENDER || process.env.ADMIN_EMAIL
        const adminEmail = process.env.ADMIN_EMAIL

        if (!verifiedSender) {
          console.error('VERIFIED_SENDER or ADMIN_EMAIL not set')
          return
        }

        const fullName = `${doc.firstName || ''} ${doc.lastName || ''}`.trim()
        const submittedAt = doc.createdAt || new Date().toISOString()

        const details = `
          ${row('Name', fullName)}
          ${row('Email', doc.email)}
          ${row('Mobile', doc.phone)}
          ${row('Company Name', doc.companyName)}
          ${row('Company Website', doc.companyWebsite)}
          ${row('Designation', doc.designation)}
          ${row('RERA Number', doc.reraNumber)}
          ${row('Instagram', doc.instagramProfile)}
          ${row('Years of Experience', doc.yearsOfExperience)}
          ${row('Primary Business', doc.primaryBusiness)}
          ${row('Monthly Client Referrals', doc.monthlyClientReferrals)}
          ${row('Marketing Consent', doc.marketingConsent ? 'Yes' : 'No')}
          ${row('Terms Accepted', doc.termsAccepted ? 'Yes' : 'No')}
        `

        if (adminEmail) {
          try {
            await sendBrevo({
              sender: { email: verifiedSender, name: 'Al Huzaifa Design Studio' },
              to: [{ email: adminEmail, name: 'Admin' }],
              subject: `New Signature Partner Application — ${fullName}`,
              htmlContent: `
                <h2 style="color:#333;font-family:sans-serif">New Signature Partner Application</h2>
                <table style="border-collapse:collapse;width:100%;font-family:sans-serif">${details}</table>
                <p style="color:#999;font-size:12px;font-family:sans-serif">Submitted on ${submittedAt}</p>
              `,
            })
            console.log('Admin notification sent to', adminEmail)
          } catch (err) {
            console.error('Failed to send admin email:', err)
          }
        }

        if (doc.email) {
          try {
            await sendBrevo({
              sender: { email: verifiedSender, name: 'Al Huzaifa Design Studio' },
              to: [{ email: doc.email, name: fullName }],
              subject: 'Thank you for applying — Al Huzaifa Signature Partners',
              htmlContent: `
                <h2 style="color:#333;font-family:sans-serif">Thank you, ${doc.firstName}!</h2>
                <p style="font-family:sans-serif">We've received your Signature Partner application and our team will be in touch shortly.</p>
                <h3 style="color:#555;font-family:sans-serif">Your submission summary:</h3>
                <table style="border-collapse:collapse;width:100%;font-family:sans-serif">${details}</table>
                <p style="margin-top:24px;font-family:sans-serif">Warm regards,<br/><strong>Al Huzaifa Design Studio</strong></p>
                <p style="color:#999;font-size:12px;font-family:sans-serif">Submitted on ${submittedAt}</p>
              `,
            })
            console.log('Confirmation email sent to', doc.email)
          } catch (err) {
            console.error('Failed to send user confirmation email:', err)
          }
        }
      },
    ],
  },
}