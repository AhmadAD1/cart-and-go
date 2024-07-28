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
  Grid,
} from "@mui/material";
import { MdAdd, MdCameraAlt, MdLocalOffer, MdSave } from "react-icons/md";
import { useApiProvider } from "@src/providers/apiProvider";
import { UPLOADS_URL } from "@src/constants";
import UniSelect from "@components/UniSelect/UniSelect";
import { usePageState } from "@src/providers/pageStateProvider";

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

interface Product {
  name?: string;
  category?: { _id: string; name: string; image: string };
  description?: string;
  image?: string;
  price?: number;
}

interface ProductFormProps {
  product?: Product;
  onSubmit?: (formData: FormData) => void;
  submitImage?: (image: File) => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ product = {}, onSubmit = () => {}, submitImage = () => {} }) => {
  const ref = useRef<HTMLButtonElement | null>(null);
  const theme = useTheme();
  const { get } = useApiProvider();
  const {
    products: { categories },
    setGeneralError,
  } = usePageState();
  const [image, setImage] = useState<File | null>(null);

  const validationSchema = yup.object().shape({
    name: yup.string().required("Product name is required"),
    price: yup.number().required("Product price is required"),
    description: yup.string().required("Product description is required"),
    category: yup.string().required("Product category is required"),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: product?.name || "",
      category: product?.category?._id || null,
      description: product?.description || "",
      photo: product?.image ? `${UPLOADS_URL}/${product?.image}` : null,
      price: product?.price || null,
    },
    validationSchema,
    onSubmit: (values) => {
      const body = new FormData();
      body.append("name", values.name);
      body.append("category", values.category);
      body.append("description", values.description);
      body.append("price", values.price);
      if (image) {
        body.append("image", image);
      }
      onSubmit(body);
    },
  });

  const [deleteDialog, setDeleteDialog] = useState(false);
  const [activePlan, setActivePlan] = useState(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const categoriesOptions = categories?.map((item: { _id: string; name: string; image: string }) => ({
    value: item._id,
    text: item.name,
    image: item.image,
  }));

  const onConfirmDeleteClick = () => {
    if (activePlan) {
      setActivePlan(null);
      setActiveIndex(null);
    }
    setDeleteDialog(false);
  };

  const onImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      const maxSizeInKB = 512;
      const maxSizeInBytes = maxSizeInKB * 1024;

      if (!file.type.startsWith("image/")) {
        setGeneralError({
          open: true,
          msg: "The selected file is not an image. Please select an image file.",
          type: "error",
        });
      } else if (file.size > maxSizeInBytes) {
        setGeneralError({
          open: true,
          msg: "The selected file is too large. Please select a file smaller than 512KB.",
          type: "error",
        });
      } else {
        setImage(file);
      }
    }
  };

  return (
    <Paper
      elevation={0}
      component="form"
      onSubmit={formik.handleSubmit as (e: FormEvent<HTMLFormElement>) => void}
      sx={{ p: 2, display: "flex", flexFlow: "column", gap: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}
          sx={{
            position: "relative",
            border: `1px solid ${theme.palette.action.focus}`,
            borderRadius: theme.shape.borderRadius,
            p: 1,
          }}>
          <img
            src={
              image ? URL.createObjectURL(image) : formik.values?.photo ? `${formik.values.photo}` : "/emptyImage.webp"
            }
            style={{ width: "100%", height: "300px", objectFit: "contain", objectPosition: "center" }}
            alt="Product"
          />
          <IconButton component="label" sx={{ position: "absolute", top: 10, right: 10, fontSize: 32 }}>
            <MdCameraAlt />
            <Input
              type="file"
              sx={{ position: "absolute", width: 0, height: 0, left: 0, top: 0, overflow: "hidden" }}
              onChange={onImageChange}
            />
          </IconButton>
        </Grid>
        <Grid item xs={12} md={8} sx={{ display: "flex", flexFlow: "column nowrap", gap: 2, flexGrow: 1 }}>
          <TextField
            required
            fullWidth
            size="small"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            label="Name"
            InputLabelProps={{ shrink: true }}
            error={!!formik.errors.name}
            helperText={formik.errors.name}
          />
          <TextField
            fullWidth
            size="small"
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            label="Description"
            InputLabelProps={{ shrink: true }}
            multiline
            rows={5}
          />
          <TextField
            required
            fullWidth
            type="number"
            size="small"
            name="price"
            value={formik.values.price}
            onChange={formik.handleChange}
            label="Price"
            InputLabelProps={{ shrink: true }}
            error={!!formik.errors.price}
            helperText={formik.errors.price}
          />
          <UniSelect
            name="category"
            value={formik.values.category}
            items={categoriesOptions}
            selectTitle="Category"
            handleChange={formik.handleChange}
            img={true}
            cstStyle={{ flex: 1, mt: 2 }}
            error={formik.errors.category}
          />
        </Grid>
      </Grid>
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

export default ProductForm;
