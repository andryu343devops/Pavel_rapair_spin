"use client";

import React, { useState } from "react";
import { Box, Typography, Button, Grid, Container, useMediaQuery } from "@mui/material";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import OutsideClickHandler from "react-outside-click-handler";
import ContactForm from "./form";
import { useTheme } from "@mui/material/styles";

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

export default function HeroSection() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <>
      <AnimatePresence>
        {isPopupOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              zIndex: 1200,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "20px",
            }}
          >
            <OutsideClickHandler onOutsideClick={closePopup}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                style={{ width: "100%", maxWidth: "500px" }}
              >
                <Box
                  sx={{
                    background: "#ffffff",
                    borderRadius: "16px",
                    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
                    padding: 4,
                    px: 1,
                    textAlign: "center",
                    position: "relative",
                    maxHeight: "90vh",
                    overflowY: "auto",
                  }}
                >
                  <Button
                    onClick={closePopup}
                    sx={{
                      position: "absolute",
                      top: 16,
                      right: 16,
                      minWidth: "auto",
                      padding: 0,
                      color: "#1976d2",
                      fontSize: "1.5rem",
                    }}
                  >
                    ✕
                  </Button>
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: "bold", mb: 2, fontFamily: "'Poppins', sans-serif" }}
                  >
                    Get in touch with us
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    sx={{ mb: 4 }}
                  >
                    Have questions or need urgent assistance? Contact our team today! <br />
                    We&apos;re here to help you with all your appliance repair needs.
                  </Typography>
                  <ContactForm closePopup={closePopup} />
                </Box>
              </motion.div>
            </OutsideClickHandler>
          </motion.div>
        )}
      </AnimatePresence>

      <Box
        component="section"
        sx={{
          background: "linear-gradient(to top right, #e3f2fd, #ffffff)",
          py: 8,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Container>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeIn}
              >
                <Typography
                  variant={isMobile ? "h4" : "h2"}
                  sx={{
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: "bold",
                    color: "#333",
                    mb: 2,
                  }}
                >
                  We Bring Your Appliances Back to Life
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  sx={{ mb: 2, maxWidth: "500px" }}
                >
                  Pavel&apos;s Appliance Repair offers fast, reliable, and affordable appliance repair services 
                  to homeowners throughout the Twin Cities. We specialize in repairing washers, dryers, 
                  refrigerators, dishwashers, ovens, and stoves.
                </Typography>

                {!isExpanded && (
                  <Typography
                    variant="subtitle2"
                    color="text.secondary"
                    sx={{ mb: 4, maxWidth: "500px" }}
                  >
                    Our team of certified technicians provides quick response times and effective solutions. 
                    <Button
                      variant="text"
                      color="primary"
                      onClick={() => setIsExpanded(true)}
                      sx={{ padding: 0, marginLeft: 1 }}
                    >
                      Read More
                    </Button>
                  </Typography>
                )}

                {isExpanded && (
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ mb: 4, maxWidth: "500px" }}
                  >
                    We understand the importance of trust when inviting a service professional into your home. 
                    That&apos;s why we offer transparent pricing, detailed explanations, and a satisfaction guarantee 
                    on all our work. Whether it&apos;s a leaky washer, a noisy fridge, or an oven that won&apos;t heat up, 
                    our goal is to provide lasting solutions that extend your appliance&apos;s lifespan and efficiency.
                  </Typography>
                )}

                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  sx={{
                    padding: "10px 20px",
                    borderRadius: "8px",
                    boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.1)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-3px)",
                      boxShadow: "0px 12px 20px rgba(0, 0, 0, 0.15)",
                    },
                  }}
                  onClick={() => setIsPopupOpen(true)}
                >
                  REQUEST SERVICE
                </Button>
              </motion.div>
            </Grid>

            <Grid item xs={12} md={6}>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeIn}
              >
                <Box sx={{ textAlign: "center" }}>
                  <Image
                    src="/img/hero.webp"
                    alt="Illustration of washing machine repair process"
                    width={500}
                    height={300}
                    priority
                    style={{
                      borderRadius: "16px",
                      maxWidth: "100%",
                      height: "auto",
                      boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}
