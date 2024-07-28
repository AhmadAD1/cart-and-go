import { Order } from "@src/constants/OrderTypes";
import { Category, Product } from "@src/constants/ProductTypes";
import { User } from "@src/constants/UserTypes";
import React, { createContext, useContext, useState, useMemo, useEffect } from "react";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { darkTheme, lightTheme } from "@src/theme/theme";

interface Alert {
  open?: boolean;
  msg?: string | null;
  type?: "success" | "error" | "info";
}
interface Auth {
  user: User | null;
  token: string | null;
}

interface CartProduct extends Product {
  count: number;
}

interface PageStateContextValue {
  alert: Alert;
  auth: Auth;
  users: {
    list: { users: User[]; count: number } | null;
    userDetails: User | null;
    profile: User | null;
  };
  products: {
    list: { products: Product[]; count: number } | null;
    categories: Category[] | null;
    productDetails: Product | null;
    cart: {
      count: number;
      products: CartProduct[];
      totalPrice: number;
    };
  };
  orders: {
    list: { orders: Order[]; count: number } | null;
    orderDetails: Order | null;
  };
  mode: 'light' | 'dark';
  toggleThemeMode: () => void;
  setAuth: ({ user, token }: Auth) => void;
  setGeneralError: (error: Alert) => void;
  setPageStateUsersValue: (key: keyof PageStateContextValue["users"], value: any) => void;
  setPageStateProductsValue: (key: keyof PageStateContextValue["products"], value: any) => void;
  setPageStateOrdersValue: (key: keyof PageStateContextValue["orders"], value: any) => void;
  addToCart: (product: Product | null, quantity: number) => void;
}

export interface ProductDetailsContext {
  setPageStateProductsValue?: (key: string, value: any) => void;
  setPageStateUsersValue?: (key: string, value: any) => void;
  setPageStateOrdersValue?: (key: string, value: any) => void;
  addToCart?: (product: Product | null, quantity: number) => void;
  setGeneralError?: (error: { open: boolean; msg: string; type?: string }) => void;
}

const PageStateContext = createContext<PageStateContextValue>({
  alert: { open: false, msg: null, type: "success" },
  auth: {
    user: null,
    token: null,
  },
  users: {
    list: null,
    userDetails: null,
    profile: null,
  },
  orders: {
    list: null,
    orderDetails: null,
  },
  products: {
    list: null,
    categories: null,
    productDetails: null,
    cart: {
      count: 0,
      products: [],
      totalPrice: 0,
    },
  },
  mode: 'light',
  toggleThemeMode: () => {},
  setAuth: ({ user, token }: Auth) => {},
  setGeneralError: (error: Alert) => {},
  setPageStateUsersValue: (key: string, value: any) => {},
  setPageStateProductsValue: (key: string, value: any) => {},
  setPageStateOrdersValue: (key: string, value: any) => {},
  addToCart: (product: Product | null, quantity: number) => {},
});

interface PageStateProviderProps {
  children: React.ReactNode;
}
export const usePageState = () => {
  return useContext(PageStateContext);
};

export const PageStateProvider: React.FC<PageStateProviderProps> = ({ children }) => {
  const getInitialCart = () => {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : { count: 0, products: [], totalPrice: 0 };
  };

  const [pageState, setPageState] = useState<PageStateContextValue>({
    alert: { open: false, msg: null, type: "success" },
    auth: { user: null, token: null },
    products: {
      list: null,
      categories: null,
      productDetails: null,
      cart: getInitialCart(),
    },
    users: {
      list: null,
      userDetails: null,
      profile: null,
    },
    orders: {
      list: null,
      orderDetails: null,
    },
    mode: 'light',
    toggleThemeMode: () => {},
    setAuth: ({ user, token }: Auth) => {},
    setGeneralError: (error: Alert) => {},
    setPageStateUsersValue: (key: string, value: any) => {},
    setPageStateProductsValue: (key: string, value: any) => {},
    setPageStateOrdersValue: (key: string, value: any) => {},
    addToCart: (product: Product | null, quantity: number) => {},
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(pageState.products.cart));
  }, [pageState.products.cart]);

  const setAuth = ({ token, user }: Auth) => {
    setPageState((prevState) => ({ ...prevState, auth: { user, token } }));
  };

  const setGeneralError = ({ open, msg, type }: Alert) => {
    setPageState((prevState) => ({ ...prevState, alert: { open, msg, type } }));
  };

  const calculateTotalPrice = (products: Product[]) => {
    return products.reduce((total, product) => total + product.price * product.count, 0);
  };

  const setPageStateProductsValue = (key: keyof PageStateContextValue["products"], value: any) => {
    setPageState((prevState) => ({
      ...prevState,
      products: {
        ...prevState.products,
        [key]: value,
      },
    }));
  };

  const setPageStateOrdersValue = (key: keyof PageStateContextValue["orders"], value: any) => {
    setPageState((prevState) => ({
      ...prevState,
      orders: {
        ...prevState.orders,
        [key]: value,
      },
    }));
  };

  const setPageStateUsersValue = (key: keyof PageStateContextValue["users"], value: any) => {
    setPageState((prevState) => ({
      ...prevState,
      users: {
        ...prevState.users,
        [key]: value,
      },
    }));
  };

  const handleCount = (productId: string, inc: boolean) => {
    setPageState((prevState) => {
      const updatedProducts = prevState.products.cart.products
        .map((product) => {
          if (product._id === productId) {
            return { ...product, count: product.count + (inc ? 1 : -1) };
          }
          return product;
        })
        .filter((product) => product.count > 0);

      const newCount = updatedProducts.reduce((total, product) => total + product.count, 0);
      const newTotalPrice = calculateTotalPrice(updatedProducts);

      return {
        ...prevState,
        products: {
          ...prevState.products,
          cart: {
            count: newCount,
            products: updatedProducts,
            totalPrice: newTotalPrice,
          },
        },
      };
    });
  };

  const deleteFromCart = (productId: string) => {
    setPageState((prevState) => {
      const updatedProducts = prevState.products.cart.products.filter((product) => product._id !== productId);
      const newCount = updatedProducts.reduce((total, product) => total + product.count, 0);
      const newTotalPrice = calculateTotalPrice(updatedProducts);

      return {
        ...prevState,
        products: {
          ...prevState.products,
          cart: {
            count: newCount,
            products: updatedProducts,
            totalPrice: newTotalPrice,
          },
        },
      };
    });
  };

  const addToCart = (product: Product, quantity: number) => {
    setPageState((prevState) => {
      const isInCart = prevState.products.cart.products.find((item) => item._id === product._id);
      let updatedCart;
      if (isInCart) {
        updatedCart = prevState.products.cart.products.map((item) => {
          if (item._id === product._id) {
            return { ...item, count: item.count + quantity };
          }
          return item;
        });
      } else {
        updatedCart = [...prevState.products.cart.products, { ...product, count: quantity }];
      }

      const newCount = updatedCart.reduce((total, product) => total + product.count, 0);
      const newTotalPrice = calculateTotalPrice(updatedCart);

      return {
        ...prevState,
        products: {
          ...prevState.products,
          cart: {
            count: newCount,
            products: updatedCart,
            totalPrice: newTotalPrice,
          },
        },
      };
    });
  };

  const toggleThemeMode = () => {
    setPageState((prevState) => ({
      ...prevState,
      mode: prevState.mode === 'light' ? 'dark' : 'light',
    }));
  };

  const theme = useMemo(
    () => (pageState.mode === 'light' ? lightTheme : darkTheme),
    [pageState.mode]
  );

  const value = {
    ...pageState,
    setPageStateProductsValue,
    setPageStateUsersValue,
    setPageStateOrdersValue,
    handleCount,
    deleteFromCart,
    addToCart,
    setGeneralError,
    setAuth,
    toggleThemeMode,
  };

  return (
    <PageStateContext.Provider value={value}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </PageStateContext.Provider>
  );
};
