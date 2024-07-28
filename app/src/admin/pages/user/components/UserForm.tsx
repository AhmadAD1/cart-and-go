import React, { useEffect, useRef, useState, ChangeEvent, FormEvent } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  useTheme,
  Paper,
  Stack,
  Box,
  TextField,
  Autocomplete,
  Chip,
  Divider,
  IconButton,
  MenuItem,
  Toolbar,
  Typography,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  Input,
  ListItem,
} from "@mui/material";
import { MdAdd, MdCameraAlt, MdLocalOffer, MdSave } from "react-icons/md";
import { useApiProvider } from "@src/providers/apiProvider";
import { UPLOADS_URL } from "@src/constants";
import UniSelect from "@components/UniSelect/UniSelect";
import { usePageState } from "@src/providers/pageStateProvider";
import { User } from "@src/constants/UserTypes";

interface DeleteDialogProps {
  open: boolean;
  onClose: () => void;
  onClickOk: () => void;
}

const DeleteDialog: React.FC<DeleteDialogProps> = ({ open, onClose, onClickOk }) => {
  return (
    <Dialog open={open}>
      <DialogContent>
        <DialogContentText>Are you sure you want to delete this plan?</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" color="primary" onClick={onClose}>
          No
        </Button>
        <Button variant="contained" color="error" onClick={onClickOk}>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

interface UserFormProps {
  user?: User | null;
  onSubmit?: (formData: FormData) => void;
  submitImage?: (image: File) => void;
}

const UserForm: React.FC<UserFormProps> = ({ user = null, onSubmit = () => {}, submitImage = () => {} }) => {
  const ref = useRef<HTMLButtonElement | null>(null);

  const validationSchema = yup.object().shape({
    email: yup.string().required("User email is required"),
    fullName: yup.string().required("User fullName is required"),
    username: yup.string().required("User username is required"),
    role: yup.string().required("User role is required"),
    country: yup.string().required("User country is required"),
    city: yup.string().required("User city is required"),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: user?.email || "",
      fullName: user?.fullName || null,
      username: user?.username || "",
      role: user?.role || null,
      country: user?.country || null,
      city: user?.city || null,
    },
    validationSchema,
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  const [deleteDialog, setDeleteDialog] = useState(false);
  const [activePlan, setActivePlan] = useState(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const onConfirmDeleteClick = () => {
    if (activePlan) {
      setActivePlan(null);
      setActiveIndex(null);
    }
    setDeleteDialog(false);
  };
  return (
    <Paper
      elevation={0}
      component="form"
      onSubmit={formik.handleSubmit as (e: FormEvent<HTMLFormElement>) => void}
      sx={{ p: 2, display: "flex", flexFlow: "column", gap: 2 }}>
      <Stack direction="row" spacing={2}>
        <Box sx={{ display: "flex", flexFlow: "column nowrap", gap: 2, flexGrow: 1 }}>
          <TextField
            required
            fullWidth
            size="small"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            label="Email"
            InputLabelProps={{ shrink: true }}
            error={!!formik.errors.email}
            helperText={formik.errors.email}
          />
          <TextField
            fullWidth
            size="small"
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            label="Username"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            required
            fullWidth
            size="small"
            name="fullName"
            value={formik.values.fullName}
            onChange={formik.handleChange}
            label="FullName"
            InputLabelProps={{ shrink: true }}
            error={!!formik.errors.fullName}
            helperText={formik.errors.fullName}
          />
          <TextField
            select
            name="role"
            label="Role"
            value={formik.values.role}
            onChange={formik.handleChange}
            size="small"
            fullWidth>
            {["superadmin", "user"].map((option, index) => (
              <MenuItem key={index} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <Stack direction={"row"} spacing={2}>
            <TextField
              required
              fullWidth
              size="small"
              name="country"
              value={formik.values.country}
              onChange={formik.handleChange}
              label="Country"
              InputLabelProps={{ shrink: true }}
              error={!!formik.errors.country}
              helperText={formik.errors.country}
            />
            <TextField
              required
              fullWidth
              size="small"
              name="city"
              value={formik.values.city}
              onChange={formik.handleChange}
              label="City"
              InputLabelProps={{ shrink: true }}
              error={!!formik.errors.city}
              helperText={formik.errors.city}
            />
          </Stack>
        </Box>
      </Stack>
      <Divider />
      <Button ref={ref} variant="contained" type="submit" endIcon={<MdSave />}>
        Save
      </Button>
      <DeleteDialog
        open={deleteDialog}
        onClose={() => {
          setActiveIndex(null);
          setActivePlan(null);
          setDeleteDialog(false);
        }}
        onClickOk={onConfirmDeleteClick}
      />
    </Paper>
  );
};

export default UserForm;
