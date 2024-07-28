import SectionTitle from "@components/SectionTitle/SectionTitle";
import { Stack } from "@mui/material";
import CategoriesList from "./CategoriesList";

function Categories() {
  return (
    <Stack my={10}>
      <SectionTitle title="Categories" />
      <CategoriesList />
    </Stack>
  );
}

export default Categories;
