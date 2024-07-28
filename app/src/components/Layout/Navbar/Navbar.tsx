import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import { MdMenu } from "react-icons/md";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { userLinks } from "./links";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Badge, ListItemButton, ListItemText, Stack } from "@mui/material";
import { useAuthProvider } from "@src/providers/authProvider";
import { FaOpencart } from "react-icons/fa";
import { usePageState } from "@src/providers/pageStateProvider";
import Flex from "@components/Flex/Flex";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { purple } from "@mui/material/colors";
import { STYLE, UPLOADS_URL } from "@src/constants";
import { darkTheme, lightTheme } from "@src/theme/theme";

const settings = ["Profile", "Logout"];

function Navbar() {
  const navigate = useNavigate();
  const { logout, token, user } = useAuthProvider();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const {
    products: {
      cart: { products },
    },
    mode,
    toggleThemeMode,
  } = usePageState();
  const [fixed, setFixed] = useState(false);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (setting) => {
    setAnchorElUser(null);
    if (setting === "Logout") {
      logout();
      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");
    } else if (setting === "Profile") {
      navigate("/profile");
    }
  };

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setFixed(true);
    } else {
      setFixed(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <AppBar
      position={fixed ? "fixed" : "static"}
      sx={{
        backgroundColor:
          mode === "light" ? lightTheme.palette.background.default : darkTheme.palette.background.default,
        color: mode === "dark" ? lightTheme.palette.background.default : darkTheme.palette.background.default,
        boxShadow: fixed ? "0 2px 10px #0001" : "none",
        transition: "all 0.6s ease-in-out",
      }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
            <Typography
              variant="h6"
              noWrap
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontWeight: 700,
                color: "inherit",
                textDecoration: "none",
              }}>
              <img src="./logo.png" style={{ width: 30 }} />
              Cart & Go
            </Typography>
          </Link>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit">
              <MdMenu />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}>
              {userLinks.map((page) => {
                if (!user && page.name === "Cart") {
                  return null;
                } else {
                  return (
                    <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                      <Link to={page.link} style={{ color: "inherit", textDecoration: "none" }}>
                        {page.name}
                      </Link>
                    </MenuItem>
                  );
                }
              })}
              {!token && (
                <>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Link to="/login" style={{ color: "inherit", textDecoration: "none" }}>
                      Login
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Link to="/register" style={{ color: "inherit", textDecoration: "none" }}>
                      Register
                    </Link>
                  </MenuItem>
                </>
              )}
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 4,
              display: { xs: "flex", md: "none" },
              fontWeight: 700,
              color: "inherit",
              textDecoration: "none",
            }}>
            <img src="./logo.png" style={{ width: 30 }} />
            Cart & Go
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Stack component={"div"} direction={"row"}>
              {userLinks.map((page) => {
                if (!user && page.name === "Cart") {
                  return null;
                } else {
                  return (
                    <ListItemButton key={page.name} onClick={handleCloseNavMenu} LinkComponent={Link} to={page.link}>
                      <ListItemText sx={{ color: "inherit", textAlign: "center" }}>{page.name}</ListItemText>
                    </ListItemButton>
                  );
                }
              })}
              {!token && (
                <>
                  <ListItemButton
                    onClick={handleCloseNavMenu}
                    LinkComponent={Link}
                    to={"/login"}
                    sx={{
                      ml: 2,
                      backgroundColor: purple[900],
                      borderRadius: 2,
                      color: "#fff",
                      transition: "all 0.3s ease-in-out",
                      "&:hover": { backgroundColor: purple[800], opacity: 0.9 },
                    }}>
                    <ListItemText sx={{ color: "inherit", textAlign: "center" }}>Login</ListItemText>
                  </ListItemButton>
                  <ListItemButton
                    onClick={handleCloseNavMenu}
                    LinkComponent={Link}
                    to={"/register"}
                    sx={{
                      ml: 2,
                      backgroundColor: STYLE.primaryColor,
                      borderRadius: 2,
                      color: "#fff",
                      transition: "all 0.3s ease-in-out",
                      "&:hover": { backgroundColor: STYLE.primaryColor, opacity: 0.9 },
                    }}>
                    <ListItemText sx={{ color: "inherit", textAlign: "center" }}>Register</ListItemText>
                  </ListItemButton>
                </>
              )}
            </Stack>
          </Box>

          <Box sx={{ flexGrow: 0, display: "flex", alignItems: "center" }}>
            {token && (
              <Flex gap={1}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="Remy Sharp" src={`${UPLOADS_URL}/${user?.photo}`} sx={{ width: 35, height: 35 }} />
                  </IconButton>
                </Tooltip>
                <Typography sx={{ fontSize: 12 }}>
                  Hi, <strong>{user?.fullName}</strong>
                </Typography>
              </Flex>
            )}

            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}>
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={() => handleCloseUserMenu(setting)}>
                  <Typography sx={{ textAlign: "center" }}>{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
            <IconButton LinkComponent={Link} to="/cart" sx={{ ml: 2 }}>
              <Badge badgeContent={products?.length} color="error">
                <FaOpencart />
              </Badge>
            </IconButton>
            <IconButton onClick={toggleThemeMode} sx={{ ml: 2 }}>
              {mode === "light" ? <MdDarkMode /> : <MdLightMode />}
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
