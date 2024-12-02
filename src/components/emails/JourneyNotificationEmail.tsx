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
  email: string;
  projectOverview: string;
  selectedPath: string;
}

export default function JourneyNotificationEmail({ 
  name, 
  email, 
  projectOverview, 
  selectedPath 
}: Props) {
  return (
    <Html>
      <Preview>New journey request from {name}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>New Journey Started! 🚀</Heading>
          
          <Text style={text}>
            <strong>Path:</strong> {selectedPath}
          </Text>
          
          <Text style={text}>
            <strong>Name:</strong> {name}
          </Text>
          
          <Text style={text}>
            <strong>Email:</strong> {email}
          </Text>
          
          <Text style={text}>
            <strong>Project Overview:</strong>
          </Text>
          
          <Text style={messageStyle}>
            {projectOverview}
          </Text>
          
          <Link href={`mailto:${email}`} style={button}>
            Reply to {name}
          </Link>
        </Container>
      </Body>
    </Html>
  );
}

// Add the missing styles at the bottom
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

const messageStyle = {
  color: '#FFFFFF',
  fontSize: '14px',
  lineHeight: '24px',
  margin: '0 0 40px',
  padding: '24px',
  backgroundColor: 'rgba(255,255,255,0.1)',
  borderRadius: '12px',
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