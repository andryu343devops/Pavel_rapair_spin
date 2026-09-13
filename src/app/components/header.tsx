"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Drawer,
  List,
  ListItemText,
  Button,
  Container,
  Stack,
  ListItemButton,
} from "@mui/material";
import { Login, PersonAdd, Menu, Close, AccountCircle, Build, Logout, MenuBook, Reviews } from "@mui/icons-material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const menuItems = [
  { href: "/#services", text: "Services" },
  { href: "/testimonials", text: "Testimonials" },
  { href: "/blog", text: "Blog" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const handleLogout = () => {
    signOut();
    closeMenu();
    router.push("/");
  };

  useEffect(() => {
    closeMenu();
  }, [session]);

  const isAuthenticated = !!session;

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#ffffff",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        borderBottom: "1px solid #ddd",
        py: 1,
      }}
    >
      <Container maxWidth="lg">
        <Toolbar
          sx={{
            justifyContent: "space-between",
            alignItems: "center",
            paddingY: 1,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Link href="/" passHref>
              <Box>
                <Image src="/img/logo.svg" alt="logo" width={210} height={50} />
              </Box>
            </Link>
          </Box>

          <IconButton
            edge="end"
            sx={{ display: { xs: "block", md: "none" }, color: "black" }}
            aria-label="menu"
            onClick={toggleMenu}
          >
            <Menu />
          </IconButton>

          <Stack
            direction="row"
            spacing={4}
            component="nav"
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
            }}
          >
            {menuItems.map((item) => (
              <Link href={item.href} passHref key={item.text}>
                <Typography
                  variant="body1"
                  component={motion.div}
                  whileHover={{ scale: 1.1, color: "#1976d2" }}
                  transition={{ type: "spring", stiffness: 300 }}
                  sx={{
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: "500",
                    cursor: "pointer",
                    textDecoration: "none",
                    color: "#333",
                  }}
                >
                  {item.text}
                </Typography>
              </Link>
            ))}

            <Link href={isAuthenticated ? "/profile" : "/login"} passHref>
              <Typography
                variant="body1"
                component={motion.div}
                whileHover={{ scale: 1.1, color: "#1976d2" }}
                sx={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: "500",
                  cursor: "pointer",
                  textDecoration: "none",
                  color: "#333",
                }}
              >
                Schedule Repair
              </Typography>
            </Link>
          </Stack>

          <Box
            component="nav"
            sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}
          >
            {status === "loading" ? (
              <Typography variant="body1">Loading...</Typography>
            ) : !isAuthenticated ? (
              <>
                <Button
                  variant="outlined"
                  color="primary"
                  startIcon={<Login />}
                  sx={{ fontFamily: "'Poppins', sans-serif" }}
                  onClick={() => router.push("/login")}
                >
                  Sign In
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  startIcon={<PersonAdd />}
                  sx={{ fontFamily: "'Poppins', sans-serif" }}
                  onClick={() => router.push("/register")}
                >
                  Sign Up
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="outlined"
                  color="primary"
                  sx={{ fontFamily: "'Poppins', sans-serif" }}
                  onClick={() => router.push("/profile")}
                >
                  Profile
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  sx={{ fontFamily: "'Poppins', sans-serif" }}
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </>
            )}
          </Box>


          <Drawer anchor="right" open={isMenuOpen} onClose={closeMenu}>
            <Box
              sx={{
                width: 280,
                padding: 2,
                display: "flex",
                flexDirection: "column",
                height: "100%",
                backgroundColor: "#fff",
              }}
            >
              <IconButton onClick={closeMenu} sx={{ alignSelf: "flex-end" }}>
                <Close sx={{ fontSize: 28 }} />
              </IconButton>

              <List sx={{ mt: 1 }}>
                {menuItems.map((item) => (
                  <ListItemButton
                    key={item.text}
                    component={Link}
                    href={item.href}
                    onClick={closeMenu}
                    sx={{
                      borderRadius: 2,
                      "&:hover": { backgroundColor: "#f5f5f5" },
                    }}
                  >
                    {/* Добавляем иконки */}
                    {item.text === "Services" && <Build sx={{ mr: 1, color: "#1976d2" }} />}
                    {item.text === "Testimonials" && <Reviews sx={{ mr: 1, color: "#1976d2" }} />}
                    {item.text === "Blog" && <MenuBook sx={{ mr: 1, color: "#1976d2" }} />}

                    <ListItemText
                      primary={item.text}
                      primaryTypographyProps={{
                        fontSize: 16,
                        fontWeight: 500,
                        sx: { color: "#333" },
                      }}
                    />
                  </ListItemButton>
                ))}

                <ListItemButton
                  component={Link}
                  href={isAuthenticated ? "/profile" : "/login"}
                  onClick={closeMenu}
                  sx={{
                    borderRadius: 2,
                    "&:hover": { backgroundColor: "#f5f5f5" },
                  }}
                >
                  <Build sx={{ mr: 1, color: "#1976d2" }} />
                  <ListItemText
                    primary="Schedule Repair"
                    primaryTypographyProps={{
                      fontSize: 16,
                      fontWeight: 500,
                      sx: { color: "#333" },
                    }}
                  />
                </ListItemButton>
              </List>

              {/* Блок кнопок логина / профиля */}
              <Box sx={{ mt: 3 }}>
                {status === "loading" ? (
                  <Typography variant="body2" align="center">
                    Loading...
                  </Typography>
                ) : !isAuthenticated ? (
                  <Stack spacing={1.5}>
                    <Button
                      fullWidth
                      variant="text"
                      startIcon={<Login sx={{ color: "#1976d2" }} />}
                      sx={{
                        textTransform: "none",
                        fontSize: 15,
                        borderRadius: 2,
                        fontWeight: 500,
                        color: "#333",
                      }}
                      onClick={() => {
                        router.push("/login");
                        closeMenu();
                      }}
                    >
                      Sign In
                    </Button>
                    <Button
                      fullWidth
                      variant="contained"
                      startIcon={<PersonAdd />}
                      sx={{
                        textTransform: "none",
                        fontSize: 15,
                        borderRadius: 2,
                        fontWeight: 500,
                        backgroundColor: "#1976d2",
                        "&:hover": { backgroundColor: "#1565c0" },
                      }}
                      onClick={() => {
                        router.push("/register");
                        closeMenu();
                      }}
                    >
                      Sign Up
                    </Button>
                  </Stack>
                ) : (
                  <Stack spacing={1.5}>
                    <Button
                      fullWidth
                      variant="text"
                      startIcon={<AccountCircle sx={{ color: "#1976d2" }} />}
                      sx={{
                        textTransform: "none",
                        fontSize: 15,
                        borderRadius: 2,
                        fontWeight: 500,
                        color: "#333",
                      }}
                      onClick={() => {
                        router.push("/profile");
                        closeMenu();
                      }}
                    >
                      Profile
                    </Button>
                    <Button
                      fullWidth
                      variant="text"
                      startIcon={<Logout sx={{ color: "#d32f2f" }} />}
                      sx={{
                        textTransform: "none",
                        fontSize: 15,
                        borderRadius: 2,
                        fontWeight: 500,
                        color: "#d32f2f",
                      }}
                      onClick={handleLogout}
                    >
                      Logout
                    </Button>
                  </Stack>
                )}
              </Box>
            </Box>
          </Drawer>


        </Toolbar>
      </Container>
    </AppBar>
  );
}
