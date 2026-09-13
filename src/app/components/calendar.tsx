
"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  CircularProgress,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";
import dayjs from "dayjs";

const convertDate = (dateString: string) => dayjs(dateString).format("MM/DD/YYYY");

const CalendarWithBooking = () => {
  const [availableSlots, setAvailableSlots] = useState<{ id: string; date: string; time: string }[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [notes, setNotes] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [isLoadingSlots, setIsLoadingSlots] = useState(true);

  useEffect(() => {
    const fetchAvailableSlots = async () => {
      setIsLoadingSlots(true);
      try {
        const response = await fetch("/api/available");
        const data = await response.json();
        setAvailableSlots(data);
        setSelectedSlot(data.length > 0 ? data[0].id : null);
      } catch (error) {
        console.error("❌ Ошибка загрузки:", error);
      }
      setIsLoadingSlots(false);
    };

    fetchAvailableSlots();
  }, []);

  const bookAppointment = async () => {
    if (!selectedSlot) {
      alert("Выберите дату и время!");
      return;
    }

    setLoading(true);
    try {
      const selected = availableSlots.find((slot) => slot.id === selectedSlot);
      if (!selected) return;

      const response = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date: selected.date, time: selected.time, notes }),
      });

      if (response.ok) {
        alert("Запись успешно создана!");
      } else {
        alert("Ошибка записи.");
      }
    } catch (error) {
      console.error("❌ Ошибка бронирования:", error);
    }
    setLoading(false);
  };

  if (isLoadingSlots) return <CircularProgress />;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", padding: 4 }}>
      <Typography variant="h4" gutterBottom>Запись на прием</Typography>

      <Select fullWidth sx={{ marginTop: 2 }} value={selectedSlot || ""} onChange={(e) => setSelectedSlot(e.target.value)}>
        {availableSlots.map(({ id, date, time }) => (
          <MenuItem key={id} value={id}>{convertDate(date)} ⏰ {time}</MenuItem>
        ))}
      </Select>

      <TextField label="Заметки (необязательно)" multiline rows={2} fullWidth sx={{ marginTop: 2 }} value={notes} onChange={(e) => setNotes(e.target.value)} />

      <Button variant="contained" color="primary" sx={{ marginTop: 3 }} onClick={bookAppointment} disabled={loading}>
        {loading ? <CircularProgress size={24} /> : "Записаться"}
      </Button>
    </Box>
  );
};

export default CalendarWithBooking;
