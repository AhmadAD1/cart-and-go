import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Box, Typography } from "@mui/material";
import { usePageState } from "@src/providers/pageStateProvider";
import { STYLE, UPLOADS_URL } from "@src/constants";
import Flex from "@components/Flex/Flex";
import { Link } from "react-router-dom";

export default function CategoriesList() {
  const {
    products: { categories },
  } = usePageState();

  return (
    <Box sx={{ mt: 4 }}>
      <Swiper
        spaceBetween={30}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        modules={[Autoplay, Pagination, Navigation]}
        breakpoints={{
          640: {
            slidesPerView: 1,
          },

          768: {
            slidesPerView: 2,
          },

          1024: {
            slidesPerView: 4,
          },
        }}
        className="mySwiper">
        {categories?.map((item) => (
          <SwiperSlide key={item._id}>
            <Link to={`/products?category=${item._id}`} className="normal-link">
              <Flex
                gap={2}
                style={{
                  transition: ".3s ease",
                  "&:hover": {
                    ".cat-img": {
                      opacity: "1 !important",
                    },
                    ".cat-name": {
                      transform: "translateX(0)",
                    },
                  },
                }}>
                <img
                  src={`${UPLOADS_URL}/${item?.image}`}
                  alt="product-img"
                  className="cat-img"
                  style={{ width: 100, height: 100, objectFit: "contain", opacity: 0.3, transition: ".3s ease" }}
                />
                <Typography
                  className="cat-name"
                  sx={{
                    fontWeight: 700,
                    textAlign: "center",
                    mt: 2,
                    fontSize: {
                      md: 25,
                      xs: 18,
                    },
                    textTransform: "uppercase",
                    color: STYLE.primaryColor,
                    textShadow: "0 2px 1px #907600",
                    transition: ".3s ease",
                    transform: "translateX(-65%)",
                    "&:hover": {
                      textShadow: "0 2px 1px #110e00",
                    },
                  }}>
                  {item.name}
                </Typography>
              </Flex>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}
