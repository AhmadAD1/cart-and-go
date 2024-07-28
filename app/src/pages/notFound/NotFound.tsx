import { Button, Typography } from "@mui/material";
import React from "react";

function NotFound() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#f5f5f5",
      }}>
      <img
        src="/404.png"
        alt="Not Found"
        style={{ width: 300, height: 300, marginBottom: 32 }}
      />
      <Typography variant="h4" gutterBottom>
        Oops! Page not found
      </Typography>
      <Typography variant="body1" color="textSecondary" gutterBottom>
        The page you're looking for doesn't exist or has been moved.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => (window.location.href = "/")}
        style={{ marginTop: 24 }}>
        Go to Home
      </Button>
    </div>
  );
}

export default NotFound;
