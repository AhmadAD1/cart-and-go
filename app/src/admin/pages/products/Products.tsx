import React, { useEffect, useState } from "react";
import { Box, Button, Stack, Toolbar, Typography, useTheme } from "@mui/material";

import { MdAdd } from "react-icons/md";
import ProductSearchForm from "./searchForm/ProductSearchForm";

import { Link, useParams } from "react-router-dom";
import UniTable from "@admin/components/UniTable/UniTable";
import DeleteDialog from "@admin/components/DeleteDialog/DeleteDialog";
import { useApiProvider } from "@src/providers/apiProvider";
import { usePageState } from "@src/providers/pageStateProvider";

const Products = () => {
  const [data, setData] = useState({ products: [], count: 0 });
  const {
    setPageStateProductsValue,
    products: { list },
  } = usePageState();
  const [query, setQuery] = useState({ name: "", tags: "", categories: "", page: 0 });
  const [activeProductId, setActiveProductId] = useState(null);
  const [open, setOpen] = useState(false);
  const { get } = useApiProvider();

  const headers = [
    { id: "_id", label: "view" },
    { id: "name", label: "Name" },
    { id: "price", label: "Price" },
  ];

  const findProducts = async () => {
    const result = await get("GET", "products", { ...query });
    if (result) {
      setPageStateProductsValue("list", result);
      setData(result);
    }
  };
  const onDeleteClick = (e, id) => {
    setActiveProductId(id);
    setOpen(true);
  };
  const onYesClick = async (e) => {
    setOpen(false);
    if (activeProductId) {
      const result = await get("DELETE", `products/${activeProductId}`);
      if (result) {
        setQuery((prev) => ({ page: 0, ...prev }));
      }
    }
  };
  useEffect(() => {
    findProducts();
  }, [query]);
  return (
    <Box component={"div"}>
      <Toolbar>
        <Typography variant="h6" color={"primary"}>
          Products
        </Typography>
        <Button
          variant="contained"
          color={"primary"}
          endIcon={<MdAdd />}
          sx={{ ml: "auto" }}
          LinkComponent={Link}
          to={`/super-dashboard/products/new`}>
          New Products
        </Button>
      </Toolbar>
      <ProductSearchForm onSubmit={(values) => setQuery((prev) => ({ page: 0, ...values }))} />
      <UniTable
        rows={list?.products || []}
        count={list?.count}
        columns={headers}
        page={query.page}
        onPageChange={(e, p) => setQuery((prev) => ({ ...prev, page: p }))}
        onDeleteClick={onDeleteClick}
        detailsLink="/super-dashboard/products"
      />
      <DeleteDialog open={open} setOpen={setOpen} onYesClick={onYesClick} />
    </Box>
  );
};

export default Products;
