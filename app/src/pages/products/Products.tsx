import React, { useEffect, useState } from "react";
import ProductsSearchBar from "./components/ProductsSearch";
import { API_URL } from "@src/constants";
import { usePageState } from "@src/providers/pageStateProvider";
import ProductsList from "@pages/home/components/ProductsList/ProductsList";
import { Grid, Stack } from "@mui/material";
import UniContainer from "@components/UniContainer/UniContainer";
import { useSearchParams } from "react-router-dom";

function Products() {
  const [searchParams] = useSearchParams();
  const categoryQry = searchParams.get("category");
  const [query, setQuery] = useState<{ name: string; page: number; priceRange: number[]; category: string }>({
    name: "",
    page: 0,
    priceRange: [0, 1000],
    category: categoryQry || "",
  });
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const { setPageStateProductsValue } = usePageState();

  const getProducts = async () => {
    const queryString = new URLSearchParams({
      ...query,
      priceFrom: query.priceRange[0].toString(),
      priceTo: query.priceRange[1].toString(),
    } as any).toString();

    try {
      const response = await fetch(`${API_URL}/products?${queryString}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setPageStateProductsValue("list", result);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
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
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    if (categoryQry) {
      setQuery((prevQuery) => ({
        ...prevQuery,
        category: categoryQry,
      }));
      setIsInitialLoad(false);
    } else {
      setIsInitialLoad(false);
    }
  }, [categoryQry]);

  useEffect(() => {
    if (!isInitialLoad) {
      getProducts();
      getCategories();
    }
  }, [query, isInitialLoad]);

  return (
    <UniContainer>
      <Grid container>
        <Grid item xs={12} md={3}>
          <ProductsSearchBar onSearch={getProducts} query={query} setQuery={setQuery} />
        </Grid>
        <Grid item xs={12} md={9}>
          <Stack mt={5}>
            <ProductsList />
          </Stack>
        </Grid>
      </Grid>
    </UniContainer>
  );
}

export default Products;
