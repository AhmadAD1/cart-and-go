import React from "react";
import { Box, Typography, Button, Grid } from "@mui/material";
import { FaRocket, FaBullhorn, FaStar } from "react-icons/fa";
import { red } from "@mui/material/colors";
import { darkTheme, lightTheme } from "@src/theme/theme";
import { usePageState } from "@src/providers/pageStateProvider";

const BlockSecOne = () => {
  const { mode } = usePageState();
  return (
    <Box sx={{ padding: "4rem 2rem" }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              textAlign: "center",
              padding: "2rem",
              backgroundColor:
                mode === "light" ? lightTheme.palette.background.default : darkTheme.palette.background.default,
              color: mode === "dark" ? lightTheme.palette.background.default : darkTheme.palette.background.default,
              borderRadius: "8px",
            }}>
            <FaRocket size={48} style={{ color: red[800] }} />
            <Typography variant="h6" sx={{ marginTop: "1rem", fontWeight: "bold" }}>
              Fast Delivery
            </Typography>
            <Typography variant="body1" sx={{ marginTop: "0.5rem", color: "#666" }}>
              Experience the fastest delivery with our state-of-the-art logistics.
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              textAlign: "center",
              padding: "2rem",
              backgroundColor:
                mode === "light" ? lightTheme.palette.background.default : darkTheme.palette.background.default,
              color: mode === "dark" ? lightTheme.palette.background.default : darkTheme.palette.background.default,
              borderRadius: "8px",
            }}>
            <FaBullhorn size={48} style={{ color: red[800] }} />
            <Typography variant="h6" sx={{ marginTop: "1rem", fontWeight: "bold" }}>
              Latest News
            </Typography>
            <Typography variant="body1" sx={{ marginTop: "0.5rem", color: "#666" }}>
              Stay updated with the latest trends and offers in electronics.
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              textAlign: "center",
              padding: "2rem",
              backgroundColor:
                mode === "light" ? lightTheme.palette.background.default : darkTheme.palette.background.default,
              color: mode === "dark" ? lightTheme.palette.background.default : darkTheme.palette.background.default,
              borderRadius: "8px",
            }}>
            <FaStar size={48} style={{ color: red[800] }} />
            <Typography variant="h6" sx={{ marginTop: "1rem", fontWeight: "bold" }}>
              Top Quality
            </Typography>
            <Typography variant="body1" sx={{ marginTop: "0.5rem", color: "#666" }}>
              We provide only the best quality products to our customers.
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default BlockSecOne;
