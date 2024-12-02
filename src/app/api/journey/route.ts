import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend('re_YOUR_API_KEY'); // Get from resend.com

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, projectOverview, selectedPath } = body;

    // Send notification email to your team
    await resend.emails.send({
      from: 'Tengri Journey <journey@tengri-consulting.com>',
      to: ['team@tengri-consulting.com'],
      subject: `New Journey Started: ${selectedPath}`,
      html: `
        <h2>New Journey Initiated</h2>
        <p><strong>Path:</strong> ${selectedPath}</p>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Project Overview:</strong></p>
        <p>${projectOverview}</p>
      `
    });

    // Send confirmation email to the client
    await resend.emails.send({
      from: 'Tengri Consulting <hello@tengri-consulting.com>',
      to: [email],
      subject: 'Welcome to Your Digital Journey',
      html: `
        <h2>Welcome to Tengri Consulting</h2>
        <p>Dear ${name},</p>
        <p>Thank you for choosing to start your journey with us. Our team will review your vision and get back to you within 24 hours.</p>
        <p>In the meantime, you can explore our work at <a href="https://tengri-consulting.com/our-work">tengri-consulting.com/our-work</a></p>
      `
    });

    // Optional: Store in your database
    // await prisma.journeyRequest.create({ data: { ... } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Journey submission error:', error);
    return NextResponse.json(
      { error: 'Failed to process journey request' },
      { status: 500 }
    );
  }
} 