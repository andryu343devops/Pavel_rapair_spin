"use client";

import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { motion, AnimatePresence } from "framer-motion";

// ✅ Валидация формы
const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  message: yup.string().min(10, "Message must be at least 10 characters").required("Message is required"),
});

interface ContactFormProps {
  closePopup?: () => void; // Опциональное закрытие попапа
}

export default function ContactForm({ closePopup }: ContactFormProps) {
  const [notification, setNotification] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const onSubmit = async (
    values: { name: string; email: string; message: string },
    { resetForm }: { resetForm: () => void }
  ) => {
    try {
      const response = await fetch("/api/tomail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        setNotification({ message: "✅ Message sent successfully!", type: "success" });
        resetForm();

        // Закрыть попап через 1.5 сек, чтобы человек увидел уведомление
        setTimeout(() => {
          if (closePopup) closePopup();
        }, 1500);
      } else {
        setNotification({ message: "❌ Something went wrong!", type: "error" });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setNotification({ message: "❌ Failed to send the message!", type: "error" });
    }

    // ✅ Автоисчезновение уведомления через 3 секунды
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  return (
    <>
      {/* ✅ Всплывающее уведомление */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className={`popup ${notification.type}`}
          >
            {notification.message}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ✅ Форма */}
      <Formik
        initialValues={{ name: "", email: "", message: "" }}
        validationSchema={schema}
        onSubmit={onSubmit}
      >
        {({ errors, touched }) => (
          <Form className="form">
            <Field
              name="name"
              type="text"
              className={`form__input ${touched.name && errors.name ? "error" : ""}`}
              placeholder="Your name"
            />
            <ErrorMessage name="name" component="p" className="form__error" />

            <Field
              name="email"
              type="email"
              className={`form__input ${touched.email && errors.email ? "error" : ""}`}
              placeholder="Your email"
            />
            <ErrorMessage name="email" component="p" className="form__error" />

            <Field
              name="message"
              as="textarea"
              className={`form__textarea ${touched.message && errors.message ? "error" : ""}`}
              placeholder="Please enter at least 10 characters"
              rows={4}
            />
            <ErrorMessage name="message" component="p" className="form__error" />

            <button type="submit" className="button form__button">
              Submit
            </button>
          </Form>
        )}
      </Formik>

      {/* ✅ Стили для всплывающего уведомления */}
      <style jsx>{`
        .popup {
          position: fixed;
          top: 20px;
          left: 50%;
          transform: translateX(-50%);
          padding: 12px 16px;
          font-size: 14px;
          border-radius: 8px;
          color: white;
          font-weight: bold;
          box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.15);
          z-index: 2000;
        }
        .success {
          background-color: #4caf50;
        }
        .error {
          background-color: #f44336;
        }
      `}</style>
    </>
  );
}
