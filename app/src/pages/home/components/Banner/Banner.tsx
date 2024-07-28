import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { styled } from "@mui/system";
import { red } from "@mui/material/colors";

const BannerContainer = styled(Box)({
  position: "relative",
  height: "400px",

  backgroundSize: "cover",
  backgroundPosition: "center",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  textAlign: "center",
});

const BannerContent = styled(Box)({
  position: "relative",
  zIndex: 2,

  padding: "20px",
  borderRadius: "10px",
});

const BannerOverlay = styled(Box)({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",

  zIndex: 1,
});

const Banner: React.FC = () => {
  return (
    <BannerContainer>
      <BannerOverlay />
      <BannerContent>
        <Typography
          sx={{
            backgroundColor: red[50],
            color: red[800],
            fontWeight: 900,
            fontSize: 12,
            width: "fit-content",
            px: 2,
            marginInline: "auto",
            borderRadius: 10,
          }}>
          Summer Sale is Here!
        </Typography>
        <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
          Limited Time Offer!
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          Hurry Up and Grab Your Favorite Gadgets at Discounted Prices
        </Typography>
        <Button
          variant="contained"
          component={Link}
          to="/products"
          sx={{
            mt: 2,
            backgroundColor: red[600],
            transition: ".3s ease",
            "&:hover": {
              backgroundColor: red[900],
            },
          }}>
          Shop Now
        </Button>
      </BannerContent>
    </BannerContainer>
  );
};

export default Banner;
