import { Container, Typography, Paper, Box } from "@mui/material";

export default function TermsOfService() {
  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Terms of Service
        </Typography>

        <Typography variant="h6" gutterBottom>
          1. Introduction
        </Typography>
        <Typography paragraph>
          Welcome to our website. By accessing our service, you agree to be bound by these Terms of Service.
        </Typography>

        <Typography variant="h6" gutterBottom>
          2. Use of Service
        </Typography>
        <Typography paragraph>
          You must use our service in compliance with all applicable laws and regulations.
        </Typography>

        <Typography variant="h6" gutterBottom>
          3. User Responsibilities
        </Typography>
        <Typography paragraph>
          You are responsible for maintaining the confidentiality of your account and password.
        </Typography>

        <Typography variant="h6" gutterBottom>
          4. Termination
        </Typography>
        <Typography paragraph>
          We reserve the right to terminate your access to our service at any time.
        </Typography>

        <Typography variant="h6" gutterBottom>
          5. Contact Information
        </Typography>
        <Typography paragraph>
          If you have any questions about these Terms, please contact us at support@example.com.
        </Typography>
      </Paper>
    </Container>
  );
}
