"use client";

import { useState } from "react";
import { Formik, Form, Field, ErrorMessage, FieldProps } from "formik";
import * as yup from "yup";
import { Box, Typography, Button, TextField, Alert, Container } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
});

export default function ForgotPassword() {
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  const onSubmit = async (values: { email: string }) => {
    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await response.json();
      setMessage({ text: data.message, type: "success" });
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
          Forgot Password?
        </Typography>
        <Typography variant="body1" sx={{ color: "text.secondary", mb: 3 }}>
          Enter your email below, and we&apos;ll send you a link to reset your password.
        </Typography>

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

        <Formik initialValues={{ email: "" }} validationSchema={schema} onSubmit={onSubmit}>
          {({ isSubmitting }) => (
            <Form>
              <Field name="email">
                {({ field }: FieldProps) => (
                  <TextField
                    {...field}
                    type="email"
                    label="Email Address"
                    fullWidth
                    variant="outlined"
                    margin="normal"
                  />
                )}
              </Field>
              <ErrorMessage name="email" component="p" className="error" />

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
                {isSubmitting ? "Sending..." : "Send Reset Link"}
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Container>
  );
}
