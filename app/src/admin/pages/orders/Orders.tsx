import React, { useEffect, useState } from "react";
import { Box, Button, Stack, Toolbar, Typography, useTheme } from "@mui/material";
import OrderSearchForm from "./searchForm/OrderSearchForm";
import UniTable from "@admin/components/UniTable/UniTable";
import DeleteDialog from "@admin/components/DeleteDialog/DeleteDialog";
import { useApiProvider } from "@src/providers/apiProvider";
import { usePageState } from "@src/providers/pageStateProvider";

const Orders = () => {
  const {
    setPageStateOrdersValue,
    orders: { list },
  } = usePageState();
  const [query, setQuery] = useState({ id: "", page: 0 });
  const [activeOrderId, setActiveOrderId] = useState(null);
  const [open, setOpen] = useState(false);
  const { get } = useApiProvider();

  const headers = [
    { id: "_id", label: "ID" },
    { id: "user.username", label: "User" },
    { id: "price", label: "Price" },
    { id: "status", label: "Status" },
    { id: "createdAt", label: "Date" },
  ];

  const findOrders = async () => {
    const result = await get("GET", "orders", { ...query });
    if (result) {
      setPageStateOrdersValue("list", result);
    }
  };
  const onDeleteClick = (e, id) => {
    setActiveOrderId(id);
    setOpen(true); 
  };
  const onYesClick = async (e) => {
    setOpen(false);
    if (activeOrderId) {
      const result = await get("DELETE", `orders/${activeOrderId}`);
      if (result) {
        setQuery((prev) => ({ page: 0, ...prev }));
      }
    }
  };
  useEffect(() => {
    findOrders();
  }, [query]);
  return (
    <Box component={"div"}>
      <Toolbar>
        <Typography variant="h6" color={"primary"}>
          Orders
        </Typography>
      </Toolbar>
      <OrderSearchForm onSubmit={(values) => setQuery((prev) => ({ page: 0, ...values }))} />
      <UniTable
        rows={list?.orders || []}
        count={list?.count || 0}
        columns={headers}
        page={query.page}
        onPageChange={(e, p) => setQuery((prev) => ({ ...prev, page: p }))}
        onDeleteClick={onDeleteClick}
        detailsLink="/super-dashboard/orders"
      />
      <DeleteDialog open={open} setOpen={setOpen} onYesClick={onYesClick} />
    </Box>
  );
};

export default Orders;
