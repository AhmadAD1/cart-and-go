import React, { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { List, ListItemButton, Box, Collapse, Typography, Stack, IconButton } from "@mui/material";
import {
  MdExpandLess,
  MdExpandMore,
  MdHome,
  MdOutlineCategory,
  MdPeople,
  MdClose,
  MdDarkMode,
  MdLightMode,
} from "react-icons/md";
import { green } from "@mui/material/colors";

// import Flex from "@components/Flex/Flex";
import { BiLogOutCircle } from "react-icons/bi";
import { useAuthProvider } from "@src/providers/authProvider";
import { TbShoppingCartCog } from "react-icons/tb";
import { SlEnvolopeLetter } from "react-icons/sl";
import { darkTheme, lightTheme } from "@src/theme/theme";
import { usePageState } from "@src/providers/pageStateProvider";
import Flex from "@components/Flex/Flex";

// Define types for link items and sub-links
interface SubLink {
  link: string;
  title: string;
}

interface LinkItem {
  link: string;
  title: string;
  icon?: React.ElementType;
  subLinks?: SubLink[];
}

// Define the props for the Sidebar component
interface SidebarProps {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  isA: boolean; // Adjust based on the actual use of this prop
}

const superLinks: LinkItem[] = [
  {
    title: "Home",
    link: "/super-dashboard",
    icon: MdHome,
  },
  {
    title: "Users",
    link: "/super-dashboard/users",
    icon: MdPeople,
  },
  {
    title: "Orders",
    link: "/super-dashboard/orders",
    icon: TbShoppingCartCog,
  },
  {
    title: "NewsLetter",
    link: "/super-dashboard/newsLetter",
    icon: SlEnvolopeLetter,
  },
];

const Sidebar: React.FC<SidebarProps> = ({ show, setShow }) => {
  const { logout } = useAuthProvider();
  const { mode, toggleThemeMode } = usePageState();
  const { pathname, search } = useLocation();
  const [contactsOpen, setContactsOpen] = useState(false);
  const linkItems: LinkItem[] = superLinks; // or swapperLinks based on the isA prop

  return (
    <List
      dense
      sx={{
        width: {
          md: "17%",
          xs: "250px",
        },
        zIndex: 9,
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        overflowY: "auto",
        borderRight: "1px solid #ddd4",
        backgroundColor:
          mode === "light" ? lightTheme.palette.background.default : darkTheme.palette.background.default,
        color: mode === "dark" ? lightTheme.palette.background.default : darkTheme.palette.background.default,
        transform: {
          md: "scale(1)",
          xs: show ? "translateX(0)" : "translateX(-400px)",
        },
        transition: ".3s ease",
      }}
      component="nav"
      subheader={
        <Box
          sx={{
            position: "relative",
            p: 3,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
          <Box
            component="div"
            sx={{
              position: "absolute",
              right: 10,
              display: {
                md: "none",
                xs: "block",
              },
            }}
            onClick={() => setShow(false)}>
            <MdClose style={{ fontSize: 20 }} />
          </Box>
          <Typography variant="h6">Cart&Go</Typography>
        </Box>
      }>
      {linkItems.map((item, i) => (
        <div key={i}>
          <ListItemButton
            onClick={() => item.subLinks && setContactsOpen(!contactsOpen)}
            component={!item.subLinks ? Link : "div"}
            to={!item.subLinks ? item.link : ""}
            sx={{
              p: "1rem",
              transition: ".2s ease",
              "&:hover": {
                backgroundColor: mode === "light" ? green[700] : green[900],
                color: mode === "dark" ? lightTheme.palette.background.default : darkTheme.palette.background.default,
              },
              "&.Mui-selected": {
                backgroundColor: green[500],
                color: "#fff",
                transition: ".2s ease",
                "&:hover": {
                  backgroundColor: mode === "light" ? green[700] : green[900],
                  color: mode === "dark" ? lightTheme.palette.background.default : darkTheme.palette.background.default,
                },
              },
            }}
            selected={!item.subLinks && pathname === item.link}>
            <Stack direction="row" justifyContent="space-between" sx={{ width: "100%" }}>
              <Flex>
                {item.icon && <item.icon style={{ fontSize: 17, marginRight: 8 }} />}
                <Typography sx={{ fontSize: 12, fontWeight: 600 }}>{item.title}</Typography>
              </Flex>
              <Flex>
                {item.subLinks &&
                  (contactsOpen ? (
                    <MdExpandLess style={{ fontSize: 20 }} />
                  ) : (
                    <MdExpandMore style={{ fontSize: 20 }} />
                  ))}
              </Flex>
            </Stack>
          </ListItemButton>
          {item.subLinks && (
            <Collapse in={contactsOpen}>
              <List dense>
                {item.subLinks.map((sub, i) => (
                  <ListItemButton
                    key={i}
                    component={NavLink}
                    to={sub.link}
                    selected={`${pathname}${search}` === sub.link}
                    sx={{
                      mx: 5,
                      mb: 2,
                      borderRadius: 1.5,
                      transition: ".2s ease",
                      "&.Mui-selected": {
                        backgroundColor: "#07300c",
                        color: "#89ffa9",
                        transition: ".2s ease",
                        "&:hover": {
                          backgroundColor: "#04520d",
                        },
                      },
                      "&:hover": {
                        backgroundColor: "#5dff701c",
                      },
                    }}>
                    - <Typography sx={{ fontSize: 12, fontWeight: 600, p: 1.5 }}>{sub.title}</Typography>
                  </ListItemButton>
                ))}
              </List>
            </Collapse>
          )}
        </div>
      ))}
      <ListItemButton
        onClick={logout}
        sx={{
          p: "1rem",
          transition: ".2s ease",
          "&:hover": {
            backgroundColor: mode === "light" ? green[700] : green[900],
            color: mode === "dark" ? lightTheme.palette.background.default : darkTheme.palette.background.default,
          },
          "&.Mui-selected": {
            backgroundColor: green[500],
            color: "#fff",
            transition: ".2s ease",
            "&:hover": {
              backgroundColor: green[700],
            },
          },
        }}>
        <Flex>
          <BiLogOutCircle style={{ fontSize: 17, marginRight: 8 }} />
          <Typography sx={{ fontSize: 12, fontWeight: 600 }}>Logout</Typography>
        </Flex>
      </ListItemButton>
      <Flex style={{ mt:2 }}>
        <IconButton onClick={toggleThemeMode} sx={{ ml: 2 }}>
          {mode === "light" ? <MdDarkMode /> : <MdLightMode />}
        </IconButton>
      </Flex>
    </List>
  );
};

export default Sidebar;
