import { Autocomplete, Button, Chip, FormControl, FormLabel, Paper, Stack, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { MdSearch } from "react-icons/md";

const UserSearchForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues: {
      searchText: "",
    },
    validationSchema: yup.object().shape({
      searchText: yup.string(),
    }),
    onSubmit: (values) => {
      const body = {
        id: values.searchText.trim(),
      };
      if (onSubmit) {
        onSubmit(body);
      }
    },
  });
  return (
    <Paper component={"form"} elevation={1} sx={{ p: 2, mb: 4 }} onSubmit={formik.handleSubmit}>
      <Stack direction={"row"} spacing={1} sx={{ mb: 2 }}>
        <TextField
          size="small"
          fullWidth
          name="searchText"
          value={formik.values.searchText}
          onChange={formik.handleChange}
          InputLabelProps={{ shrink: true }}
          label={"Order ID"}
        />
        <Button variant="outlined" type="submit" endIcon={<MdSearch />}>
          Search
        </Button>
      </Stack>
    </Paper>
  );
};

export default UserSearchForm;
