"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  Card,
  CardContent,
  Rating,
  Button,
  useMediaQuery
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<
    { id: number; userName?: string; user?: string; rating: number; message: string }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Проверяем мобильное устройство

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch("/api/testimonials");
        if (!response.ok) throw new Error("Failed to load testimonials");

        const data = await response.json();
        setTestimonials(data.slice(0, 2)); 
      } catch (error) {
        console.error("❌ Error loading testimonials:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  return (
    <Box 
      component="section" 
      id="testimonials" 
      sx={{ py: 6, px: 3, textAlign: "center" }}
    >
      <Typography
        variant={isMobile ? "h4" : "h3"} // Изменяем размер заголовка на мобильных устройствах
        gutterBottom
        sx={{
          fontFamily: "'Poppins', sans-serif",
          fontWeight: "bold",
          color: "#333",
          marginBottom: 4,
          textAlign: "center",
        }}
      >
        Customer Testimonials
      </Typography>
      <Typography 
        variant="subtitle1" 
        sx={{ mb: 4, color: "#666", fontFamily: "'Poppins', sans-serif" }}
      >
        Our customers trust us. Here&apos;s what they have to say.
      </Typography>

      {loading ? (
        <Typography>Loading...</Typography>
      ) : testimonials.length === 0 ? (
        <Typography color="text.secondary">No testimonials available.</Typography>
      ) : (
        <Box 
          display="flex" 
          justifyContent="center" 
          gap={4} 
          flexWrap="wrap"
          sx={{ maxWidth: "1200px", margin: "auto" }}
        >
          {testimonials.map(({ id, userName, user, rating, message }) => {
            const name = userName ? userName : user;
            return (
              <motion.div
                key={id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeInUp}
                style={{ maxWidth: 400 }}
              >
                <Card 
                  sx={{ 
                    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)", 
                    borderRadius: "16px",
                    padding: 3,
                    backgroundColor: "#ffffff",
                  }}
                >
                  <CardContent>
                    <Box 
                      display="flex" 
                      alignItems="center" 
                      mb={2} 
                      justifyContent="center"
                    >
                      <Avatar 
                        alt={name} 
                        sx={{ width: 64, height: 64, mr: 2, bgcolor: "#1976d2", color: "#fff" }}
                      >
                        {name?.charAt(0).toUpperCase()}
                      </Avatar>
                      <Typography 
                        variant="h6" 
                        sx={{ 
                          fontFamily: "'Poppins', sans-serif",
                          fontWeight: "bold",
                          color: "#1976d2"
                        }}
                      >
                        {name}
                      </Typography>
                    </Box>
                    <Rating 
                      value={rating} 
                      readOnly 
                      precision={0.5} 
                      sx={{ mb: 2, color: "#ffc107" }} 
                    />
                    <Typography 
                      variant="body2" 
                      color="text.secondary" 
                      sx={{ 
                        fontStyle: "italic", 
                        fontFamily: "'Poppins', sans-serif",
                        color: "#555"
                      }}
                    >
                      &apos;{message}&apos;
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </Box>
      )}

      <Button 
        variant="contained" 
        color="primary"
        sx={{ mt: 4, px: 4, py: 1.5, fontSize: "1rem", fontWeight: "bold" }}
        onClick={() => router.push("/testimonials")}
      >
        View All Testimonials
      </Button>
    </Box>
  );
}
