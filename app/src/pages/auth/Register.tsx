import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { TextField, Button, Box, Paper, Typography, Alert, Backdrop, CircularProgress, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import { useAuthProvider } from "@src/providers/authProvider";

interface PasswordValidation {
  text: string;
  achieved: boolean;
}

interface FormValues {
  email: string;
  username: string;
  fullName: string;
  country: string;
  city: string;
  password: string;
  confirmPassword: string;
}

const Register: React.FC = () => {
  const { register, error, isLoading, user } = useAuthProvider();
  const [passwordValidations, setPasswordValidations] = useState<PasswordValidation[]>([
    { text: "At least one digit (0-9)", achieved: false },
    { text: "At least one lowercase letter (a-z)", achieved: false },
    { text: "At least one uppercase letter (A-Z)", achieved: false },
    { text: "At least one special character", achieved: false },
    { text: "Minimum length of 6 characters", achieved: false },
  ]);

  const formik = useFormik<FormValues>({
    initialValues: {
      email: "",
      username: "",
      fullName: "",
      country: "",
      city: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: yup.object({
      email: yup.string().required("Email is required").email("Invalid email address"),
      username: yup.string().required("Username is required"),
      fullName: yup.string().required("Full Name is required"),
      country: yup.string().required("Country is required"),
      city: yup.string().required("City is required"),
      password: yup
        .string()
        .required("Password is required")
        .matches(
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{6,}$/,
          "Password must include at least one digit, one lowercase letter, one uppercase letter, one special character, and be at least 6 characters long"
        ),
      confirmPassword: yup
        .string()
        .required("Confirm Password is required")
        .oneOf([yup.ref("password"), null], "Passwords do not match"),
    }),
    onSubmit: async (values) => {
      register(values);
    },
  });

  const validatePassword = (password: string) => {
    const validations: PasswordValidation[] = [
      { text: "At least one digit (0-9)", achieved: /^(?=.*\d)/.test(password) },
      { text: "At least one lowercase letter (a-z)", achieved: /^(?=.*[a-z])/.test(password) },
      { text: "At least one uppercase letter (A-Z)", achieved: /^(?=.*[A-Z])/.test(password) },
      { text: "At least one special character", achieved: /^(?=.*[\W_])/.test(password) },
      { text: "Minimum length of 6 characters", achieved: /^.{6,}$/.test(password) },
    ];

    setPasswordValidations(validations);
  };

  useEffect(() => {
    if (formik.values.password) {
      validatePassword(formik.values.password);
    }
  }, [formik.values.password]);

  return (
    <>
      <Paper elevation={1} sx={{ maxWidth: 500, marginInline: "auto", p: 2, mt: 2 }}>
        {error && <Alert severity="error">{error}</Alert>}
        <Backdrop open={isLoading} sx={{ zIndex: 1000 }}>
          <CircularProgress />
        </Backdrop>
        {/* Logo */}
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{ "& img": { height: 100, width: 300, objectFit: "contain", objectPosition: "center" } }}>
          <Link to="/">
            <img src="/logo.png" alt="Logo" />
          </Link>
        </Box>
        <Box component="form" onSubmit={formik.handleSubmit}>
          <Box display="flex" flexDirection="column" gap={2} p={2}>
            <TextField
              size="small"
              name="email"
              label="Email"
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={Boolean(formik.errors.email)}
              helperText={formik.errors.email}
            />
            <TextField
              size="small"
              name="username"
              label="Username"
              type="text"
              value={formik.values.username}
              onChange={formik.handleChange}
              error={Boolean(formik.errors.username)}
              helperText={formik.errors.username}
            />
            <TextField
              size="small"
              name="fullName"
              label="Full Name"
              type="text"
              value={formik.values.fullName}
              onChange={formik.handleChange}
              error={Boolean(formik.errors.fullName)}
              helperText={formik.errors.fullName}
            />
            <Stack direction="row" spacing={2}>
              <TextField
                size="small"
                name="country"
                label="Country"
                type="text"
                value={formik.values.country}
                onChange={formik.handleChange}
                error={Boolean(formik.errors.country)}
                helperText={formik.errors.country}
                sx={{ width: "100%" }}
              />
              <TextField
                size="small"
                name="city"
                label="City"
                type="text"
                value={formik.values.city}
                onChange={formik.handleChange}
                error={Boolean(formik.errors.city)}
                helperText={formik.errors.city}
                sx={{ width: "100%" }}
              />
            </Stack>
            <TextField
              size="small"
              name="password"
              label="Password"
              type="password"
              value={formik.values.password}
              onChange={(e) => {
                formik.handleChange(e);
                validatePassword(e.target.value);
              }}
              error={Boolean(formik.errors.password)}
              helperText={formik.errors.password}
            />
            <Stack spacing={1}>
              {passwordValidations.map((validation, index) => (
                <Typography
                  key={index}
                  sx={{
                    fontSize: 12,
                    color: validation.achieved ? "green" : "inherit",
                    fontWeight: validation.achieved ? 600 : 500,
                  }}>
                  {validation.text}
                </Typography>
              ))}
            </Stack>
            <TextField
              size="small"
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              error={Boolean(formik.errors.confirmPassword)}
              helperText={formik.errors.confirmPassword}
            />
          </Box>
          <Button type="submit" variant="outlined" color="primary" fullWidth sx={{ marginY: 2 }} disabled={isLoading}>
            Register
          </Button>
          <Typography variant="body2" align="center">
            Already have an account? <Link to="/login">Login</Link>
          </Typography>
        </Box>
      </Paper>
    </>
  );
};

export default Register;
