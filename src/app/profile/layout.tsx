import React from "react";
import { CssBaseline, Container, Box } from "@mui/material";
import Header from "../components/header";
import Footer from "../components/footer";

export const metadata = {
  title: "My Blog Application",
  description: "A blog application built with Next.js and Material-UI",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "#f9f9f9",
      }}
    >
      {/* Header */}
      <Header />

      <CssBaseline />

      {/* Main Content */}
      <Container
        component="main"
        maxWidth="lg"
        sx={{
          flex: "1 0 auto",
          marginTop: 4,
          paddingBottom: 4,
        }}
      >
        {children}
      </Container>

      {/* Footer always at the bottom */}
      <Box
        component="footer"
        sx={{
          flexShrink: 0,
          mt: "auto",
        }}
      >
        <Footer />
      </Box>
    </Box>
  );
}
