import Flex from "@components/Flex/Flex";
import NoDataMsg from "@components/NoDataMsg/NoDataMsg";
import { Button, Container, Grid, IconButton, Stack, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { STYLE, UPLOADS_URL } from "@src/constants";
import { useApiProvider } from "@src/providers/apiProvider";
import { usePageState } from "@src/providers/pageStateProvider";
import { IoIosAdd as AddIcon } from "react-icons/io";
import { IoBagCheckOutline, IoRemoveOutline as RemoveIcon } from "react-icons/io5";
import { MdDeleteOutline as DeleteIcon } from "react-icons/md";
import { Link } from "react-router-dom";

function Cart() {
  const { get } = useApiProvider();
  const {
    products: {
      cart: { count, products, totalPrice },
    },
    handleCount,
    deleteFromCart,
  } = usePageState();
  const createSession = async () => {
    const result = await get("POST", "orders/checkout-session", null, { orderItems: products });
    if (result.url) {
      window.location.href = result.url;
    }
  };
  return (
    <Container maxWidth={"lg"}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          {products.map((product) => (
            <Grid
              container
              key={product._id}
              alignItems="center"
              columnSpacing={2}
              sx={{
                transition: ".3s ease",
                py: 2,
                "&:hover": {
                  backgroundColor: "#9991",
                },
              }}>
              <Grid item xs={6} sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <img
                  src={`${UPLOADS_URL}/${product?.image}`}
                  alt="product-img"
                  style={{ width: 50, height: 50, objectFit: "contain" }}
                />
                <Link to={`/products/${product._id}`} style={{ color: grey[600] }}>
                  <Typography sx={{ fontSize: 12, fontWeight: 600 }}>{product.name}</Typography>
                </Link>
              </Grid>
              <Grid item xs={2}>
                <Typography sx={{ color: STYLE.primaryColor, fontWeight: 700 }}>${product.price}</Typography>
              </Grid>
              <Grid item xs={2} sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
                <IconButton onClick={() => handleCount(product._id, true)} size="small">
                  <AddIcon />
                </IconButton>
                <Typography>{product.count}</Typography>
                <IconButton onClick={() => handleCount(product._id, false)} size="small">
                  <RemoveIcon />
                </IconButton>
              </Grid>
              <Grid item xs={2}>
                <IconButton onClick={() => deleteFromCart(product._id)} size="small" color="error">
                  <DeleteIcon />
                </IconButton>
              </Grid>
            </Grid>
          ))}
          {products?.length <= 0 && <NoDataMsg msg="Cart is empty" />}
        </Grid>
        <Grid item xs={12} md={4}>
          <Stack sx={{ boxShadow: "0 0 5px 2px #ddd2", borderRadius: 5, p: 2 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Cart Summary
            </Typography>
            <Flex jc="space-between" style={{ mb: 2 }}>
              <Typography sx={{ fontWeight: 600, fontSize: 12 }}>Items: </Typography>
              <Typography sx={{ fontSize: 15 }}>{count}</Typography>
            </Flex>
            <Flex jc="space-between" style={{ mb: 2 }}>
              <Typography sx={{ fontWeight: 600, fontSize: 12 }}>Subtotal: </Typography>
              <Typography sx={{ fontSize: 15 }}>${totalPrice?.toFixed(2)}</Typography>
            </Flex>
            <Flex jc="space-between" style={{ mb: 2 }}>
              <Typography sx={{ fontWeight: 600, fontSize: 12 }}>Shipping: </Typography>
              <Typography sx={{ fontSize: 15 }}>2%</Typography>
            </Flex>
            <Flex jc="space-between" style={{ mb: 2, borderTop: "2px dashed", pt: 2 }}>
              <Typography sx={{ fontWeight: 600, fontSize: 12 }}>Total Price: </Typography>
              <Typography sx={{ fontSize: 15 }}> ${totalPrice - totalPrice * 0.02} </Typography>
            </Flex>
          </Stack>
          <Flex>
            <Button
              startIcon={<IoBagCheckOutline />}
              sx={{ mt: 2 }}
              onClick={createSession}
              disabled={products?.length <= 0}>
              Checkout
            </Button>
          </Flex>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Cart;
