
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export const runtime = 'nodejs';

const resend = new Resend(process.env.RESEND_API_KEY);

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export async function POST(request: NextRequest) {
  try {
    // Check API key
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { error: 'Resend API key is missing. Please check .env.local.' },
        { status: 500 }
      );
    }

    // Sender email
    const from = process.env.RESEND_FROM_EMAIL;

    if (!from) {
      return NextResponse.json(
        { error: 'Sender email is not configured.' },
        { status: 500 }
      );
    }

    // Read form data
    const body = await request.json();

    const firstName = String(body.firstName ?? '').trim();
    const lastName = String(body.lastName ?? '').trim();
    const service = String(body.service ?? '').trim();
    const phone = String(body.phone ?? '').replace(/\D/g, '');
    const email = String(body.email ?? '').trim();

    // Validate required fields
    if (!firstName || !service || !email || !phone) {
      return NextResponse.json(
        { error: 'Please complete all required fields.' },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    if (!/^\d{10}$/.test(phone)) {
      return NextResponse.json(
        { error: 'Please enter a valid 10-digit phone number.' },
        { status: 400 }
      );
    }

    const fullName = [firstName, lastName]
      .filter(Boolean)
      .join(' ');

    const to =
      process.env.RESEND_TO_EMAIL || 'hello@allchat.in';

    // Escape user-provided values before putting them into HTML
    const safeName = escapeHtml(fullName);
    const safeService = escapeHtml(service);
    const safePhone = escapeHtml(`+91 ${phone}`);
    const safeEmail = escapeHtml(email);

    // Send email through Resend
    const { data, error } = await resend.emails.send({
      from,
      to: [to],
      replyTo: email,
      subject: `New AllChat Demo Request - ${fullName}`,

      text: `
New demo request received from the AllChat website.

Name: ${fullName}
Service: ${service}
Phone: +91 ${phone}
Email: ${email}
      `,

      html: `
        <div style="
          font-family: Arial, sans-serif;
          max-width: 600px;
          margin: 0 auto;
          color: #16352a;
        ">
          <h2 style="color: #075e54;">
            New AllChat Demo Request
          </h2>

          <p>
            A visitor submitted the Book Your Free Demo form.
          </p>

          <table
            cellpadding="8"
            cellspacing="0"
            style="border-collapse: collapse; width: 100%;"
          >
            <tr>
              <td style="border: 1px solid #dce9e1;">
                <strong>Name</strong>
              </td>
              <td style="border: 1px solid #dce9e1;">
                ${safeName}
              </td>
            </tr>

            <tr>
              <td style="border: 1px solid #dce9e1;">
                <strong>Service</strong>
              </td>
              <td style="border: 1px solid #dce9e1;">
                ${safeService}
              </td>
            </tr>

            <tr>
              <td style="border: 1px solid #dce9e1;">
                <strong>Phone</strong>
              </td>
              <td style="border: 1px solid #dce9e1;">
                ${safePhone}
              </td>
            </tr>

            <tr>
              <td style="border: 1px solid #dce9e1;">
                <strong>Email</strong>
              </td>
              <td style="border: 1px solid #dce9e1;">
                ${safeEmail}
              </td>
            </tr>
          </table>
        </div>
      `,
    });

    if (error) {
      console.error('Resend email error:', error);

      return NextResponse.json(
        {
          error:
            'The email could not be sent. Please try again shortly.',
        },
        { status: 502 }
      );
    }

    return NextResponse.json({
      success: true,
      id: data?.id,
    });

  } catch (error) {
    console.error('Demo email API error:', error);

    return NextResponse.json(
      {
        error:
          'Something went wrong while sending your request.',
      },
      { status: 500 }
    );
  }
}
