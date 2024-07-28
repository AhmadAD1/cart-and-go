import { Avatar, Box, Button, FormLabel, Grid, Paper, TextField, Typography } from "@mui/material";
import { useAuthProvider } from "@src/providers/authProvider";
import { useFormik } from "formik";
import { useEffect } from "react";
import * as yup from "yup";
import { updateVals } from "../Profile";

function ProfileForm({ isLoading, onSave }) {
  const { user: profile } = useAuthProvider();

  // ################## RTK #################

  // ################## Formik ##################
  const formik = useFormik({
    initialValues: {
      email: profile?.email || "",
      fullName: profile?.fullName || "",
      username: profile?.username || "",
      photo: profile?.photo ? profile.photo.url : "",
      file: "",
    },
    validationSchema: yup.object({
      email: yup.string(),
      fullName: yup.string(),
      username: yup.string(),
    }),
    onSubmit: async (values: updateVals) => {
      onSave({ fullName: values.fullName, email: values.email });
      //   const profileData = await updateProfile({
      //     data: formData,
      //     token,
      //   });
      //   dispatch(setProfile(profileData.data));
    },
  });


  return (
    <Paper sx={{ p: 3 }}>
      <Typography sx={{ fontSize: "2rem", textAlign: "center", mb: 2, fontWeight: 700 }}> Profile Settings</Typography>
      <Box component={"form"} sx={{ display: "flex", flexFlow: "column", gap: 2 }} onSubmit={formik.handleSubmit}>
        {/* User Info */}
        <Box component="div">
          <TextField
            name="email"
            label="Email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={Boolean(formik.errors.email)}
            helperText={formik.errors.email}
            sx={{ width: "100%" }}
            // disabled
          />
        </Box>
        <Box component="div">
          <TextField
            name="fullName"
            label="Full Name"
            type="fullName"
            value={formik.values.fullName}
            onChange={formik.handleChange}
            error={Boolean(formik.errors.fullName)}
            helperText={formik.errors.fullName}
            sx={{ width: "100%" }}
          />
        </Box>
        <Box component="div">
          <TextField
            name="username"
            label="Username"
            type="username"
            value={formik.values.username}
            // onChange={formik.handleChange}
            error={Boolean(formik.errors.username)}
            helperText={formik.errors.username}
            sx={{ width: "100%" }}
            disabled
          />
        </Box>
        <Button type="submit" variant="outlined" color="primary" fullWidth disabled={isLoading}>
          Update
        </Button>
      </Box>
    </Paper>
  );
}

export default ProfileForm;
