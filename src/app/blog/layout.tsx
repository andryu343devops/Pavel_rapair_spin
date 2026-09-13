"use client";

import * as React from "react";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { CssBaseline, Box, Container } from "@mui/material";
import Head from "next/head";
import Header from "@/app/components/header";
import Footer from "../components/footer";

// Создаем кэш для Material-UI
const muiCache = createCache({
  key: "mui",
  prepend: true,
});

type SEOProps = {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
};

const defaultSEO: SEOProps = {
  title: "Pavel's Appliance Repair | Reliable Appliance Repair in Twin Cities",
  description:
    "Fast and reliable appliance repair services in Twin Cities and nearby areas. We fix washers, dryers, refrigerators, ovens, and dishwashers. Call (555) 123-4567 today!",
  image: "https://www.pavelsappliancerepair.com/img/hero.webp",
  url: "https://www.pavelsappliancerepair.com",
};

export default function RootLayout({
  children,
  title = defaultSEO.title,
  description = defaultSEO.description,
  image = defaultSEO.image,
  url = defaultSEO.url,
}: React.PropsWithChildren<SEOProps>) {
  return (
    <CacheProvider value={muiCache}>
      <CssBaseline />
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta
          name="keywords"
          content="appliance repair, washer repair, dryer repair, refrigerator repair, oven repair, dishwasher repair, Minneapolis, Minnesota"
        />
        <link rel="canonical" href={url} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/* Open Graph метатеги для соцсетей */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        <meta property="og:url" content={url} />
        <meta property="og:type" content="website" />

        {/* Schema.org для LocalBusiness */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Pavel's Appliance Repair",
            "description": description,
            "url": url,
            "logo": "https://www.pavelsappliancerepair.com/img/logo.svg",
            "image": image,
            "telephone": "+17634853734",
            "email": "PavelsApplianceRepair@gmail.com",
            "openingHours": [
              "Mo-Fr 08:00-20:00",
              "Sa 09:00-18:00"
            ],
            "priceRange": "$$",
            "paymentAccepted": "Cash, Credit Card, Debit Card",
            "areaServed": [
              { "@type": "Place", "name": "Minneapolis" },
              { "@type": "Place", "name": "St. Paul" },
              { "@type": "Place", "name": "Twin Cities Area" },
              { "@type": "Place", "name": "Bloomington" },
              { "@type": "Place", "name": "Eagan" },
              { "@type": "Place", "name": "Edina" },
              { "@type": "Place", "name": "Maple Grove" },
              { "@type": "Place", "name": "Burnsville" },
              { "@type": "Place", "name": "Plymouth" },
              { "@type": "Place", "name": "Woodbury" },
              { "@type": "Place", "name": "Lakeville" },
              { "@type": "Place", "name": "Brooklyn Park" },
              { "@type": "Place", "name": "Savage" },
              { "@type": "Place", "name": "Apple Valley" },
              { "@type": "Place", "name": "Coon Rapids" },
              { "@type": "Place", "name": "Shakopee" },
              { "@type": "Place", "name": "Eden Prairie" },
              { "@type": "Place", "name": "Roseville" },
              { "@type": "Place", "name": "Minnetonka" },
              { "@type": "Place", "name": "Inver Grove Heights" }
            ],
            "sameAs": [
              "https://www.facebook.com/MNAppianceRepair/",
              "https://www.linkedin.com/in/pavel-pavliuchenko-05b6a1297"
            ],
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "5",
              "reviewCount": "86"
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
        <Header />
        <Container
          component="main"
          sx={{
            flexGrow: 1,
            py: { xs: 2, sm: 4, md: 6 },
            maxWidth: { xs: "100%", sm: "md", md: "lg" },
          }}
        >
          {children}
        </Container>
        <Footer/>
      </Box>
    </CacheProvider>
  );
}
