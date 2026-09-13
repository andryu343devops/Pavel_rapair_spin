"use client";

import { Container, Typography, Box } from "@mui/material";

export default function PrivacyPolicy() {
  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 5 }}>
        <Typography variant="h4" gutterBottom>
          Privacy Policy
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Effective Date: [Month Day, Year]
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          At Pavel&apos;s Appliance Repair (https://www.pavelsappliancerepair.com),
          we value your privacy. This Privacy Policy explains how we collect,
          use, disclose, and safeguard your information when you visit our
          website or use our services.
        </Typography>

        <Typography variant="h5" gutterBottom>
          1. Information We Collect
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          We collect personal information that you provide directly to us, such
          as your name, email address, phone number, and any details you submit
          through our contact forms or booking services. We may also collect
          non-personal information automatically through cookies and analytics
          tools.
        </Typography>

        <Typography variant="h5" gutterBottom>
          2. How We Use Your Information
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          We use the information we collect to:
        </Typography>
        <Box component="ul" sx={{ pl: 4, mb: 4 }}>
          <li>Provide, maintain, and improve our services.</li>
          <li>Process your bookings and service requests.</li>
          <li>Communicate with you, including responding to inquiries.</li>
          <li>Analyze usage and optimize our website performance.</li>
          <li>Comply with legal requirements and prevent fraud.</li>
        </Box>

        <Typography variant="h5" gutterBottom>
          3. Information Sharing and Disclosure
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          We do not sell or share your personal information with third parties
          for marketing purposes. We may share your information with trusted
          service providers who help us operate our website and provide our
          services, only when necessary and with your data security in mind.
        </Typography>

        <Typography variant="h5" gutterBottom>
          4. Your Data Protection Rights
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          Depending on your location, such as under the California Consumer
          Privacy Act (CCPA) or the General Data Protection Regulation (GDPR),
          you may have the right to request access, correction, or deletion of
          your personal data. To exercise these rights, please contact us using
          the information provided below.
        </Typography>

        <Typography variant="h5" gutterBottom>
          5. Changes to This Privacy Policy
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          We may update this Privacy Policy from time to time to reflect changes
          in our practices or for other operational, legal, or regulatory
          reasons. We encourage you to review this page periodically for the
          latest information.
        </Typography>

        <Typography variant="h5" gutterBottom>
          6. Contact Us
        </Typography>
        <Typography variant="body1">
          If you have any questions or concerns about this Privacy Policy or
          your personal data, please contact us at{" "}
          <a href="mailto:PavelsApplianceRepair@gmail.com">
          PavelsApplianceRepair@gmail.com
          </a>
          .
        </Typography>
      </Box>
    </Container>
  );
}
