import NoDataMsg from "@components/NoDataMsg/NoDataMsg";
import { Grid } from "@mui/material";
import { usePageState } from "@src/providers/pageStateProvider";
import Product from "./Product";
import SectionTitle from "@components/SectionTitle/SectionTitle";

function ProductsList() {
  const {
    products: { list },
  } = usePageState();
  console.log({list})
  return (
    <>
      <Grid container>
        {list?.products && list?.products?.length > 0 ? (
          list?.products?.map((item) => <Product key={item._id} item={item} />)
        ) : (
          <NoDataMsg msg={"No Products Yet"} />
        )}
      </Grid>
    </>
  );
}

export default ProductsList;
