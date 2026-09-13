/*"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Box, Button, Container, TextField, Typography, Alert } from "@mui/material";

export default function CreateBlogPage() {
  const { data: session } = useSession();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // ✅ Redirect if user is not logged in
  if (!session) {
    return (
      <Container maxWidth="sm">
        <Alert severity="error">You must be logged in to create a blog post.</Alert>
      </Container>
    );
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await fetch("/api/blog/create", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "An error occurred while creating the blog post.");
      }

      setSuccess(true);
      setError("");
      setTitle("");
      setContent("");
      setImage(null);

      router.push("/blog");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Create a New Blog Post
        </Typography>

        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mt: 2 }}>Blog post created successfully!</Alert>}

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="title"
            label="Title"
            name="title"
            autoComplete="off"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="content"
            label="Content"
            multiline
            rows={6}
            id="content"
            autoComplete="off"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <Button
            variant="contained"
            component="label"
            sx={{ mt: 2 }}
          >
            Upload Image
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleImageChange}
            />
          </Button>
          {image && (
            <Typography variant="body2" sx={{ mt: 1 }}>
              Selected file: {image.name}
            </Typography>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Create Blog
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
*/
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
// ✅ Добавляем CircularProgress
import { Box, Button, Container, TextField, Typography, Alert, CircularProgress } from "@mui/material"; 

export default function CreateBlogPage() {
  const { data: session } = useSession();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  // 💡 НОВОЕ СОСТОЯНИЕ: для отслеживания отправки
  const [isSubmitting, setIsSubmitting] = useState(false); 

  // ✅ Redirect if user is not logged in
  if (!session) {
    return (
      <Container maxWidth="sm">
        <Alert severity="error">You must be logged in to create a blog post.</Alert>
      </Container>
    );
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return; // Защита от повторного клика

    // 💡 Начинаем отправку
    setIsSubmitting(true); 
    setError("");
    setSuccess(false);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await fetch("/api/blog/create", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "An error occurred while creating the blog post.");
      }

      setSuccess(true);
      setError("");
      setTitle("");
      setContent("");
      setImage(null);

      // Небольшая задержка перед редиректом
      setTimeout(() => {
        router.push("/blog");
      }, 500); 
      
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred.");
      }
      setIsSubmitting(false); // 💡 Останавливаем загрузку при ошибке
    } 
    // При успешном редиректе компонент размонтируется, и состояние сбросится
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Create a New Blog Post
        </Typography>

        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mt: 2 }}>Blog post created successfully!</Alert>}

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="title"
            label="Title"
            name="title"
            autoComplete="off"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={isSubmitting} // 💡 Отключаем поля
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="content"
            label="Content"
            multiline
            rows={6}
            id="content"
            autoComplete="off"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            disabled={isSubmitting} // 💡 Отключаем поля
          />
          <Button
            variant="contained"
            component="label"
            sx={{ mt: 2 }}
            disabled={isSubmitting} // 💡 Отключаем кнопку загрузки файла
          >
            Upload Image
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleImageChange}
            />
          </Button>
          {image && (
            <Typography variant="body2" sx={{ mt: 1 }}>
              Selected file: {image.name}
            </Typography>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={isSubmitting} // 💡 Отключаем кнопку во время отправки
          >
            {/* 💡 Отображаем спиннер или текст */}
            {isSubmitting ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Create Blog"
            )}
          </Button>
        </Box>
      </Box>
    </Container>
  );
}