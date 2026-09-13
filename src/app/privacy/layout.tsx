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
      }}
    >
      <CssBaseline />
      <Header />
      
      <Container
        maxWidth="lg"
        sx={{ flex: "1 0 auto", marginTop: 4, mb: 8 }}
      >
        {children}
      </Container>
      
      <Footer />
    </Box>
  );
}
