"use client";

import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import {
  Box,
  CircularProgress,
  Typography,
  Select,
  MenuItem,
  Button,
  TextField,
  useMediaQuery,
  Paper,
  Divider,
  Grid,
  Alert,
} from "@mui/material";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react"; // Для получения данных пользователя

type FullCalendarComponentProps = {
  onAppointmentCreated: () => void;
};

const FullCalendarComponent = ({ onAppointmentCreated }: FullCalendarComponentProps) => {
  const isMobile = useMediaQuery("(max-width:900px)");
  const [availableDates, setAvailableDates] = useState<string[]>([]);
  const [initialDate, setInitialDate] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [notes, setNotes] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [timeLoading, setTimeLoading] = useState(false);
  const { data: session } = useSession();
  
  useEffect(() => {
    const fetchAvailableDates = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/available");
        const data = await response.json();
        const dates = data.map((event: { date: string }) => event.date);

        setAvailableDates(dates);

        if (dates.length > 0) {
          setInitialDate(dates[0]);
        }
      } catch (error) {
        console.error("Error loading dates:", error);
      }
      setLoading(false);
    };

    fetchAvailableDates();
  }, []);

  const fetchAvailableTimes = async (date: string) => {
    setSelectedDate(date);
    setAvailableTimes([]);
    setSelectedTime(null);
    setTimeLoading(true);

    try {
      const response = await fetch(`/api/available-times?date=${date}`);
      const data = await response.json();

      setAvailableTimes(data);
      if (data.length > 0) {
        setSelectedTime(data[0]);
      }
    } catch (error) {
      console.error("Error loading times:", error);
    }
    setTimeLoading(false);
  };


  const handleBooking = async () => {
    if (!selectedDate || !selectedTime) {
      alert("Please select a date and time!");
      return;
    }
  
    const userName = session?.user?.name || "Anonymous";
    const userEmail = session?.user?.email || "No email provided";
  
    try {
      const bookingResponse = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date: selectedDate, time: selectedTime, notes, address }),
      });
  
      if (bookingResponse.ok) {
        // Отправка письма через API маршрут с данными пользователя
        const emailResponse = await fetch("/api/send-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            date: selectedDate,
            time: selectedTime,
            notes,
            address,
            userName,
            userEmail,
          }),
        });
  
        if (emailResponse.ok) {
          alert("Appointment successfully created and email sent!");
        } else {
          const emailError = await emailResponse.json();
          console.error("Error sending email notification:", emailError.message);
          alert("Appointment created, but failed to send email notification.");
        }
  
        setSelectedDate(null);
        setSelectedTime(null);
        setNotes("");
        setAddress("");
        onAppointmentCreated();
  
      } else {
        const data = await bookingResponse.json();
        alert(data.error || "Booking error.");
      }
    } catch (error) {
      console.error("Error booking appointment:", error);
      alert("Failed to book appointment. Please try again.");
    }
  };
  


  return (
    <Box sx={{ padding: isMobile ? 0 : 4, textAlign: "center" }}>
      <Paper
        elevation={4}
        component={motion.div}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        sx={{
          padding: isMobile ? 2 : 5,
          borderRadius: "20px",
          background: "linear-gradient(145deg, #ffffff, #f1f1f1)",
          boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography variant={isMobile ? "h6" : "h4"} sx={{ marginBottom: 2, fontWeight: "bold", color: "#1976d2" }}>
          📅 Schedule Your Appointment
        </Typography>
        <Divider sx={{ marginBottom: 3 }} />

        {loading ? (
          <CircularProgress />
        ) : (
          <Grid container spacing={4}>
            <Grid item xs={12} md={7}>
              <Box sx={{ overflowX: "auto", paddingBottom: 2, minHeight: isMobile ? "450px" : "500px" }}>
                <FullCalendar
                  plugins={[dayGridPlugin, interactionPlugin]}
                  initialView="dayGridMonth"
                  initialDate={initialDate || undefined}
                  selectable
                  height={isMobile ? "auto" : 500}
                  headerToolbar={isMobile ? { left: "", center: "title", right: "" } : undefined}
                  events={availableDates.map((date) => ({
                    start: date,
                    display: "background",
                    backgroundColor: selectedDate === date ? "#42a5f5" : "#7CDEDC",
                    borderColor: "#4caf50",
                  }))}
                  dateClick={(info) => fetchAvailableTimes(info.dateStr)}
                  dayHeaderContent={(args) => args.text.substring(0, 2)}
                />
              </Box>
            </Grid>

            <Grid item xs={12} md={5}>
              <Box
                sx={{
                  padding: 3,
                  background: "linear-gradient(135deg, #1e88e5, #42a5f5)",
                  color: "white",
                  borderRadius: "20px",
                  boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
                }}
              >
                {!selectedDate && (
                  <Alert severity="info" sx={{ mb: 2 }}>
                    Please select a date from the calendar first.
                  </Alert>
                )}

                {selectedDate && (
                  <>
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>📆 {selectedDate}</Typography>

                    {timeLoading ? (
                      <CircularProgress />
                    ) : (
                      <>
                        <Select
                          fullWidth
                          value={selectedTime || ""}
                          onChange={(e) => setSelectedTime(e.target.value)}
                          sx={{ marginTop: 2, background: "white", borderRadius: "8px", color: "#1e88e5" }}
                        >
                          {availableTimes.map((time) => (
                            <MenuItem key={time} value={time}>
                              {time}
                            </MenuItem>
                          ))}
                        </Select>

                        <TextField
                          label="Address"
                          fullWidth
                          sx={{ marginTop: 2, background: "white", borderRadius: "8px" }}
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                        />

                        <TextField
                          label="Notes"
                          fullWidth
                          multiline
                          rows={2}
                          sx={{ marginTop: 2, background: "white", borderRadius: "8px" }}
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                        />

                        <Button
                          variant="contained"
                          sx={{ marginTop: 3, padding: "10px 20px", fontWeight: "bold" }}
                          onClick={handleBooking}
                          disabled={!selectedTime}
                        >
                          ✅ Book Appointment
                        </Button>
                      </>
                    )}
                  </>
                )}
              </Box>
            </Grid>
          </Grid>
        )}
      </Paper>
    </Box>
  );
};

export default FullCalendarComponent;
