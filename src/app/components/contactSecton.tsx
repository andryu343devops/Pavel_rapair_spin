"use client";

import React from "react";
import { Box, Typography, Container, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ContactForm from "@/app/components/form";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function ContactSection() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Detect mobile screens

  return (
    <Box
      component="section"
      id="contact"
      sx={{
        backgroundColor: "#f9f9f9",
        py: isMobile ? 4 : 6, // Less padding on mobile
        px: 3,
        textAlign: "center",
      }}
    >
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
        >
          <Typography
            variant={isMobile ? "h4" : "h3"} // Smaller heading for mobile
            component="h2"
            sx={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: "bold",
              color: "#333",
              marginBottom: 2,
            }}
          >
            Get in touch with us
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            sx={{
              mb: 4,
              fontFamily: "'Poppins', sans-serif",
              color: "#555",
              fontSize: isMobile ? "0.95rem" : "1.1rem", // Adjusted text size
            }}
          >
            Have questions or need urgent assistance? Contact our team today!
            <br />
            We&apos;re here to help you with all your washing machine repair needs.
          </Typography>
          <Box
            className="contact__container"
            sx={{
              maxWidth: isMobile ? "100%" : "600px", // Full width on mobile
              margin: "0 auto",
              backgroundColor: "#ffffff",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
              padding: isMobile ? 3 : 4, // Less padding on mobile
              px: 2,
              borderRadius: "16px",
            }}
          >
            <ContactForm />
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
}
