import React, { useEffect, useState } from "react";
import { Container, Button, Box, Typography } from "@mui/material";
import { usePageState } from "@src/providers/pageStateProvider";
import ProductsList from "@pages/home/components/ProductsList/ProductsList";
import Categories from "./components/Categories/Categories";
import Banner from "./components/Banner/Banner";
import BlockSecOne from "./components/BlockSecOne/BlockSecOne";
import BlockSecTwo from "./components/BlockSecTwo/BlockSecTwo";
import NewsletterSection from "./components/NewsLetterSec/NewsLetterSec";
import SectionTitle from "@components/SectionTitle/SectionTitle";
import Location from "./components/Location/Location";
import { API_URL } from "@src/constants";

function Home() {
  const [query, setQuery] = useState({ name: "", page: 0 });
  const { setPageStateProductsValue, mode, toggleThemeMode } = usePageState();

  const getProducts = async () => {
    try {
      const response = await fetch(`${API_URL}/products`, {
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
    getProducts();
    getCategories();
  }, [query]);

  return (
    <>
      <Container maxWidth="lg" sx={{height:"100%"}}>
        <Banner />
        <BlockSecOne />
        <>
          <SectionTitle title="Products" />
          <ProductsList />
        </>
        <Categories />
        <BlockSecTwo />
        <NewsletterSection />
      </Container>
      <Location />
    </>
  );
}

export default Home;
