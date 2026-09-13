"use client";

import { useEffect, useState, Suspense } from "react";
import { useParams, useRouter } from "next/navigation";
import { Container, Typography, CircularProgress, Alert, Box, Button } from "@mui/material";
// ✅ Добавляем useSession
import { useSession } from "next-auth/react"; 
import Image from "next/image";
// ✅ Добавляем Head для SEO (если используете Pages Router)
import Head from "next/head"; 

interface BlogPost {
  id: number;
  title: string;
  content: string;
  imageUrl?: string;
}

export default function BlogPostPage() {
  const { id } = useParams();
  const router = useRouter();
  
  // 💡 1. Использование useSession для получения данных сессии
  const { data: session, status } = useSession(); 
  
  const [post, setPost] = useState<BlogPost | null>(null);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // 💡 2. Вычисляем isAdmin: Сравнение email сессии с публичным email администратора
  const isAdmin = session?.user?.email === process.env.NEXT_PUBLIC_ADMIN;

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return;

      try {
        const response = await fetch(`/api/blog/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch the post");
        }
        const data: BlogPost = await response.json();
        setPost(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unexpected error occurred");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [id, isAdmin]);

  const handleDelete = async () => {
    const token = localStorage.getItem("authToken"); 
    try {
      const response = await fetch(`/api/blog/delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          // Оставляем токен, если ваш бэкенд его требует для DELETE
          Authorization: `Bearer ${token}`, 
        },
        body: JSON.stringify({ id: Number(id) }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to delete the post");
      }

      router.push("/blog"); // Redirect after deletion
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Error deleting post:", err.message);
        setError(err.message);
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  // 💡 Обновляем условие загрузки: ждем, пока загрузится сессия И пост
  if (status === "loading" || isLoading) { 
    return (
      <Container maxWidth="md" sx={{ mt: 4, textAlign: "center" }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }
  
  // 💡 SEO: Вычисляем мета-описание
  const metaDescription = post?.content ? post.content.substring(0, 150) + "..." : "Read the full blog post on appliance repair.";
  const postTitle = post?.title || "Blog Post Not Found";

  return (
    <Suspense fallback={<CircularProgress />}>
        {/* ✅ Добавляем Head для SEO */}
        <Head>
            <title>{postTitle} | Pavel&apos;s Appliance Repair Blog</title>
            <meta name="description" content={metaDescription} />
            {/* Добавьте канонический URL, если используете Next.js Pages Router */}
            <link rel="canonical" href={`https://www.pavelsappliancerepair.com/blog/${id}`} />
        </Head>
        
        <Container maxWidth="sm" sx={{ padding: 0, mt: 4, mb: 4 }}>
        <Box>
          {post?.imageUrl && (
            <Box sx={{ mt: 4 }}>
              <Image
                src={post.imageUrl}
                alt={post.title}
                width={800}
                height={500}
                // Примечание: Убедитесь, что domain: 'res.cloudinary.com' добавлен в next.config.js
                style={{
                  maxWidth: "100%", 
                  height: "auto",   
                  borderRadius: "8px",
                }}
                priority
              />
            </Box>
          )}
          <Typography
            variant="h3"
            gutterBottom
            sx={{
              fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
              lineHeight: { xs: '1.2', sm: '1.3', md: '1.4' }
            }}
          >
            {post?.title}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              mt: 2,
              whiteSpace: "pre-line",
              fontSize: { xs: "14px", sm: "16px", md: "18px" },
              lineHeight: { xs: "1.4", sm: "1.6", md: "1.8" },
            }}
          >
            {post?.content}
          </Typography>
          <Box sx={{ mt: 6, textAlign: "center" }}>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => router.push("/blog")}
            >
              Read More Articles
            </Button>
          </Box>
          {/* ✅ Кнопка удаления отображается только для администратора */}
          {isAdmin && (
            <Box sx={{ mt: 4, textAlign: "right" }}>
              <Button
                variant="contained"
                color="error"
                onClick={handleDelete}
              >
                Delete Post
              </Button>
            </Box>
          )}
        </Box>
      </Container>
    </Suspense>
  );
}