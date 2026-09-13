"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  CircularProgress,
  Grid,
  Card,
  CardContent,
  Rating,
  Button,
  Avatar,
  TextField,
  Paper,
  Stack,
} from "@mui/material";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";

// Цветовая палитра для нейтральных аватарок
const avatarColors = ["#FFC107", "#03A9F4", "#8BC34A", "#FF5722", "#9C27B0", "#607D8B", "#FF9800"];

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function TestimonialsPage() {
  const { data: session } = useSession();
  const [testimonials, setTestimonials] = useState<
    { id: number; userName: string | null; message: string; rating: number }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState<number | null>(5);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch("/api/testimonials");
        if (!response.ok) throw new Error("Server error");
        const data = await response.json();
        setTestimonials(data);
      } catch (error) {
        console.error("❌ Error loading testimonials:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  useEffect(() => {
    if (session?.user?.email === process.env.NEXT_PUBLIC_ADMIN ) {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [session]);

  const handleDeleteTestimonial = async (id: number) => {
    if (!isAdmin) return alert("Only the administrator can delete testimonials.");

    try {
      const response = await fetch(`/api/testimonials?id=${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setTestimonials((prev) => prev.filter((t) => t.id !== id));
        alert("Testimonial successfully deleted!");
      } else {
        alert("Error deleting testimonial.");
      }
    } catch (error) {
      console.error("❌ Error deleting testimonial:", error);
    }
  };

  const handleSubmit = async () => {
    if (!name || !message || !rating) {
      alert("Please fill in all fields.");
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch("/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userName: name, message, rating }),
      });

      if (response.ok) {
        const newTestimonial = await response.json();
        setTestimonials((prev) => [newTestimonial, ...prev]);
        setName("");
        setMessage("");
        setRating(5);
        alert("Testimonial added successfully!");
      } else {
        alert("Error adding testimonial.");
      }
    } catch (error) {
      console.error("❌ Error adding testimonial:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ paddingY: 4 }}>
      <Typography
        variant="h3"
        sx={{
          mb: 4,
          textAlign: "center",
          fontWeight: "bold",
          fontFamily: "'Poppins', sans-serif",
          color: "#1976d2",
        }}
      >
        What Our Customers Say
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
          <CircularProgress />
        </Box>
      ) : (
        <>
          {isAdmin && (
            <Paper sx={{ mb: 4, p: 3 }} elevation={3}>
              <Typography variant="h5" gutterBottom>
                Add a New Testimonial
              </Typography>
              <Stack spacing={2}>
                <TextField
                  label="Name"
                  fullWidth
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <TextField
                  label="Message"
                  fullWidth
                  multiline
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <Box>
                  <Typography gutterBottom>Rating:</Typography>
                  <Rating
                    value={rating}
                    precision={0.5}
                    onChange={(e, newValue) => setRating(newValue)}
                  />
                </Box>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                  disabled={submitting}
                >
                  {submitting ? "Submitting..." : "Add Testimonial"}
                </Button>
              </Stack>
            </Paper>
          )}

          <Grid container spacing={4}>
            {testimonials.map(({ id, userName, message, rating }) => {
              const initials = (userName || "A").slice(0, 1).toUpperCase();
              const avatarColor = avatarColors[id % avatarColors.length];

              return (
                <Grid item xs={12} sm={6} key={id}>
                  <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={fadeInUp}
                  >
                    <Card
                      elevation={3}
                      sx={{
                        borderRadius: "16px",
                        boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
                        overflow: "hidden",
                        transition: "all 0.3s",
                        backgroundColor: "#ffffff",
                      }}
                    >
                      <CardContent sx={{ textAlign: "center", padding: 3 }}>
                        <Avatar
                          sx={{
                            width: 80,
                            height: 80,
                            margin: "auto",
                            mb: 2,
                            backgroundColor: avatarColor,
                            color: "#fff",
                            fontSize: "2rem",
                            fontWeight: "bold",
                          }}
                        >
                          {initials}
                        </Avatar>
                        <Typography variant="h6" gutterBottom>
                          {userName || "Anonymous"}
                        </Typography>
                        <Rating value={rating} precision={0.5} readOnly sx={{ mb: 2 }} />
                        <Typography
                          variant="body2"
                          sx={{
                            color: "#555",
                            fontStyle: "italic",
                            lineHeight: 1.6,
                          }}
                        >
                          &quot;{message}&quot;
                        </Typography>

                        {isAdmin && (
                          <Button
                            variant="contained"
                            color="error"
                            sx={{ marginTop: 2 }}
                            onClick={() => handleDeleteTestimonial(id)}
                          >
                            Delete Testimonial
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              );
            })}
          </Grid>
        </>
      )}
    </Container>
  );
}
