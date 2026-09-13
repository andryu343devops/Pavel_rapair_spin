"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Box,
  Button,
  Stack,
  CircularProgress,
  useMediaQuery,
} from "@mui/material";
import { useSession } from "next-auth/react";
import { useTheme } from "@mui/material/styles";
import Head from "next/head";

interface BlogPost {
  id: number;
  title: string;
  content: string;
  imageUrl?: string;
  author: { name: string };
  createdAt: string;
}

const BlogSection = () => {
  const { data: session, status } = useSession();
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const isAdmin = session?.user?.email === process.env.NEXT_PUBLIC_ADMIN;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await fetch("/api/blog");
        if (!response.ok) throw new Error("Failed to fetch blog posts");

        const data: BlogPost[] = await response.json();
        setBlogPosts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  if (status === "loading" || loading) {
    return <CircularProgress sx={{ display: "block", margin: "auto", mt: 4 }} />;
  }

  if (error) {
    return (
      <Typography color="error" sx={{ textAlign: "center", mt: 4 }}>
        Error: {error}
      </Typography>
    );
  }

  return (
    <>
      <Head>
        <title>Pavel&apos;s Appliance Repair Blog | Tips & Guides</title>
        <meta
          name="description"
          content="Discover useful tips and guides on appliance maintenance and repair. Learn from the experts at Pavel's Appliance Repair in the Twin Cities."
        />
        <meta
          name="keywords"
          content="appliance repair blog, maintenance tips, washing machine repair, dryer repair, refrigerator tips, Twin Cities"
        />
        <link rel="canonical" href="https://www.pavelsappliancerepair.com/blog" />
      </Head>

      <Box sx={{ padding: 4, marginBottom: 2, maxWidth: "1200px", mx: "auto" }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ marginBottom: 3 }}>
          <Typography
            variant="h4"
            sx={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: "bold",
              fontSize: isMobile ? "1.8rem" : "2.5rem",
              color: "#333",
            }}
          >
            Blog Section
          </Typography>
          {isAdmin && (
            <Link href="/createblog" passHref>
              <Button variant="contained" color="primary">
                Create Blog
              </Button>
            </Link>
          )}
        </Stack>

        <Grid container spacing={4} component="section">
          {blogPosts.map((post) => (
            <Grid item xs={12} sm={6} md={4} key={post.id}>
              <article>
                <motion.div
                  whileHover={{ scale: 1.05, translateY: -5 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                >
                  <Card
                    sx={{
                      height: "100%",
                      cursor: "pointer",
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    <Link href={`/blog/${post.id}`} passHref>
                      <CardMedia
                        component="img"
                        height="180"
                        image={post.imageUrl || "https://via.placeholder.com/400x200"}
                        alt={`Image for ${post.title}`}
                        sx={{ objectFit: "cover" }}
                      />
                      <CardContent>
                        <Typography
                          variant="h6"
                          gutterBottom
                          sx={{
                            fontFamily: "'Poppins', sans-serif",
                            fontWeight: "600",
                            fontSize: isMobile ? "1.2rem" : "1.5rem",
                          }}
                        >
                          {post.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            fontFamily: "'Poppins', sans-serif",
                            fontSize: isMobile ? "0.9rem" : "1rem",
                          }}
                        >
                          {post.content.substring(0, 100)}...
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginTop: 2,
                          }}
                        >
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{ fontFamily: "'Poppins', sans-serif" }}
                          >
                            By {post.author?.name || "Pavel Pavluchenko"}
                          </Typography>
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{ fontFamily: "'Poppins', sans-serif" }}
                          >
                            {new Date(post.createdAt).toLocaleDateString()}
                          </Typography>
                        </Box>
                      </CardContent>
                    </Link>
                  </Card>
                </motion.div>
              </article>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default BlogSection;
