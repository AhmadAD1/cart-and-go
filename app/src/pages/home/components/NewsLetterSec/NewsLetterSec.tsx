import React, { useState } from "react";
import { Box, Typography, Grid, TextField, Button, Snackbar } from "@mui/material";
import { MdEmail } from "react-icons/md";
import { teal } from "@mui/material/colors";
import { darkTheme, lightTheme } from "@src/theme/theme";
import { usePageState } from "@src/providers/pageStateProvider";

const NewsletterSection = () => {
  const { mode } = usePageState();
  const [email, setEmail] = useState("");
  const [subscribeStatus, setSubscribeStatus] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleCloseSnackbar = () => {
    setSubscribeStatus({ ...subscribeStatus, open: false });
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubscribe = async () => {
    try {
      const response = await fetch("/api/users/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubscribeStatus({
          open: true,
          message: data.message || "Subscription successful",
          severity: "success",
        });
      } else {
        setSubscribeStatus({
          open: true,
          message: data.error || "Subscription failed",
          severity: "error",
        });
      }
    } catch (error) {
      console.error("Error subscribing:", error);
      setSubscribeStatus({
        open: true,
        message: "Something went wrong. Please try again later.",
        severity: "error",
      });
    }
  };

  return (
    <Box sx={{ padding: "4rem 2rem" }}>
      <Grid container justifyContent="center" alignItems="center" spacing={4}>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              backgroundColor:
                mode === "light" ? lightTheme.palette.background.default : darkTheme.palette.background.default,
              color: mode === "dark" ? lightTheme.palette.background.default : darkTheme.palette.background.default,
              padding: "2rem",
              borderRadius: "8px",
              boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
              textAlign: "center",
            }}>
            <MdEmail size={48} style={{ color: teal[700] }} />
            <Typography variant="h5" sx={{ marginTop: "1rem", fontWeight: "bold" }}>
              Subscribe to Our Newsletter
            </Typography>
            <Typography variant="body1" sx={{ marginTop: "0.5rem", color: "#666" }}>
              Get updates on the latest products, promotions, and news directly in your inbox.
            </Typography>
            <Box sx={{ marginTop: "2rem" }}>
              <TextField
                id="email"
                label="Your Email"
                variant="outlined"
                fullWidth
                size="small"
                value={email}
                onChange={handleEmailChange}
                sx={{ marginBottom: "1rem" }}
              />
              <Button variant="contained" color="primary" fullWidth onClick={handleSubscribe} disabled={!email.trim()}>
                Subscribe
              </Button>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              backgroundColor:
                    mode === "light" ? lightTheme.palette.background.default : darkTheme.palette.background.default,
                  color: mode === "dark" ? lightTheme.palette.background.default : darkTheme.palette.background.default,
              padding: "2rem",
              borderRadius: "8px",
              textAlign: "center",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Why Subscribe?
            </Typography>
            <Typography variant="body1" sx={{ marginTop: "1rem", color: "#666" }}>
              Join our newsletter for exclusive offers, early access to sales, and tips on using our products.
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <Snackbar
        open={subscribeStatus.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={subscribeStatus.message}
        color={subscribeStatus.severity === "success" ? "success" : "error"}
      />
    </Box>
  );
};

export default NewsletterSection;
