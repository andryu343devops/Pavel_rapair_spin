"use client";

import React, { useEffect, useState } from "react";
import { 
  Box, 
  Button, 
  Card, 
  CardContent, 
  CardMedia, 
  Typography, 
  CircularProgress, 
  useMediaQuery 
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";

const Blog = () => {
  const [latestBlog, setLatestBlog] = useState<{ 
    id: number; 
    title: string; 
    content?: string; 
    imageUrl?: string; 
    createdAt: string; 
    author?: { name?: string }; 
  } | null>(null);
  
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const fetchLatestBlog = async () => {
      try {
        const response = await fetch("/api/blog");
        const data = await response.json();
        console.log(data);
        if (data && !data.error) {
          setLatestBlog(data[data.length - 1]);
        } else {
          setLatestBlog(null);
        }
      } catch (error) {
        console.error("❌ Error loading blog:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestBlog();
  }, []);

  // ✅ Функция для перехода на страницу статьи
  const handleBlogClick = (id: number) => {
    router.push(`/blog/${id}`);
  };

  return (
    <Box sx={{ maxWidth: 800, margin: "auto", textAlign: "center", padding: 4 }}>
      <Typography
        variant={isMobile ? "h4" : "h3"}
        gutterBottom
        sx={{
          fontFamily: "'Poppins', sans-serif",
          fontWeight: "bold",
          color: "#333",
        }}
      >
        Our Blog
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : latestBlog ? (
        <Card 
          sx={{ 
            marginBottom: 3, 
            boxShadow: 3, 
            borderRadius: 2,
            overflow: "hidden",
            cursor: "pointer", // 🔹 Добавляет курсор "рука"
            transition: "transform 0.2s ease-in-out",
            "&:hover": { transform: "scale(1.02)" }, // 🔹 Легкий эффект увеличения
          }}
          onClick={() => handleBlogClick(latestBlog.id)} // ✅ Добавляем клик по карточке
        >
          {latestBlog.imageUrl && (
            <CardMedia
              component="img"
              height={isMobile ? "180" : "250"}
              image={latestBlog.imageUrl}
              alt={latestBlog.title}
              sx={{ objectFit: "cover" }}
            />
          )}
          <CardContent>
            <Typography 
              variant="h5" 
              gutterBottom 
              sx={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: "600",
                color: "#1976d2",
              }}
            >
              {latestBlog.title}
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ color: "gray", fontStyle: "italic" }}
            >
              {dayjs(latestBlog.createdAt).format("DD/MM/YYYY")} • Author: {latestBlog.author?.name || "Pavel Pavluchenko"}
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ marginTop: 1, color: "#555" }}
            >
              {latestBlog.content ? `${latestBlog.content.substring(0, 100)}...` : "No description available"}
            </Typography>
            
            {/* 🔹 Кнопка Read More */}
            <Button 
              variant="outlined" 
              color="primary" 
              sx={{ marginTop: 2, fontSize: "0.9rem" }}
              onClick={(e) => {
                e.stopPropagation(); // ✅ Чтобы не срабатывал клик на карточку
                handleBlogClick(latestBlog.id);
              }}
            >
              Read More
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Typography variant="body1" sx={{ color: "gray" }}>
          No articles available.
        </Typography>
      )}

      <Button 
        variant="contained" 
        color="primary" 
        onClick={() => router.push("/blog")}
        sx={{ marginTop: 2, padding: "10px 20px", fontSize: "1rem" }}
      >
        View All Articles
      </Button>
    </Box>
  );
};

export default Blog;
