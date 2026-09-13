"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signIn, getSession } from "next-auth/react";
import { useSession } from "next-auth/react";
import { Box, Button, Container, TextField, Typography, Alert, Link } from "@mui/material";
// import ReCAPTCHA from "react-google-recaptcha";
import AuthButton from "../components/AuthButton";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [captcha, setCaptcha] = useState<string | null>(null);
  const [error, setError] = useState("");
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    console.log("Session status:", status);
    console.log("Session data:", session);

    if (status === "loading") return;

    if (status === "authenticated" && session?.user) {
      console.log("✅ Пользователь аутентифицирован, но редирект отключен");
      // router.replace("/profile");
    } else if (status === "unauthenticated") {
      console.log("🚫 Пользователь не аутентифицирован, но редирект отключен");
      // router.replace("/login");
    }
  }, [status, session, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // if (!captcha) {
    //   setError("Please complete the reCAPTCHA verification.");
    //   return;
    // }

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    console.log("📝 SignIn response:", res);

    if (!res || res.error) {
      setError(res?.error || "Login failed. Please try again.");
      setPassword("");
      if (res?.error === "No user found with this email") {
        setError("No account found. Would you like to sign up?");
      }
    } else {
      console.log("✅ Successfully logged in!");
      await getSession(); // Принудительное обновление сессии
      window.location.href = "/profile";
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ marginTop: 8, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Typography component="h1" variant="h5">
          Login
        </Typography>

        {error && (
          <Box sx={{ mt: 2, textAlign: "center" }}>
            <Alert severity="error">{error}</Alert>

            {error === "No account found. Would you like to sign up?" && (
              <Button
                variant="outlined"
                fullWidth
                sx={{ mt: 2 }}
                onClick={() => router.push("/register")}
              >
                Sign up
              </Button>
            )}
          </Box>
        )}

        <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* ✅ reCAPTCHA */}
          {/* <Box sx={{ mt: 2, mb: 2, display: "flex", justifyContent: "center" }}>
            <ReCAPTCHA
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
              onChange={setCaptcha}
            />
          </Box> */}

          {/* ✅ Кнопка для сброса пароля */}
          <Box sx={{ textAlign: "right", mt: 1, mb: 2 }}>
            <Link
              href="/forgot-password"
              sx={{
                fontSize: "14px",
                color: "primary.main",
                textDecoration: "none",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              Forgot Password?
            </Link>
          </Box>

          <Button type="submit" fullWidth variant="contained" sx={{ mt: 2, mb: 2 }}>
            Sign in
          </Button>

          <AuthButton />
        </Box>
      </Box>
    </Container>
  );
}
