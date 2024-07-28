import { Outlet } from "react-router-dom";
import { Box, Grid, IconButton, Stack, useMediaQuery } from "@mui/material";
import "./Layout.scss";
import { useState } from "react";
import Sidebar from "./Sidebar/Sidebar";
import { RiMenu4Line } from "react-icons/ri";
import UniSnackbar from "@components/UniSnackBar/UniSnackBar";
import { usePageState } from "@src/providers/pageStateProvider";
import ErrorSnackBar from "@components/Layout/ErrorSnackbar";
import LoadingProgress from "@components/Layout/LoadingProgress";
import { darkTheme, lightTheme } from "@src/theme/theme";

function AdminLayout() {
  const {
    alert: { open, type, msg },
    setGeneralError,
    mode,
  } = usePageState();
  const isLargeScreen = useMediaQuery("(min-width: 992px)");
  const [show, setShow] = useState(false);
  return (
    <div className="app">
      <main
        className="app-main"
        style={{
          backgroundColor:
            mode === "light" ? lightTheme.palette.background.default : darkTheme.palette.background.default,
          color: mode === "dark" ? lightTheme.palette.background.default : darkTheme.palette.background.default,
        }}>
        <Grid container>
          <Grid
            sx={{
              flex: 1,
              width: isLargeScreen ? "80%" : "100%",
              height: "100%",
            }}>
            <Stack
              sx={{
                backgroundColor:
                  mode === "light" ? lightTheme.palette.background.default : darkTheme.palette.background.default,
                color: mode === "dark" ? lightTheme.palette.background.default : darkTheme.palette.background.default,
                width: "100%",
              }}>
              {/* <Box component={"div"}> */}
              <Sidebar show={show} setShow={setShow} />
              {!isLargeScreen && (
                <IconButton onClick={() => setShow(!show)} sx={{ width: "fit-content" }}>
                  <RiMenu4Line />
                </IconButton>
              )}
              {/* </Box> */}
              <Box
                sx={{
                  flex: 1,
                  width: {
                    xs: "100%",
                    md: "auto",
                  },
                  marginLeft: {
                    md: "18%",
                    xs: 0,
                  },
                }}>
                <Outlet />
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
}

export default AdminLayout;
