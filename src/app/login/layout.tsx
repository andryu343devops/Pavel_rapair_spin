"use client";
import { SessionProvider } from "next-auth/react";
import React from "react";
import { CssBaseline, Container, Box } from "@mui/material";
import Header from "../components/header";
import Footer from "../components/footer";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh", // Минимальная высота экрана
      }}
    >
      <CssBaseline />
      
      <Header />

      <Container
        maxWidth="lg"
        sx={{
          flexGrow: 1, // Растягивается, чтобы занять оставшееся пространство
          marginTop: 4,
          mb: 8
        }}
      >
        <SessionProvider>{children}</SessionProvider>
      </Container>

      <Footer />
    </Box>
  );
}
