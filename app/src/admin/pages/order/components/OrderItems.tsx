import Flex from "@components/Flex/Flex";
import { Box, Paper, Stack, Typography } from "@mui/material";
import { UPLOADS_URL } from "@src/constants";
import { usePageState } from "@src/providers/pageStateProvider";

function OrderItems() {
  const {
    orders: { orderDetails },
  } = usePageState();
  const head = ({ style, txt }: { style: any; txt: string }) => (
    <Typography sx={{ flex: 1, fontSize: 12, fontWeight: 600, ...style }}> {txt} </Typography>
  );
  return (
    <Paper sx={{ p: 2 }}>
      <Typography sx={{ fontSize: "1.2rem", mb: 2 }}>Checkout Summary</Typography>
      <Stack direction={"row"} sx={{ mb: 1, backgroundColor: "#ddd5", p: 2, borderRadius: 3 }}>
        {head({ style: { flex: 1 }, txt: "Image" })}
        {head({ style: { flex: 3 }, txt: "Name" })}
        {head({ style: { flex: 1 }, txt: "Qty" })}
        {head({ style: { flex: 1 }, txt: "Unit Price" })}
        {head({ style: { flex: 1 }, txt: "Amount" })}
      </Stack>
      <Stack sx={{ px: 2 }}>
        {orderDetails?.orderItems?.map((item) => (
          <Flex jc="flex-start" style={{ borderBottom: "1px solid #ddd8", py: 2 }}>
            <Box component={"div"} sx={{ flex: 1 }}>
              <img
                src={`${UPLOADS_URL}/${item.product?.image}`}
                style={{ width: 40, height: 40, objectFit: "contain", objectPosition: "center" }}
                alt="Product"
              />
            </Box>
            <Typography sx={{ fontSize: 15, flex: 3 }}> {item.product?.name} </Typography>
            <Typography sx={{ fontSize: 10, flex: 1 }}> X{item.quantity} </Typography>
            <Typography sx={{ fontSize: 15, flex: 1 }}> ${item?.price} </Typography>
            <Typography sx={{ fontSize: 15, flex: 1 }}> ${item.quantity * item.price} </Typography>
          </Flex>
        ))}
      </Stack>
      <Stack direction={"row"} sx={{ px: 2, py: 2 }}>
        <Typography sx={{ flex: 5 }} />
        <Typography sx={{ flex: 1, fontWeight: 600 }}>Total</Typography>
        <Typography sx={{ flex: 1 }}> ${orderDetails?.price} </Typography>
      </Stack>
    </Paper>
  );
}

export default OrderItems;
