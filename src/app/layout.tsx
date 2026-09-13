import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./main.css";
import Head from "next/head";
import AuthProvider from "./components/SessionProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pavel's Appliance Repair - Appliance Repair Services in Twin Cities",
  description:
    "Fast and professional repair services for washers, dryers, refrigerators, dishwashers, ovens, and stoves in Minneapolis and nearby areas. Call (555) 123-4567 for reliable service!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <title>Pavel&apos;s Appliance Repair | Reliable Appliance Repair in Twin Cities</title>
        <link rel="icon" href="./favicon.ico" />
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="canonical" href="https://www.pavelsappliancerepair.com" />

        <meta
          name="description"
          content="Fast and reliable appliance repair services in Twin Cities and nearby areas. We fix washers, dryers, refrigerators, ovens, and dishwashers. Call (555) 123-4567 today!"
        />
        <meta
          name="keywords"
          content="appliance repair, washer repair, dryer repair, refrigerator repair, oven repair, dishwasher repair, Minneapolis, Minnesota"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow" />

        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="Pavel's Appliance Repair | Reliable Appliance Repair in Twin Cities" />
        <meta
          property="og:description"
          content="We provide fast and affordable appliance repair services in Twin Cities and nearby areas. Call us for professional service!"
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.pavelsappliancerepair.com/img/hero.webp" />
        <meta property="og:url" content="https://www.pavelsappliancerepair.com" />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Pavel's Appliance Repair",
            "description":
              "At Pavel's Appliance Repair, we take pride in offering fast, reliable, and affordable appliance repair services across the Twin Cities. With years of hands-on experience, our certified technicians specialize in repairing washers, dryers, refrigerators, dishwashers, ovens, and stoves. Whether it's a noisy dryer or a fridge that won't cool, you can trust us to get your appliances back to perfect working order.",
            "url": "https://www.pavelsappliancerepair.com",
            "logo": "https://www.pavelsappliancerepair.com/img/logo.svg",
            "image": "https://www.pavelsappliancerepair.com/img/hero.webp",
            "telephone": "+17634853734",
            "email": "PavelsApplianceRepair@gmail.com",
            "openingHours": ["Mo-Fr 08:00-20:00", "Sa 09:00-18:00"],
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
              { "@type": "Place", "name": "Burnsville" }
            ],
            "sameAs": [
              "https://www.facebook.com/MNAppianceRepair/",
              "https://www.linkedin.com/in/pavel-pavliuchenko-05b6a1297"
            ],
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "5",
              "reviewCount": "86"
            },
            "potentialAction": {
              "@type": "ReserveAction",
              "target": {
                "@type": "EntryPoint",
                "urlTemplate": "https://www.pavelsappliancerepair.com/booking",
                "inLanguage": "en",
                "actionPlatform": [
                  "http://schema.org/DesktopWebPlatform",
                  "http://schema.org/MobileWebPlatform"
                ]
              },
              "result": {
                "@type": "Reservation",
                "name": "Appliance Repair Appointment"
              }
            }
          })}
        </script>
      </Head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
