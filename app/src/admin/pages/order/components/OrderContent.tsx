import { Grid } from "@mui/material";
import React, { Dispatch, SetStateAction } from "react";
import OrderItems from "./OrderItems";
import OrderCustomer from "./OrderCustomer";
import OrderStatus from "./OrderStatus";
import { useApiProvider } from "@src/providers/apiProvider";
import { usePageState } from "@src/providers/pageStateProvider";
import { useParams } from "react-router-dom";

function OrderContent({ status, setStatus }: { status: string; setStatus: Dispatch<SetStateAction<string>> }) {
  const { get } = useApiProvider();
  const { id } = useParams();
  const {
    setGeneralError,
    orders: { orderDetails },
  } = usePageState();
  const onSave = async () => {
    const result = await get("PATCH", `orders/${id}`, null, {status});
    if (result) {
      setGeneralError({ open: true, msg: "Order updated successfully" });
    }
  };

  const handleChange = (event: any) => {
    setStatus(event.target.value);
  };
  return (
    <Grid container sx={{ pt: 2 }} spacing={2}>
      <Grid item xs={12} md={8}>
        <OrderItems />
      </Grid>
      <Grid item xs={12} md={4}>
        <OrderCustomer />
        <OrderStatus handleChange={handleChange} value={status} onSave={onSave} />
      </Grid>
    </Grid>
  );
}

export default OrderContent;
