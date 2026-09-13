"use client";

import React, { useState, useEffect } from "react";
import {
  Button,
  Typography,
  CircularProgress,
  Rating,
  Card,
  CardContent,
  Avatar,
  TextField,
  Box,
} from "@mui/material";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";

type Testimonial = {
  id: number;
  message: string;
  rating: number;
  userName: string;
  createdAt: string;
};

const avatarColors = [
  "#FFC107",
  "#03A9F4",
  "#8BC34A",
  "#FF5722",
  "#9C27B0",
  "#607D8B",
  "#FF9800",
];

const TestimonialForm = () => {
  const { data: session } = useSession();
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState<number | null>(5);
  const [loading, setLoading] = useState(false);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [userTestimonial, setUserTestimonial] = useState<Testimonial | null>(
    null
  );

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch("/api/testimonials");
        const data = await response.json();
        setTestimonials(data);

        if (session?.user?.name) {
          const userReview = data.find(
            (t: Testimonial) => t.userName === session.user.name
          );
          setUserTestimonial(userReview || null);
        }
      } catch (error) {
        console.error("Error loading testimonials:", error);
      }
    };

    fetchTestimonials();
  }, [session]);

  const handleSubmit = async () => {
    if (!message.trim() || !rating) {
      alert("Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userName: session?.user?.name || "Anonymous",
          message,
          rating,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Testimonial submitted!");
        setMessage("");
        setRating(5);

        setTestimonials([...testimonials, result]);
        setUserTestimonial(result);
      } else {
        console.error("API Error:", result.error);
        alert(`Submission error: ${result.error || "Unknown error"}`);
      }
    } catch (error) {
      console.error("❌ Error submitting testimonial:", error);
      alert("Submission error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/testimonials?id=${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        alert("Testimonial deleted!");
        setUserTestimonial(null);
        setTestimonials(testimonials.filter((t) => t.id !== id));
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Error deleting testimonial:", error);
      alert("Error deleting testimonial. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      {userTestimonial ? (
        <motion.div animate={{ scale: 1, opacity: 1 }} initial={{ scale: 0.95, opacity: 0 }}>
          <Card sx={{ padding: 3, borderRadius: "16px", boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)", border: "1px solid #e0e0e0", }}>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", marginBottom: 3 }}>
                <Avatar sx={{ backgroundColor: avatarColors[userTestimonial.id % avatarColors.length], width: 56, height: 56, fontSize: "1.5rem", marginRight: 2, }}>
                  {userTestimonial.userName[0].toUpperCase()}
                </Avatar>
                <Typography variant="h5" sx={{ fontWeight: "bold", color: "#333", }}>
                  {userTestimonial.userName}
                </Typography>
              </Box>
              <Typography sx={{ fontSize: "1rem", marginBottom: 2, color: "#555", whiteSpace: "pre-line", }}>
                {userTestimonial.message}
              </Typography>
              <Rating value={userTestimonial.rating} readOnly sx={{ marginBottom: 2 }} />
              <Button             sx={{
              maxWidth: "200px", // Устанавливаем максимальную ширину кнопки
              width: "100%", // Делаем кнопку адаптивной по ширине контейнера
              margin: "16px auto", // Центрируем кнопку по горизонтали
              display: "block",
              justifyContent: "flex-start"
            }} variant="contained" color="error" onClick={() => handleDelete(userTestimonial.id)} disabled={loading} fullWidth>
                {loading ? <CircularProgress size={24} /> : "Delete Testimonial"}
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      ) : (
        <Box sx={{ marginTop: 2 }}>
          <TextField label="Your testimonial" multiline rows={3} fullWidth value={message} onChange={(e) => setMessage(e.target.value)} sx={{ marginBottom: 2 }} />
          <Rating value={rating} onChange={(_, newValue) => setRating(newValue)} sx={{ marginBottom: 2 }} />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={loading}
            sx={{
              maxWidth: "200px", // Устанавливаем максимальную ширину кнопки
              width: "100%", // Делаем кнопку адаптивной по ширине контейнера
              margin: "16px auto", // Центрируем кнопку по горизонтали
              display: "block",
              justifyContent: "flex-start"
            }}
          >
            {loading ? <CircularProgress size={24} /> : "Submit Testimonial"}
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default TestimonialForm;
