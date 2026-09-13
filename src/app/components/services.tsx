"use client";

import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  useMediaQuery
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

const services = [
  {
    title: "Washer and Dryer Repair",
    img: "/img/washer.webp",
    description: 
      "Our certified technicians provide fast and reliable washer and dryer repair services to keep your laundry running smoothly. We handle leaks, heating issues, and more to extend the life of your appliances.",
  },
  {
    title: "Refrigerator Repair",
    img: "/img/refrigerator.webp",
    description: 
      "Restore your refrigerator's cooling efficiency with our expert repair services. From temperature issues to strange noises, we ensure your food stays fresh and your appliance runs efficiently.",
  },
  {
    title: "Dishwasher Repair",
    img: "/img/dishwasher.webp",
    description: 
      "Keep your kitchen running smoothly with our trusted dishwasher repair services. We fix drainage problems, spray arm issues, and more to ensure spotless dishes every time.",
  },
  {
    title: "Oven and Stove Repair",
    img: "/img/stove.webp",
    description: 
      "Get back to cooking with our professional oven and stove repair services. We handle heating issues, burner malfunctions, and electrical problems safely and efficiently.",
  },
];

export default function Services() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);

  const handleFlip = (index: number) => {
    setFlippedIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <Box
      component="section"
      id="services"
      sx={{
        backgroundColor: "#f9f9f9",
        py: 6,
        px: 3,
      }}
    >
      <Box textAlign="center" mb={4}>
        <Typography
          variant={isMobile ? "h4" : "h3"}
          gutterBottom
          sx={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: "bold",
            color: "#333",
          }}
        >
          Our Services
        </Typography>
      </Box>

      <Grid container spacing={3} justifyContent="center">
        {services.map((service, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Box
              sx={{
                perspective: "1000px",
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  height: "260px",
                  transformStyle: "preserve-3d",
                  transition: "transform 0.8s",
                  transform: flippedIndex === index ? "rotateY(180deg)" : "rotateY(0deg)",
                  cursor: "pointer",
                  "&:hover": {
                    transform: flippedIndex === index ? "rotateY(180deg) scale(1.05)" : "scale(1.05)", // Увеличение карточки при наведении
                  },
                }}
                onClick={() => handleFlip(index)}
              >
                {/* Front Side */}
                <Card
                  sx={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    backfaceVisibility: "hidden",
                    boxShadow: 3,
                    borderRadius: 2,
                    textAlign: "center",
                    backgroundColor: "#e3f2fd",
                    transition: "box-shadow 0.3s ease-in-out",
                    "&:hover": {
                      boxShadow: 6, // Увеличенная тень при наведении
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    height="140"
                    image={service.img}
                    alt={service.title}
                    sx={{ objectFit: "contain", padding: 2 }}
                  />
                  <CardContent>
                    <Typography
                      variant="h6"
                      component="div"
                      sx={{ fontWeight: "bold", fontFamily: "'Poppins', sans-serif" }}
                    >
                      {service.title}
                    </Typography>
                  </CardContent>
                </Card>

                {/* Back Side */}
                <Card
                  sx={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    backfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                    boxShadow: 3,
                    borderRadius: 2,
                    textAlign: "center",
                    backgroundColor: "#ffffff",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    padding: 2,
                    transition: "box-shadow 0.3s ease-in-out",
                    "&:hover": {
                      boxShadow: 6, // Увеличенная тень при наведении
                    },
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: "bold", color: "#1976d2", mb: 2 }}
                  >
                    {service.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#555", mb: 2 }}>
                    {service.description}
                  </Typography>
                </Card>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
