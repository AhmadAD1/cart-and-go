import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import { AiOutlineSafetyCertificate, AiOutlineDollarCircle, AiOutlineCustomerService } from "react-icons/ai";
import { blue, red } from "@mui/material/colors";

const BlockSecTwo = () => {
  return (
    <Box sx={{ padding: "4rem 2rem",mt:10 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              textAlign: "center",
              padding: "2rem",
              borderRadius: "8px",
            }}>
            <AiOutlineSafetyCertificate size={48} style={{ color: red[800] }} />
            <Typography variant="h6" sx={{ marginTop: "1rem", fontWeight: "bold" }}>
              Certified Products
            </Typography>
            <Typography variant="body1" sx={{ marginTop: "0.5rem", color: "#666" }}>
              Ensuring safety with certified electronic devices.
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              textAlign: "center",
              padding: "2rem",
              borderRadius: "8px",
            }}>
            <AiOutlineDollarCircle size={48} style={{ color: red[800] }} />
            <Typography variant="h6" sx={{ marginTop: "1rem", fontWeight: "bold" }}>
              Competitive Pricing
            </Typography>
            <Typography variant="body1" sx={{ marginTop: "0.5rem", color: "#666" }}>
              Offering the best prices on high-quality electronics.
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              textAlign: "center",
              padding: "2rem",
              borderRadius: "8px",
            }}>
            <AiOutlineCustomerService size={48} style={{ color: red[800] }} />
            <Typography variant="h6" sx={{ marginTop: "1rem", fontWeight: "bold" }}>
              Excellent Support
            </Typography>
            <Typography variant="body1" sx={{ marginTop: "0.5rem", color: "#666" }}>
              Dedicated customer service for all your queries.
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default BlockSecTwo;
