import { useEffect, Suspense, lazy } from "react";
import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuthProvider } from "./providers/authProvider";
import RequireAuth from "@components/RequireAuth/RequireAuth";
import Loading from "@components/Loading/Loading";
import Layout from "@components/Layout/Layout";

// Define types for user and auth provider
type User = {
  role: string;
};

type AuthContextType = {
  user: User | null;
  token: string | null;
};

// Import pages
const userPages = {
  Login: lazy(() => import("@pages/auth/Login")),
  Register: lazy(() => import("@pages/auth/Register")),
  Profile: lazy(() => import("@pages/profile/Profile")),
  Home: lazy(() => import("@pages/home/Home")),
  ProductDetails: lazy(() => import("@pages/productDetails/ProductDetails")),
  Cart: lazy(() => import("@pages/cart/Cart")),
  Products: lazy(() => import("@pages/products/Products")),
  SuccessCheckout: lazy(() => import("@pages/successCheckout/SuccessCheckout")),
  NotFound: lazy(() => import("@pages/notFound/NotFound")),
};

const admin = {
  Products: lazy(() => import("@admin/pages/products/Products")),
  Product: lazy(() => import("@admin/pages/product/Product")),
  Users: lazy(() => import("@admin/pages/users/Users")),
  User: lazy(() => import("@admin/pages/user/User")),
  Orders: lazy(() => import("@admin/pages/orders/Orders")),
  Order: lazy(() => import("@admin/pages/order/Order")),
  NewsLetter: lazy(() => import("@admin/pages/newsLetter/NewsLetter")),
};

const App: React.FC = () => {
  const { user, token } = useAuthProvider() as AuthContextType;
  const router = createBrowserRouter([
    {
      path: "/",
      element: user?.role === "superadmin" ? <Navigate to="/super-dashboard" /> : <Layout />,
      children: [
        {
          path: "/",
          element: (
            <Suspense fallback={<Loading />}>
              <userPages.Home />
            </Suspense>
          ),
        },
        {
          path: "/profile",
          element: (
            <Suspense fallback={<Loading />}>
              <userPages.Profile />
            </Suspense>
          ),
        },
        {
          path: "/products",
          element: (
            <Suspense fallback={<Loading />}>
              <userPages.Products />
            </Suspense>
          ),
        },
        {
          path: "/products/:id",
          element: (
            <Suspense fallback={<Loading />}>
              <userPages.ProductDetails />
            </Suspense>
          ),
        },
        {
          path: "/cart",
          element: (
            <Suspense fallback={<Loading />}>
              <userPages.Cart />
            </Suspense>
          ),
        },
        {
          path: "checkout-success",
          element: (
            <Suspense fallback={<Loading />}>
              <userPages.SuccessCheckout />
            </Suspense>
          ),
        },
      ],
    },
    {
      path: "/super-dashboard",
      element: <RequireAuth allowedRole={["superadmin"]} />,
      children: [
        {
          path: "",
          element: (
            <Suspense fallback={<Loading />}>
              <admin.Products />
            </Suspense>
          ),
        },
        {
          path: "products",
          element: (
            <Suspense fallback={<Loading />}>
              <admin.Products />
            </Suspense>
          ),
        },
        {
          path: "products/new",
          element: (
            <Suspense fallback={<Loading />}>
              <admin.Product />
            </Suspense>
          ),
        },
        {
          path: "products/:id",
          element: (
            <Suspense fallback={<Loading />}>
              <admin.Product />
            </Suspense>
          ),
        },
        {
          path: "users",
          element: (
            <Suspense fallback={<Loading />}>
              <admin.Users />
            </Suspense>
          ),
        },
        {
          path: "users/:id",
          element: (
            <Suspense fallback={<Loading />}>
              <admin.User />
            </Suspense>
          ),
        },
        {
          path: "orders",
          element: (
            <Suspense fallback={<Loading />}>
              <admin.Orders />
            </Suspense>
          ),
        },
        {
          path: "orders/:id",
          element: (
            <Suspense fallback={<Loading />}>
              <admin.Order />
            </Suspense>
          ),
        },
        {
          path: "newsLetter",
          element: (
            <Suspense fallback={<Loading />}>
              <admin.NewsLetter />
            </Suspense>
          ),
        },
      ],
    },
    {
      path: "/login",
      element: (
        <Suspense fallback={<Loading />}>
          <userPages.Login />
        </Suspense>
      ),
    },
    {
      path: "/register",
      element: (
        <Suspense fallback={<Loading />}>
          <userPages.Register />
        </Suspense>
      ),
    },
    {
      path: "/notfound",
      element: (
        <Suspense fallback={<Loading />}>
          <userPages.NotFound />
        </Suspense>
      ),
    },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
