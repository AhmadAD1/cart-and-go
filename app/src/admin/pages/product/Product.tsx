import React, { useEffect, useState } from "react";
import { Button, Toolbar, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useApiProvider } from "@src/providers/apiProvider";
import ProductForm from "./components/ProductForm";
import { API_URL } from "@src/constants";
import { usePageState } from "@src/providers/pageStateProvider";

const Product = (create: boolean) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { get, getMultiPartFormData } = useApiProvider();
  const {
    setPageStateProductsValue,
    alert: {},
    setGeneralError,
  } = usePageState();
  const [product, setProduct] = useState({});

  const getProduct = async () => {
    const result = await get("GET", `products/${id}`);
    if (!result) {
      // return navigate("/notfound");
    }
    setProduct(result);
  };
  const getCategories = async () => {
    try {
      const response = await fetch(`${API_URL}/category`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setPageStateProductsValue("categories", result);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  const onSave = async (body) => {
    const result = !id
      ? await getMultiPartFormData("POST", `products`, null, body)
      : await getMultiPartFormData("PATCH", `products/${id}`, null, body);
    if (result) {
      setGeneralError({ open: true, msg: `Product ${id ? "updated" : "created"} successfully` });
      id && getProduct();
    }
  };

  useEffect(() => {
    id && getProduct();
    getCategories();
  }, [id]);
  return (
    <>
      <Toolbar>
        <Typography variant="h6" color="text.secondary">
          {product?._id || ""}
        </Typography>
      </Toolbar>
      <ProductForm product={product} onSubmit={onSave} />
    </>
  );
};

export default Product;
