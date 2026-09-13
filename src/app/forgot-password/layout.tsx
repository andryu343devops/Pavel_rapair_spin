"use client";

import React from "react";
import { CssBaseline, Container, Box } from "@mui/material";
import Header from "@/app/components/header";
import Footer from "@/app/components/footer";

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
        component="main"
        maxWidth="lg"
        sx={{
          flexGrow: 1, // Растягивается, чтобы занять все доступное пространство
          marginTop: 4,
          mb: 8
        }}
      >
        {children}
      </Container>
      
      <Footer />
    </Box>
  );
}
