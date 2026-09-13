"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Divider,
  Container,
  CircularProgress,
  Tabs,
  Tab,
  Button,
} from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import FullCalendarComponent from "../components/FullCalendarComponent";
import AppointmentsList from "@/app/components/appointmentsList";
import UsersList from "../components/UsersList";
import TestimonialForm from "../components/testimonialForm";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import RateReviewIcon from "@mui/icons-material/RateReview";
import PeopleIcon from "@mui/icons-material/People";
import AdminAvailabilityControl from "../components/AdminAvailabilityControl";

type UserAppointment = {
  id: number;
  date: string;
  time: string;
  notes?: string;
};

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const [userAppointment, setUserAppointment] = useState<UserAppointment | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const isAdmin = session?.user?.email === process.env.NEXT_PUBLIC_ADMIN;

  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    console.log("🔍 ProfilePage - Session status:", status, session);

    if (status === "unauthenticated") {
      router.replace("/login");
    }
  }, [status, router, session]);

  useEffect(() => {
    if (status === "authenticated") {
      setActiveSection(isAdmin ? "Appointments" : "Calendar");
    }
  }, [isAdmin, status]);


  const fetchAppointment = async () => {
    try {
      const response = await fetch("/api/user-appointment");

      if (!response.ok) {
        console.error("Error fetching appointment:", response.statusText);
        return;
      }

      const text = await response.text();
      if (!text) {
        console.log("ℹ️ No appointment found.");
        setUserAppointment(null);
        return;
      }

      const data = JSON.parse(text);
      console.log("📡 Appointment data:", data);

      if (data && data.id) {
        setUserAppointment({
          id: data.id,
          date: data.date,
          time: data.time,
          notes: data.notes || "",
        });
      } else {
        console.warn("⚠️ No valid appointment data found.");
        setUserAppointment(null);
      }
    } catch (error) {
      console.error("Error fetching appointment:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (!session || isAdmin) {
      setLoading(false);
      return;
    }

    fetchAppointment();
  }, [session]);

  if (status === "loading" || loading) {
    return (
      <Container maxWidth="lg" sx={{ padding: 3, textAlign: "center" }}>
        <CircularProgress />
        <Typography>Loading...</Typography>
      </Container>
    );
  }

  if (!session) {
    router.push("/login");
    return null;
  }

  const handleCancelAppointment = async () => {
    if (!userAppointment || !userAppointment.id) {
      console.error("❌ Error: Missing appointment ID!", userAppointment);
      return;
    }

    try {
      const response = await fetch(`/api/cancel`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ appointmentId: userAppointment.id }),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Appointment canceled.");
        setUserAppointment(null);
      } else {
        console.error("❌ Error canceling appointment:", result);
        alert(`Error: ${result.error}`);
      }
    } catch (error) {
      console.error("❌ Error canceling appointment:", error);
    }
  };

  const sections = isAdmin
    ? [
      { key: "Appointments", label: "Appointments", icon: <CalendarMonthIcon /> },
      { key: "Users", label: "Users", icon: <PeopleIcon /> },
    ]
    : [
      { key: "Calendar", label: "Calendar", icon: <CalendarMonthIcon /> },
      { key: "Testimonial", label: "Testimonial", icon: <RateReviewIcon /> },
    ];
  const handleAppointmentCreated = () => {
    console.log("🔄 Appointment created, refreshing data...");
    fetchAppointment(); // ✅ Перезагрузка данных о назначении
  };
  return (
    <Container maxWidth="lg" sx={{ padding: 1 }}>
      <Tabs
        value={activeSection ?? sections[0].key}
        onChange={(_, newValue) => setActiveSection(newValue)}
        centered
        textColor="primary"
        indicatorColor="primary"
        sx={{ marginBottom: 2 }}
      >
        {sections.map((section) => (
          <Tab key={section.key} label={section.label} value={section.key} />
        ))}
      </Tabs>

      <Box sx={{ flex: 1, padding: 1 }}>
        <Typography variant="h4">{activeSection}</Typography>
        <Divider sx={{ marginBottom: 2 }} />

        {isAdmin ? (
          activeSection === "Appointments" ? (
            <>
              <AppointmentsList />
              <AdminAvailabilityControl />
            </>
          ) : (
            <UsersList />
          )
        ) : activeSection === "Calendar" ? (
          userAppointment ? (
            <Box
              sx={{
                padding: { xs: 3, md: 4 },
                background: "linear-gradient(135deg, #e3f2fd, #ffffff)",
                borderRadius: "20px",
                textAlign: "center",
                boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
                maxWidth: { xs: "100%", sm: 400, md: 450 },
                margin: "auto",
                transition: "all 0.3s",
                "&:hover": {
                  transform: { md: "translateY(-5px)" },
                  boxShadow: "0px 15px 25px rgba(0, 0, 0, 0.15)",
                },
              }}
            >
              <Typography
                variant="h5"
                fontWeight="bold"
                sx={{
                  color: "#1976d2",
                  marginBottom: 2,
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: { xs: "1.5rem", md: "2rem" },
                }}
              >
                ✅ Appointment Confirmed!
              </Typography>

              <Divider sx={{ marginBottom: 3 }} />

              <Typography
                variant="h6"
                sx={{
                  color: "#333",
                  fontWeight: "500",
                  fontFamily: "'Poppins', sans-serif",
                  marginBottom: 2,
                  fontSize: { xs: "1rem", md: "1.25rem" },
                }}
              >
                📅 {userAppointment.date}
              </Typography>

              <Typography
                variant="h6"
                sx={{
                  color: "#d32f2f",
                  fontWeight: "bold",
                  fontFamily: "'Poppins', sans-serif",
                  marginBottom: 3,
                  fontSize: { xs: "1rem", md: "1.25rem" },
                }}
              >
                ⏰ {userAppointment.time}
              </Typography>

              <Button
                variant="contained"
                color="error"
                onClick={handleCancelAppointment}
                sx={{
                  fontFamily: "'Poppins', sans-serif",
                  padding: { xs: "8px 16px", md: "10px 20px" },
                  borderRadius: "8px",
                  boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.1)",
                  fontSize: { xs: "0.875rem", md: "1rem" },
                  transition: "all 0.3s",
                  "&:hover": {
                    backgroundColor: "#c62828",
                    boxShadow: "0px 12px 20px rgba(0, 0, 0, 0.15)",
                    transform: "translateY(-2px)",
                  },
                }}
              >
                 Cancel Appointment
              </Button>
            </Box>


          ) : (
            <FullCalendarComponent onAppointmentCreated={handleAppointmentCreated} />
          )
        ) : (
          <TestimonialForm />
        )}
      </Box>
    </Container>
  );
}

