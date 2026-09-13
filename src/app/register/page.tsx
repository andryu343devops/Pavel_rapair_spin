"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Box, Button, Container, TextField, Typography, Alert, FormControlLabel, Checkbox } from "@mui/material";
import { signIn, useSession } from "next-auth/react";
import AuthButton from "../components/AuthButton";


export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [termsAgreement, setTermsAgreement] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();


  const { update } = useSession(); // ✅ Подключаем обновление сессии

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
  
    if (!name || !email || !password || !confirmPassword) {
      setError("All fields are required.");
      return;
    }
  
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
  
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
  
    if (!termsAgreement) {
      setError("You must agree to the terms and privacy policy.");
      return;
    }
  
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
  
    const data = await res.json();
  
    if (!res.ok) {
      setError(data.error);
    } else {
      setSuccess("Registration successful! Logging in...");
  
      const loginRes = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
  
      if (loginRes?.error) {
        setError("Registered successfully, but login failed. Please try again.");
      } else {
        try {
          await update(); // ✅ Принудительное обновление сессии
          router.refresh(); // ✅ Обновляем состояние страницы
          router.replace("/profile"); // ✅ Перенаправляем сразу в профиль
        } catch (error) {
          console.error("Error updating session:", error);
        }
      }
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ marginTop: 8, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Typography component="h1" variant="h5">Register</Typography>

        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mt: 2 }}>{success}</Alert>}

        <Box component="form" onSubmit={handleRegister} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          {/* ✅ Чекбокс соглашения */}
          <FormControlLabel
            control={
              <Checkbox
                checked={termsAgreement}
                onChange={(e) => setTermsAgreement(e.target.checked)}
              />
            }
            label={
              <Typography variant="body2">
                I agree to the <a href="/terms" target="_blank">Terms of Service</a> and <a href="/privacy" target="_blank">Privacy Policy</a>.
              </Typography>
            }
          />

          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Register
          </Button>
          <AuthButton/>
        </Box>
      </Box>
    </Container>
  );
}
