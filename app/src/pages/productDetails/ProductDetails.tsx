import React, { useEffect, useState } from "react";
import { Grid, Typography, Button, Stack, Rating, Avatar, Tooltip, Box } from "@mui/material";
import { blue, grey } from "@mui/material/colors";
import { BiCartAdd } from "react-icons/bi";
import { CiSquareMinus, CiSquarePlus } from "react-icons/ci";
import { GiFallingStar } from "react-icons/gi";
import { useParams, useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import AddReviewDialog from "./components/AddReviewDialog";
import LoadingProgress from "@components/Layout/LoadingProgress";
import { useApiProvider } from "@src/providers/apiProvider";
import { usePageState } from "@src/providers/pageStateProvider";
import Flex from "@components/Flex/Flex";
import { STYLE, UPLOADS_URL } from "@src/constants";
import { Product } from "@src/constants/ProductTypes";
import UniContainer from "@components/UniContainer/UniContainer";
import NoDataMsg from "@components/NoDataMsg/NoDataMsg";
import { darkTheme, lightTheme } from "@src/theme/theme";

const NumberInput = styled.input`
  border: unset;
  outline: none;
  width: 50px;
  font-size: 20px;
  background-color: transparent;
  text-align: center;

  /* Chrome, Safari, Edge, Opera */
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  &[type="number"] {
    -moz-appearance: textfield;
  }
`;

interface ProductDetailsProps {}

const ProductDetails: React.FC<ProductDetailsProps> = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { get, isLoading } = useApiProvider();
  const [count, setCount] = useState<number>(1);
  const [openReview, setOpenReview] = useState<boolean>(false);
  const [comment, setComment] = useState<string>("");
  const [rating, setRating] = useState<number>(0);
  const {
    setPageStateProductsValue,
    addToCart,
    setGeneralError,
    products: { productDetails },
    mode,
  } = usePageState();

  useEffect(() => {
    getProduct();
  }, [id]);

  const getProduct = async () => {
    const result: Product | null = await get("GET", `products/${id}`, null, null, false);
    if (result) {
      setPageStateProductsValue("productDetails", result);
    } else {
      navigate("/notfound");
    }
  };

  const reviewProduct = async () => {
    const result = await get("POST", `products/${id}/addReview`, {}, { comment, rating });
    if (result) {
      getProduct();
      setGeneralError({ open: true, msg: result.message });
      setOpenReview(false);
    }
  };

  const handleAddToCart = () => {
    addToCart(productDetails, count);
  };

  const handleIncrement = () => {
    setCount((prevCount) => prevCount + 1);
  };

  const handleDecrement = () => {
    setCount((prevCount) => (prevCount > 1 ? prevCount - 1 : prevCount));
  };

  const reviewToggle = () => {
    setOpenReview((prev) => !prev);
  };

  const reviewSubmitHandler = () => {
    if (!comment || !rating) {
      setGeneralError({ open: true, msg: "Comment and rating are required", type: "error" });
    } else {
      reviewProduct();
    }
  };

  return !isLoading ? (
    <UniContainer>
      <Grid container spacing={6}>
        <Grid item xs={12} md={6} display={"flex"} justifyContent={"center"} alignItems={"center"}>
          <img
            src={`${UPLOADS_URL}/${productDetails?.image}`}
            alt="product-img"
            style={{ maxWidth: 500, width: "100%", height: 500, objectFit: "contain" }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography sx={{ fontSize: 12, pr: 6, color: STYLE.primaryColor, fontWeight: 700, mb: -1.5 }}>
            {productDetails?.category?.name}
          </Typography>
          <Typography sx={{ fontSize: "2.5rem", pr: 1, fontWeight: 50 }}> {productDetails?.name} </Typography>
          <Flex jc="flex-start" gap={1}>
            <Rating
              defaultValue={productDetails?.ratings || 0}
              precision={0.5}
              readOnly
              sx={{ color: STYLE.primaryColor }}
            />
            <Typography sx={{ fontSize: 12, pr: 6, fontWeight: 700 }}>
              ({productDetails?.numOfReviews} reviews)
            </Typography>
          </Flex>
          <Typography sx={{ mt: 2 }}> {productDetails?.description} </Typography>
          <Typography sx={{ fontSize: 30, pr: 6, color: STYLE.primaryColor, mt: 2 }}>
            ${productDetails?.price}
          </Typography>
          <Flex jc="flex-start" style={{ mt: 2, flexWrap: "wrap" }} gap={2}>
            <Stack
              component={"div"}
              direction={"row"}
              alignItems={"center"}
              spacing={1}
              sx={{ backgroundColor: grey[100], p: 1, borderRadius: 10 }}>
              <CiSquarePlus size={20} style={{ cursor: "pointer" }} onClick={handleIncrement} />
              <NumberInput
                type="number"
                min={1}
                value={count}
                onChange={(e) => setCount(parseInt(e.target.value, 10))}
              />
              <CiSquareMinus size={20} style={{ cursor: "pointer" }} onClick={handleDecrement} />
            </Stack>
            <Button color="secondary" variant="outlined" startIcon={<BiCartAdd />} onClick={handleAddToCart}>
              Add To Cart
            </Button>
            <Button color="error" startIcon={<GiFallingStar />} onClick={reviewToggle}>
              Review
            </Button>
          </Flex>
        </Grid>
      </Grid>

      <Box component={"div"} sx={{ mt: 4 }}>
        <Typography sx={{ fontSize: 20, mb: 2, fontWeight: 600 }}> Product Reviews </Typography>
        <Grid container spacing={5}>
          {productDetails?.reviews?.map((item) => (
            <Grid key={item._id} item component={"div"} xs={6} sm={4}>
              <Stack
                direction={"row"}
                spacing={2}
                sx={{
                  backgroundColor:
                    mode === "light" ? "#ddd5" : "#222",
                  color: mode === "dark" ? lightTheme.palette.background.default : darkTheme.palette.background.default,
                  p: 2,
                  borderRadius: 2,
                  transition: ".3s ease",
                  "&:hover": {
                    backgroundColor: "#eee",
                  },
                }}>
                <Avatar src={item.user?.photo} />
                <Flex dir="column" ai="flex-start">
                  <Typography sx={{ fontSize: 10, fontWeight: 600, color: blue[900] }}>
                    {item.user?.fullName}
                  </Typography>

                  <Tooltip title={item.comment} placement="top" disableHoverListener={item.comment?.length < 40}>
                    <Typography sx={{ fontSize: 12 }}>
                      {item.comment?.length > 40 ? `${item.comment.slice(0, 40)}...` : item.comment}
                    </Typography>
                  </Tooltip>
                  <Rating name="read-only" value={item.rating} readOnly sx={{ fontSize: 14 }} />
                </Flex>
              </Stack>
            </Grid>
          ))}
        </Grid>
        {productDetails && productDetails.reviews?.length <= 0 ? <NoDataMsg msg={"No Reviews Yet"} /> : null}
      </Box>
      <AddReviewDialog
        comment={comment}
        setComment={setComment}
        rating={rating}
        setRating={setRating}
        reviewSubmitHandler={reviewSubmitHandler}
        submitReviewToggle={reviewToggle}
        open={openReview}
      />
    </UniContainer>
  ) : (
    <LoadingProgress />
  );
};

export default ProductDetails;
