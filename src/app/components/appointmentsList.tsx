"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Card,
  CardContent,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

const AppointmentsList = () => {
  const [appointments, setAppointments] = useState<
    { id: number; date?: string; time?: string; user: string; address?: string; notes?: string }[]
  >([]);
  const [loading, setLoading] = useState(true);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch("/api/appointments");
        const data = await response.json();
        setAppointments(data);
      } catch (error) {
        console.error("❌ Error loading appointments:", error);
      }
      setLoading(false);
    };

    fetchAppointments();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`/api/appointments`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ appointmentId: id }),
      });

      const data = await response.json();

      if (response.ok) {
        setAppointments((prev) => prev.filter((a) => a.id !== id));
        alert("✅ Appointment successfully deleted!");
      } else {
        alert(`❌ Deletion error: ${data.error || "Unknown error"}`);
      }
    } catch (error) {
      console.error("❌ Error deleting appointment:", error);
    }
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h5" gutterBottom>
        📋 Appointments
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : appointments.length === 0 ? (
        <Typography>📭 No appointments available.</Typography>
      ) : isMobile ? (
        // Mobile View: Simplified cards
        <Box>
          {appointments.map(({ id, date, time, user, address, notes }) => {
            const formattedDateTime =
              date && time
                ? `${new Date(date).toLocaleDateString()} ${new Date(`1970-01-01T${time}`).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}`
                : "Date and Time not specified";

            return (
              <Card key={id} sx={{ marginBottom: 2 }}>
                <CardContent>
                  <Typography variant="h6">{user}</Typography>
                  <Typography variant="body2">📅 {formattedDateTime}</Typography>
                  <Typography variant="body2">📍 {address || "No address provided"}</Typography>
                  {notes && (
                    <Typography variant="body2" sx={{ marginTop: 1 }}>
                      💬 {notes}
                    </Typography>
                  )}
                  <Button
                    color="error"
                    onClick={() => handleDelete(id)}
                    variant="contained"
                    size="small"
                    sx={{ marginTop: 2 }}
                  >
                    Delete
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </Box>
      ) : (
        // Desktop View: Full Table
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date & Time</TableCell>
                <TableCell>User</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Notes</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {appointments.map(({ id, date, time, user, address, notes }) => {
                const formattedDateTime =
                  date && time
                    ? `${new Date(date).toLocaleDateString()} ${new Date(`1970-01-01T${time}`).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}`
                    : "Date and Time not specified";

                return (
                  <TableRow key={id}>
                    <TableCell>{formattedDateTime}</TableCell>
                    <TableCell>{user}</TableCell>
                    <TableCell>{address || "No address provided"}</TableCell>
                    <TableCell>{notes ? notes : "No notes"}</TableCell>
                    <TableCell align="right">
                      <Button
                        color="error"
                        onClick={() => handleDelete(id)}
                        variant="contained"
                        size="small"
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default AppointmentsList;
