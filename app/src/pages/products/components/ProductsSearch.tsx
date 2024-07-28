import { IconButton, InputAdornment, Slider, Stack, TextField, Typography, Button, Box } from "@mui/material";
import { CiSearch } from "react-icons/ci";
import React, { memo, KeyboardEvent, ChangeEvent } from "react";
import { darkTheme, lightTheme } from "@src/theme/theme";
import { usePageState } from "@src/providers/pageStateProvider";
import { useSearchParams } from "react-router-dom";

interface ProductsSearchBarProps {
  onSearch: (query: { name: string; page: number; priceRange: number[]; category: string }) => void;
  query: { name: string; page: number; priceRange: number[]; category: string };
  setQuery: React.Dispatch<
    React.SetStateAction<{ name: string; page: number; priceRange: number[]; category: string }>
  >;
}

const ProductsSearchBar: React.FC<ProductsSearchBarProps> = ({ onSearch, query, setQuery }) => {
  const {
    mode,
    products: { categories },
  } = usePageState();

  const [searchParams, setSearchParams] = useSearchParams();

  const handleKeyPress = (event: KeyboardEvent<HTMLDivElement>): void => {
    if (event.key === "Enter") {
      event.preventDefault();
      onSearch(query);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setQuery((prev) => ({ ...prev, name: event.target.value }));
  };

  const handlePriceChange = (event: Event, newValue: number | number[]) => {
    setQuery((prev) => ({ ...prev, priceRange: newValue as number[] }));
  };

  const handleCategoryClick = (category: string) => {
    setQuery((prev) => ({ ...prev, category }));
    setSearchParams({ category });
    onSearch({ ...query, category });
  };

  const handleClearCategory = () => {
    setQuery((prev) => ({ ...prev, category: "" }));
    setSearchParams({});
    onSearch({ ...query, category: "" });
  };

  return (
    <Box sx={{position:"sticky",top:100}}>
      <Stack
        spacing={4}
        sx={{
          marginInline: "auto",
          zIndex: 999,
          backgroundColor: "#ddd2",
          padding: 2,
          borderRadius: 5,
        }}
        alignItems={"center"}>
        <TextField
          value={query.name}
          onChange={handleChange}
          placeholder="Write a product name"
          id="outlined-start-adornment"
          size="small"
          sx={{
            width: "100%",
            ".MuiInputBase-root": {
              backgroundColor:
                mode === "light" ? lightTheme.palette.background.default : darkTheme.palette.background.default,
              color: mode === "dark" ? lightTheme.palette.background.default : darkTheme.palette.background.default,
              borderRadius: 50,
              outline: "none",
              overflow: "hidden",
            },
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">
                <IconButton aria-label="search products" edge="end" onClick={() => onSearch(query)}>
                  <CiSearch />
                </IconButton>
              </InputAdornment>
            ),
          }}
          onKeyPress={handleKeyPress}
        />
        <Stack direction="row" spacing={2} alignItems="center">
          <Typography
            variant="subtitle2"
            sx={{ writingMode: "vertical-rl", textAlign: "center", transform: "rotate(180deg)" }}>
            Price Range
          </Typography>
          <Slider
            value={query.priceRange}
            min={0}
            max={1000}
            step={10}
            onChange={handlePriceChange}
            color="secondary"
            valueLabelDisplay="auto"
            valueLabelFormat={(value) => `$${value}`}
            orientation="vertical"
            marks={[
              { value: 0, label: "$0" },
              { value: 250, label: "$250" },
              { value: 500, label: "$500" },
              { value: 750, label: "$750" },
              { value: 1000, label: "$1000" },
            ]}
            sx={{ height: 300, marginRight: 2 }}
          />
          <Stack direction="column-reverse" justifyContent="space-between" sx={{ height: 370 }}>
            <Typography variant="caption" sx={{ fontWeight: 900 }}>
              From: ${query.priceRange[0]}
            </Typography>
            <Typography variant="caption" sx={{ fontWeight: 900 }}>
              To: ${query.priceRange[1]}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
      {/* Display Categories */}
      <Typography variant="subtitle2" sx={{ fontWeight: 900, fontSize: 12, mt: 2 }}>
        Categories
      </Typography>
      <Stack
        sx={{
          marginInline: "auto",
          zIndex: 999,
          backgroundColor: "#ddd2",
          padding: 2,
          borderRadius: 5,
        }}
        alignItems={"center"}
        direction={"row"}
        flexWrap={"wrap"}>
        {categories &&
          categories.map((category) => (
            <Button
              key={category._id}
              variant="text"
              size="small"
              onClick={() => handleCategoryClick(category._id)}
              sx={{
                borderRadius: 0,
                textTransform: "none",
                borderBottom: "1px solid",
                borderColor: query.category === category._id ? "#000" : "transparent",
              }}>
              {category.name}
            </Button>
          ))}
        {query.category && (
          <Button
            variant="text"
            color="error"
            size="small"
            onClick={handleClearCategory}
            sx={{
              textTransform: "none",
            }}>
            X Clear
          </Button>
        )}
      </Stack>
    </Box>
  );
};

export default memo(ProductsSearchBar);
