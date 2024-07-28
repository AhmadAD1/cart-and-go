import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Box, Grid, Stack, useMediaQuery } from "@mui/material";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";
import ErrorSnackBar from "./ErrorSnackbar";
import LoadingProgress from "./LoadingProgress";
import { usePageState } from "@src/providers/pageStateProvider";
import UniSnackbar from "@components/UniSnackBar/UniSnackBar";
import { darkTheme, lightTheme } from "@src/theme/theme";

interface LayoutProps {
  isA?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ isA }: { isA: boolean }) => {
  const isLargeScreen = useMediaQuery("(min-width: 992px)");
  const {
    alert: { msg, open, type },
    setGeneralError,
    mode,
  } = usePageState();

  return (
    <div className="app">
      <main className="app-main">
        <Grid container>
          <Grid
            sx={{
              flex: 1,
              width: isLargeScreen ? "80%" : "100%",
              height: "100%",
            }}>
            <Stack sx={{ color: "#3D434A" }}>
              <Navbar />
              <Box
                component={"div"}
                sx={{
                  py: 5,
                  minHeight: "91vh",
                  backgroundColor:
                    mode === "light" ? lightTheme.palette.background.default : darkTheme.palette.background.default,
                  color: mode === "dark" ? lightTheme.palette.background.default : darkTheme.palette.background.default,
                }}>
                <Outlet />
              </Box>
              <Box>
                {/* <Footer /> */}
                <Footer />
              </Box>
            </Stack>
          </Grid>
        </Grid>
        <ErrorSnackBar />
        <LoadingProgress />
        <UniSnackbar open={open} setOpen={() => setGeneralError({ open: false, msg, type })} type={type} text={msg} />
      </main>
    </div>
  );
};

export default Layout;
