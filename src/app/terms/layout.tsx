import React from "react";
import { CssBaseline, Container, Box } from "@mui/material";
import Header from "../components/header";
import Footer from "../components/footer";
import Head from "next/head";

export const metadata = {
  title: "Terms and Conditions - Pavel's Appliance Repair",
  description: "Review the terms and conditions for using Pavel's Appliance Repair services. Understand our policies and service agreements in the Twin Cities area.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Head>
        <title>Terms and Conditions - Pavel&apos;s Appliance Repair</title>
        <meta
          name="description"
          content="Review the terms and conditions for using Pavel's Appliance Repair services. Understand our policies and service agreements in the Twin Cities area."
        />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="keywords" content="Appliance repair terms, Pavel's Appliance Repair, Twin Cities, service agreements, policies" />

        <meta property="og:title" content="Terms and Conditions - Pavel's Appliance Repair" />
        <meta
          property="og:description"
          content="Review our terms and conditions to understand Pavel's Appliance Repair policies and service agreements in the Twin Cities."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.pavelsappliancerepair.com/terms" />
        <meta property="og:image" content="https://www.pavelsappliancerepair.com/img/terms-banner.png" />
        
        <link rel="canonical" href="https://www.pavelsappliancerepair.com/terms" />
      </Head>

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
    </>
  );
}
