import { Stack, Toolbar, Typography } from "@mui/material";
import { useApiProvider } from "@src/providers/apiProvider";
import { usePageState } from "@src/providers/pageStateProvider";
import dayjs from "dayjs";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import OrderForm from "./components/OrderContent";
import Flex from "@components/Flex/Flex";
import { amber, blue, green, grey, lime, red } from "@mui/material/colors";

function Order() {
  const { id } = useParams();
  const { get } = useApiProvider();
  const [value, setValue] = React.useState<string>("");

  const {
    setPageStateOrdersValue,
    orders: { orderDetails: order },
  } = usePageState();
  const getOrder = async () => {
    const result = await get("GET", `orders/${id}`);
    setValue(result.status);
    if (result) {
      setPageStateOrdersValue("orderDetails", result);
    }
  };
  useEffect(() => {
    getOrder();
  }, []);

  return (
    <>
      <Toolbar>
        <Stack component={"div"}>
          <Typography variant="h6" color="text.secondary">
            #{(order?._id && order._id) || ""}
          </Typography>
          <Flex jc="flex-start" gap={2}>
            <Typography sx={{ fontSize: 12 }} color="text.secondary">
              {dayjs(order?.createdAt).format("DD MMM YYYY")}
            </Typography>
            <Typography
              sx={{
                fontSize: 10,
                px: 1,
                py: 0.3,
                borderRadius: 10,
                textTransform: "capitalize",
                ...(order?.status === "pending" && {
                  backgroundColor: amber[600],
                  color: "common.white",
                }),
                ...(order?.status === "processing" && {
                  backgroundColor: blue[600],
                  color: "common.white",
                }),
                ...(order?.status === "shipped" && {
                  backgroundColor: green[600],
                  color: "common.white",
                }),
                ...(order?.status === "delivered" && {
                  backgroundColor: lime[600],
                  color: "common.white",
                }),
                ...(order?.status === "cancelled" && {
                  backgroundColor: red[600],
                  color: "common.white",
                }),
              }}>
              {order?.status}
            </Typography>
          </Flex>
        </Stack>
      </Toolbar>
      <OrderForm status={value} setStatus={setValue} />
    </>
  );
}

export default Order;
