"use client";

import React from "react";
import { CssBaseline, Container, Box } from "@mui/material";
import Head from "next/head";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Head>
        <title>Pavel&apos;s Appliance Repair Blog | Tips, Guides & Maintenance Advice</title>
        <meta
          name="description"
          content="Stay updated with the latest tips, expert advice, and practical guides on appliance repair and maintenance. Read our blog to keep your home running smoothly."
        />
        <meta
          name="keywords"
          content="appliance repair blog, home maintenance tips, washer repair, dryer troubleshooting, refrigerator care, oven maintenance, Twin Cities"
        />
        <link rel="canonical" href="https://www.pavelsappliancerepair.com/blog" />
        
        {/* Open Graph Meta Tags for Social Sharing */}
        <meta property="og:title" content="Pavel's Appliance Repair Blog | Expert Appliance Tips" />
        <meta
          property="og:description"
          content="Get practical tips and insights on appliance repair and maintenance from Pavel's Appliance Repair. Keep your household appliances in top shape!"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.pavelsappliancerepair.com/blog" />
        <meta property="og:image" content="https://www.pavelsappliancerepair.com/img/blog_default.webp" />
        
        {/* Mobile and General SEO */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Pavel Pavluchenko" />
        
        {/* JSON-LD Structured Data for SEO */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            "name": "Pavel's Appliance Repair Blog",
            "description": "Expert tips, advice, and practical guides on appliance repair and maintenance to help you keep your home running smoothly.",
            "url": "https://www.pavelsappliancerepair.com/blog",
            "publisher": {
              "@type": "Organization",
              "name": "Pavel's Appliance Repair",
              "logo": {
                "@type": "ImageObject",
                "url": "https://www.pavelsappliancerepair.com/img/logo.svg"
              }
            },
            "image": "https://www.pavelsappliancerepair.com/img/blog_default.webp",
            "author": {
              "@type": "Person",
              "name": "Pavel Pavluchenko"
            }
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
        <Container maxWidth="lg" sx={{ flex: "1 0 auto", marginTop: 4 }}>
          {children}
        </Container>
      </Box>
    </>
  );
}
