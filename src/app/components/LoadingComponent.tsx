// src/app/components/LoadingComponent.tsx

"use client";

import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import { motion } from "framer-motion";

const LoadingComponent = () => {
  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "60vh",
        backgroundColor: "#f9f9f9",
        padding: 2,
        borderRadius: "16px",
        boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
      }}
    >
      <CircularProgress
        size={60}
        thickness={4.5}
        sx={{
          color: "#1976d2",
          marginBottom: 2,
          animation: "spin 1.5s linear infinite",
        }}
      />
      <Typography
        variant="h6"
        sx={{
          color: "#1976d2",
          fontWeight: "bold",
          fontFamily: "'Poppins', sans-serif",
        }}
      >
        Loading, please wait...
      </Typography>
    </Box>
  );
};

export default LoadingComponent;
