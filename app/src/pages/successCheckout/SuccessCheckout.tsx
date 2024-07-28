import React from "react";
import { Box, Container, Typography, Paper, Button, Grid } from "@mui/material";
import { FaCheckDouble } from "react-icons/fa";

const SuccessCheckoutPage = () => {
  
  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Paper elevation={1} sx={{ p: 4, textAlign: "center" }}>
        <FaCheckDouble style={{ fontSize: 60, color: "green" }} />
        <Typography variant="h4" gutterBottom>
          Thank you for your purchase!
        </Typography>
        <Typography variant="h6" color="textSecondary" gutterBottom>
          Your order has been successfully placed.
        </Typography>
        <Button variant="contained" color="primary" sx={{ mt: 4 }} href="/">
          Continue Shopping
        </Button>
      </Paper>
    </Container>
  );
};

export default SuccessCheckoutPage;
