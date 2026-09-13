"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Formik, Form, Field, FieldProps } from "formik";
import * as yup from "yup";
import { Box, Typography, Button, TextField, Alert, Container } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";

// ✅ Валидация паролей
const schema = yup.object().shape({
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

function ResetPasswordForm() {
  const params = useSearchParams();
  const token = params.get("token");
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  const onSubmit = async (
    values: { password: string; confirmPassword: string },
    { resetForm }: { resetForm: () => void }
  ) => {
    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password: values.password }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage({ text: data.message, type: "success" });
        resetForm();
      } else {
        setMessage({ text: data.message, type: "error" });
      }
    } catch {
      setMessage({ text: "Something went wrong!", type: "error" });
    }

    setTimeout(() => {
      setMessage(null);
    }, 3000);
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          backgroundColor: "background.paper",
          boxShadow: 3,
          borderRadius: 3,
          padding: { xs: 3, sm: 5 },
          textAlign: "center",
          mt: 8,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            fontFamily: "'Poppins', sans-serif",
            color: "primary.main",
            mb: 2,
          }}
        >
          Reset Password
        </Typography>
        <Typography variant="body1" sx={{ color: "text.secondary", mb: 3 }}>
          Enter your new password below.
        </Typography>

        {/* ✅ Всплывающее уведомление */}
        <AnimatePresence>
          {message && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <Alert severity={message.type} sx={{ mb: 2 }}>
                {message.text}
              </Alert>
            </motion.div>
          )}
        </AnimatePresence>

        <Formik
          initialValues={{ password: "", confirmPassword: "" }}
          validationSchema={schema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form>
              <Field name="password">
                {({ field }: FieldProps) => (
                  <TextField
                    {...field}
                    type="password"
                    label="New Password"
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    error={touched.password && !!errors.password}
                    helperText={touched.password && errors.password}
                  />
                )}
              </Field>

              <Field name="confirmPassword">
                {({ field }: FieldProps) => (
                  <TextField
                    {...field}
                    type="password"
                    label="Confirm Password"
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    error={touched.confirmPassword && !!errors.confirmPassword}
                    helperText={touched.confirmPassword && errors.confirmPassword}
                  />
                )}
              </Field>

              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{
                  mt: 2,
                  py: 1.5,
                  fontSize: "1rem",
                  fontWeight: "bold",
                  textTransform: "none",
                }}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Resetting..." : "Reset Password"}
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Container>
  );
}

// ✅ Оборачиваем в `Suspense`
export default function ResetPassword() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <ResetPasswordForm />
    </Suspense>
  );
}
