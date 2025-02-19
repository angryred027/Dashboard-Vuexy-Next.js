import { Container, Typography, Paper, Box } from "@mui/material";

export default function AffiliateSetting() {
  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Affiliate Settings
        </Typography>
      </Paper>
    </Container>
  );
}
