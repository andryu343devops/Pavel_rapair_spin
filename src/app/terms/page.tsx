import { Container, Typography, Box } from "@mui/material";

export default function TermsOfService() {
  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 5 }}>
        <Typography variant="h4" gutterBottom>
          Terms of Service
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Effective Date: [Month Day, Year]
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          By accessing or using the website of Pavel&apos;s Appliance Repair
          (https://www.pavelsappliancerepair.com), you agree to comply with and
          be bound by the following terms and conditions. Please review these
          terms carefully. If you do not agree with these terms, you should not
          use our website or services.
        </Typography>

        <Typography variant="h5" gutterBottom>
          1. Account Registration
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          When creating an account on our website, you agree to provide accurate,
          complete, and up-to-date information. You are responsible for
          maintaining the confidentiality of your account information and for all
          activities that occur under your account.
        </Typography>

        <Typography variant="h5" gutterBottom>
          2. Acceptable Use
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          When using our website or services, you agree not to:
        </Typography>
        <Box component="ul" sx={{ pl: 4, mb: 4 }}>
          <li>Engage in unlawful or fraudulent activities.</li>
          <li>Interfere with or disrupt the functionality of the website.</li>
          <li>Upload or share inappropriate or harmful content.</li>
          <li>Attempt to access unauthorized areas of the website.</li>
          <li>Violate any applicable laws or regulations.</li>
        </Box>

        <Typography variant="h5" gutterBottom>
          3. Limitation of Liability
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          Pavel&apos;s Appliance Repair is not liable for any direct, indirect,
          incidental, or consequential damages arising out of your use of our
          website or services. We do not guarantee the accuracy or completeness
          of the information provided on our website.
        </Typography>

        <Typography variant="h5" gutterBottom>
          4. Changes to Terms
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          We reserve the right to modify these Terms of Service at any time.
          Changes will be effective immediately upon posting on our website. Your
          continued use of our services constitutes acceptance of the updated
          terms.
        </Typography>

        <Typography variant="h5" gutterBottom>
          5. Contact Us
        </Typography>
        <Typography variant="body1">
          If you have any questions about these Terms of Service, please contact
          us at{" "}
          <a href="mailto:PavelsApplianceRepair@gmail.com">
          PavelsApplianceRepair@gmail.com
          </a>
          .
        </Typography>
      </Box>
    </Container>
  );
}
