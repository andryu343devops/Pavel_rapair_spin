"use client";

import { signIn } from "next-auth/react";
import { Button } from "@mui/material";
import { Google } from "@mui/icons-material";

export default function AuthButton() {
  return (
    <Button
      fullWidth
      variant="outlined"
      sx={{ mt: 1 }}
      startIcon={<Google />}
      onClick={() => signIn("google", { callbackUrl: "/profile" })} // ✅ Редирект после входа
    >
      Sign in with Google
    </Button>
  );
}
