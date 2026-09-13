"use client";

import React from "react";
import { CssBaseline, Container, Box } from "@mui/material";
import Header from "@/app/components/header";
import Footer from "../components/footer";
import Head from "next/head";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Head>
        <title>Customer Testimonials - Pavel&apos;s Appliance Repair</title>
        <meta
          name="description"
          content="Read real customer reviews and testimonials about Pavel's Appliance Repair services in Twin Cities. We take pride in delivering fast, reliable, and professional appliance repair solutions."
        />
        <meta
          name="keywords"
          content="appliance repair testimonials, customer reviews, Pavel's Appliance Repair, Twin Cities, Minneapolis, reliable service"
        />
        <link rel="canonical" href="https://www.pavelsappliancerepair.com/testimonials" />
        <meta property="og:title" content="Customer Testimonials - Pavel's Appliance Repair" />
        <meta
          property="og:description"
          content="Read authentic reviews from satisfied customers of Pavel's Appliance Repair. Discover why we are the trusted choice for appliance repair in the Twin Cities."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.pavelsappliancerepair.com/testimonials" />
        <meta
          property="og:image"
          content="https://www.pavelsappliancerepair.com/img/testimonials_default.webp"
        />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Pavel's Appliance Repair" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Customer Testimonials",
            "description":
              "Read authentic reviews from satisfied customers of Pavel's Appliance Repair. Discover why we are the trusted choice for appliance repair in the Twin Cities.",
            "url": "https://www.pavelsappliancerepair.com/testimonials",
            "breadcrumb": {
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": "https://www.pavelsappliancerepair.com",
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "Testimonials",
                  "item": "https://www.pavelsappliancerepair.com/testimonials",
                },
              ],
            },
          })}
        </script>
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
        <Container component="main" maxWidth="lg" sx={{ flexGrow: 1, marginTop: 4 }}>
          {children}
        </Container>
        <Footer />
      </Box>
    </>
  );
}
