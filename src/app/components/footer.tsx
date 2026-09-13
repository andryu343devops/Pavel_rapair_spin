"use client";

import React from "react";
import { Box, Typography, Link, Container, Grid } from "@mui/material";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#1976d2",
        color: "#ffffff",
        py: 6,
        pb: 0,
        borderTop: "1px solid #ddd",
        display: "flex",
        flexDirection: "column",
        minHeight: "250px",
      }}
    >
      <Container sx={{ flex: "1 1 auto" }}>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Typography
                variant="h5"
                sx={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: "bold",
                  mb: 2,
                }}
              >
                Contact Us
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                📞 Call Us:{" "}
                <Link
                  href="tel:+16129196205"
                  underline="none"
                  color="inherit"
                  sx={{
                    transition: "color 0.3s",
                    "&:hover": { color: "#90caf9" },
                  }}
                >
                  +1 612-919-62-05
                </Link>
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                ✉️ Email:{" "}
                <Link
                  href="mailto:PavelsApplianceRepair@gmail.com"
                  underline="none"
                  color="inherit"
                  sx={{
                    transition: "color 0.3s",
                    "&:hover": { color: "#90caf9" },
                  }}
                >
                  PavelsApplianceRepair@gmail.com
                </Link>
              </Typography>
              <Typography variant="body2" sx={{ color: "#e0e0e0" }}>
                🕒 Business Hours: <br />
                Monday–Friday: 8:00 AM – 8:00 PM <br />
                Saturday: 9:00 AM – 6:00 PM
              </Typography>
            </motion.div>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Typography
                variant="h5"
                sx={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: "bold",
                  mb: 2,
                }}
              >
                Quick Links
              </Typography>
              <Box>
                <Typography variant="body1">
                  <Link
                    href="/#services"
                    underline="none"
                    color="inherit"
                    sx={{
                      transition: "color 0.3s",
                      "&:hover": { color: "#90caf9" },
                    }}
                  >
                    Services
                  </Link>
                </Typography>

                <Typography variant="body1">
                  <Link
                    href="/testimonials"
                    underline="none"
                    color="inherit"
                    sx={{
                      transition: "color 0.3s",
                      "&:hover": { color: "#90caf9" },
                    }}
                  >
                    Testimonials
                  </Link>
                </Typography>

                <Typography variant="body1">
                  <Link
                    href="/profile"
                    underline="none"
                    color="inherit"
                    sx={{
                      transition: "color 0.3s",
                      "&:hover": { color: "#90caf9" },
                    }}
                  >
                    Schedule Repair
                  </Link>
                </Typography>

                <Typography variant="body1">
                  <Link
                    href="/blog"
                    underline="none"
                    color="inherit"
                    sx={{
                      transition: "color 0.3s",
                      "&:hover": { color: "#90caf9" },
                    }}
                  >
                    Blog
                  </Link>
                </Typography>
              </Box>
            </motion.div>
          </Grid>
        </Grid>
      </Container>

      <Box sx={{ textAlign: "center", mt: "auto", py: 2 }}>
        <Typography
          variant="body2"
          sx={{
            fontFamily: "'Poppins', sans-serif",
            color: "#e0e0e0",
          }}
        >
          © {new Date().getFullYear()} Pavel&apos;s Appliance Repair. All rights reserved.
        </Typography>

        <Typography
          variant="body2"
          sx={{
            fontFamily: "'Poppins', sans-serif",
            color: "#e0e0e0",
            mt: 0.5,
          }}
        >
          Website by{" "}
          <Link
            href="https://dev-mosaic.com/"
            underline="hover"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              color: "#e0e0e0",
              transition: "color 0.3s",
              "&:hover": { color: "#90caf9" },
            }}
          >
            Dev Mosaic
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
