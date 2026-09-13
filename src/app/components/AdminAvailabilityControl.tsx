"use client";

import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Divider,
  Grid,
  CircularProgress,
} from "@mui/material";

const AdminAvailabilityControl = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startTime, setStartTime] = useState("08:00");
  const [endTime, setEndTime] = useState("17:00");
  const [intervalMinutes, setIntervalMinutes] = useState(60);
  const [loading, setLoading] = useState(false);

  /** 🔥 Очистка всех слотов доступности и назначений */
  const handleClearAvailability = async () => {
    if (confirm("Are you sure you want to clear all availability and appointments?")) {
      setLoading(true);
      try {
        const response = await fetch("/api/availability/clear", {
          method: "DELETE",
        });

        if (response.ok) {
          alert("✅ Availability cleared successfully!");
        } else {
          alert("❌ Failed to clear availability.");
        }
      } catch (error) {
        console.error("Error clearing availability:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  /** ⚙️ Генерация новых слотов доступности */
  const handleGenerateAvailability = async () => {
    if (!startDate || !endDate || !startTime || !endTime || !intervalMinutes) {
      alert("❌ Please fill in all required fields!");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/availability/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ startDate, endDate, startTime, endTime, intervalMinutes }),
      });

      if (response.ok) {
        alert("✅ Availability generated successfully!");
      } else {
        alert("❌ Failed to generate availability.");
      }
    } catch (error) {
      console.error("Error generating availability:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper sx={{ padding: 3, margin: 2 }}>
      <Typography variant="h5" gutterBottom>
        🛠️ Admin Availability Control
      </Typography>
      <Divider sx={{ marginBottom: 2 }} />

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Start Date (YYYY-MM-DD)"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="End Date (YYYY-MM-DD)"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Start Time"
            type="time"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="End Time"
            type="time"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Interval (minutes)"
            type="number"
            fullWidth
            value={intervalMinutes}
            onChange={(e) => setIntervalMinutes(parseInt(e.target.value) || 60)}
          />
        </Grid>
      </Grid>

      <Box sx={{ marginTop: 3, display: "flex", gap: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleGenerateAvailability}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : "Generate Availability"}
        </Button>

        <Button
          variant="contained"
          color="error"
          onClick={handleClearAvailability}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : "Clear Availability"}
        </Button>
      </Box>
    </Paper>
  );
};

export default AdminAvailabilityControl;
