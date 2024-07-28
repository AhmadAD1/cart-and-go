import { Avatar, Box, Paper, Stack, Typography } from "@mui/material";
import { usePageState } from "@src/providers/pageStateProvider";

function OrderCustomer() {
  const {
    orders: { orderDetails },
  } = usePageState();
  return (
    <Paper sx={{ p: 2 }}>
      <Typography sx={{ fontSize: "1.2rem", mb: 2 }}>Customer Info</Typography>
      <Stack direction={"row"} spacing={2}>
        <Avatar />
        <Stack component={"div"}>
          <Typography sx={{ fontSize: 15, textTransform: "capitalize" }}>{orderDetails?.user?.fullName}</Typography>
          <Typography sx={{ fontSize: 10, textTransform: "capitalize", color: "#999" }}>
            {orderDetails?.user?.email}
          </Typography>
        </Stack>
      </Stack>
      <Stack component={"div"} direction={"row"} sx={{ mt: 2 }}>
        <Typography sx={{ fontSize: 12, textTransform: "capitalize", fontWeight: 600 }}> Country: </Typography>
        <Typography sx={{ ml: 1, fontSize: 12, textTransform: "capitalize" }}>{orderDetails?.user?.country}</Typography>
      </Stack>
      <Stack component={"div"} direction={"row"} sx={{ mt: 2 }}>
        <Typography sx={{ fontSize: 12, textTransform: "capitalize", fontWeight: 600 }}> City: </Typography>
        <Typography sx={{ ml: 1, fontSize: 12, textTransform: "capitalize" }}>{orderDetails?.user?.city}</Typography>
      </Stack>
    </Paper>
  );
}

export default OrderCustomer;
