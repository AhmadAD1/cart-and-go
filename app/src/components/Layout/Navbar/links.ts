import { CiHome } from "react-icons/ci";

import { FaUsers } from "react-icons/fa";

import { GrTransaction } from "react-icons/gr";

const userLinks = [
  {
    name: "Home",
    icon: "",
    link: "/",
  },
  {
    name: "Products",
    icon: "",
    link: "/products",
  },
  {
    name: "Cart",
    icon: "",
    link: "/cart",
  },
];
const adminLinks = [
  {
    name: "home",
    icon: CiHome,
    link: "/",
  },
  {
    name: "users",
    icon: FaUsers,
    link: "/users",
  },
  {
    name: "orders",
    icon: GrTransaction,
    link: "/products",
  },
];

export { adminLinks, userLinks };
