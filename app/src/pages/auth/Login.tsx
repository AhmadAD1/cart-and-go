import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { AuthContextType, useAuthProvider } from "../../providers/authProvider";
import { TextField, Button, Box, Paper, Alert, Backdrop, CircularProgress, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const { login, error, isLoading, user } = useAuthProvider() as AuthContextType;
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: yup.object({
      username: yup.string().required("Username is required"),
      password: yup.string().required("Password is required"),
    }),
    onSubmit: (values) => {
      login(values.username, values.password);
    },
  });

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <>
      <Paper elevation={1} sx={{ maxWidth: 500, marginInline: "auto", p: 2, mt: 2 }}>
        {error && <Alert severity="error">{error}</Alert>}
        <Backdrop open={isLoading} sx={{ zIndex: 1000 }}>
          <CircularProgress />
        </Backdrop>
        {/* Logo */}
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          sx={{ "& img": { height: 150, width: 300, objectFit: "contain", objectPosition: "center" }, my: 2 }}>
          <Link to="/">
            <img src="/logo.png" alt="Logo" />
          </Link>
        </Box>
        <Box display={"flex"} flexDirection={"column"} gap={1} p={2} component={"form"} onSubmit={formik.handleSubmit}>
          <TextField
            size="small"
            fullWidth
            required
            type="text"
            name="username"
            placeholder="Username"
            value={formik.values.username}
            onChange={formik.handleChange}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
            variant="outlined"
            sx={{ mb: 2 }}
          />
          <TextField
            size="small"
            fullWidth
            required
            type="password"
            name="password"
            placeholder="Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            variant="outlined"
            sx={{ mb: 2 }}
          />
          <Button variant="contained" color="primary" type="submit">
            Login
          </Button>
          <Typography variant="body2" align="center">
            Don't have an account? <Link to="/register">Register</Link>
          </Typography>
        </Box>
      </Paper>
    </>
  );
};

export default Login;
