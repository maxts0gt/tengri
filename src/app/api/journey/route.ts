import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import JourneyNotificationEmail from '@/components/emails/JourneyNotificationEmail';
import JourneyWelcomeEmail from '@/components/emails/JourneyWelcomeEmail';

if (!process.env.RESEND_API_KEY) {
  throw new Error('Missing RESEND_API_KEY environment variable');
}

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, projectOverview, selectedPath } = body;

    console.log('Received journey request:', { name, email, projectOverview, selectedPath });

    // Validate inputs
    if (!name || !email || !projectOverview || !selectedPath) {
      console.log('Missing required fields:', { name, email, projectOverview, selectedPath });
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    try {
      // Send notification email to your team
      const notificationEmail = await resend.emails.send({
        from: 'Tengri Journey <hello@tengri-consulting.com>',
        to: ['hello@tengri-consulting.com'],
        subject: `New Journey Started: ${selectedPath}`,
        react: JourneyNotificationEmail({
          name,
          email,
          projectOverview,
          selectedPath
        })
      });

      console.log('Notification email sent:', notificationEmail);

      // Send welcome email to the client
      const welcomeEmail = await resend.emails.send({
        from: 'Tengri Consulting <hello@tengri-consulting.com>',
        to: [email],
        replyTo: 'hello@tengri-consulting.com',
        subject: 'Welcome to Your Digital Journey',
        react: JourneyWelcomeEmail({
          name,
          selectedPath
        })
      });

      console.log('Welcome email sent:', welcomeEmail);

      return NextResponse.json({ 
        success: true,
        notificationId: notificationEmail.data?.id,
        welcomeId: welcomeEmail.data?.id
      });
    } catch (emailError: any) {
      console.error('Email sending error:', emailError?.response?.body || emailError);
      return NextResponse.json(
        { error: 'Failed to send emails: ' + (emailError?.message || 'Unknown error') },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error('Journey submission error:', error);
    return NextResponse.json(
      { error: 'Failed to process journey request: ' + (error?.message || 'Unknown error') },
      { status: 500 }
    );
  }
} 