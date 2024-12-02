import {
  Html,
  Body,
  Container,
  Text,
  Link,
  Preview,
  Heading,
} from '@react-email/components';

interface Props {
  name: string;
  selectedPath: string;
}

export default function JourneyWelcomeEmail({ name, selectedPath }: Props) {
  return (
    <Html>
      <Preview>Welcome to your journey with Tengri Consulting</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Welcome to Your Digital Journey 🚀</Heading>
          
          <Text style={text}>
            Dear {name},
          </Text>
          
          <Text style={text}>
            Thank you for choosing to start your {selectedPath} journey with us. Our team will review your vision and get back to you within 24 hours.
          </Text>
          
          <Text style={text}>
            In the meantime, you can explore our previous work and success stories.
          </Text>
          
          <Link 
            href="https://tengri-consulting.com/our-work" 
            style={button}
          >
            Explore Our Work
          </Link>
        </Container>
      </Body>
    </Html>
  );
}

// Add the missing styles
const main = {
  backgroundColor: '#0A1628',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
  maxWidth: '580px',
};

const h1 = {
  color: '#FFFFFF',
  fontSize: '24px',
  fontWeight: '600',
  lineHeight: '40px',
  margin: '0 0 20px',
};

const text = {
  color: '#FFFFFF',
  fontSize: '14px',
  lineHeight: '24px',
  margin: '0 0 10px',
};

const button = {
  backgroundColor: '#E63946',
  borderRadius: '8px',
  color: '#FFFFFF',
  display: 'inline-block',
  fontSize: '14px',
  fontWeight: '600',
  lineHeight: '50px',
  textAlign: 'center' as const,
  textDecoration: 'none',
  width: '100%',
  marginTop: '20px',
};