import { Grid, ListItemButton, Typography } from "@mui/material";
import { red } from "@mui/material/colors";
import { UPLOADS_URL } from "@src/constants";
import { Link } from "react-router-dom";

function Product({ item }) {
  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <ListItemButton
        sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column  " }}
        LinkComponent={Link}
        to={`/products/${item._id}`}>
        <img
          src={`${UPLOADS_URL}/${item?.image}`}
          alt="product-img"
          style={{ width: 70, height: 100, objectFit: "contain" }}
        />
        <Typography sx={{ fontSize: 12, fontWeight: 700, color: "#999", mt: 2 }}> {item.category?.name} </Typography>
        <Typography sx={{ fontSize: 12, fontWeight: 700, px: 5, textAlign: "center", my: 2 }}> {item?.name} </Typography>
        <Typography sx={{ fontSize: "1.5rem", color: red[700] }}> ${item.price} </Typography>
      </ListItemButton>
    </Grid>
  );
}

export default Product;
