import { createContext, useContext, useEffect, useState } from "react";
import { API_URL } from "../constants";
import { UserDocument } from "../models/User"; // Assuming UserDocument type definition
import { usePageState } from "./pageStateProvider";
import { User } from "@src/constants/UserTypes";

export interface AuthContextType {
  user: UserDocument | null;
  token: string | null;
  error: string | null;
  isLoading: boolean;
  verifyToken: () => Promise<void>;
  updateLoggedInUser: (data:User) => void;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (values: any) => Promise<void>; // Adjust 'values' type as per your form data structure
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  error: null,
  isLoading: false,
  verifyToken: async () => {},
  updateLoggedInUser: async () => {},
  login: async () => {},
  logout: async () => {},
  register: async () => {},
});

export const useAuthProvider = () => {
  return useContext(AuthContext);
};

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserDocument | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { setAuth } = usePageState();
  useEffect(() => {
    verifyToken();
  }, []);

  const updateLoggedInUser = (data:User) => {
    setUser(data)
  }
  const handleFetch = async (url: string, options: RequestInit) => {
    try {
      const response = await fetch(url, options);
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || result.error || "Something went wrong");
      }
      return result;
    } catch (err) {
      throw new Error(err.message);
    }
  };

  const verifyToken = async () => {
    setIsLoading(true);
    setError(null);
    let authUser = localStorage.getItem("user");
    const authToken = localStorage.getItem("accessToken");
    if (authUser && authToken) {
      authUser = JSON.parse(authUser);
      try {
        const result = await handleFetch(`${API_URL}/users/${authUser?._id}`, {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        setUser(result);
        setToken(authToken);
        setAuth({ token: authToken, user: result });
      } catch (err) {
        setError(err.message);
        setUser(null);
        setToken(null);
        localStorage.removeItem("user");
        localStorage.removeItem("accessToken");
      } finally {
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
  };

  const login = async (username: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await handleFetch(`${API_URL}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      setUser(result.user);
      setToken(result.token);
      localStorage.setItem("user", JSON.stringify(result.user));
      localStorage.setItem("accessToken", result.token);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (values: any) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await handleFetch(`${API_URL}/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(values),
      });
      setUser(result.user);
      setToken(result.token);
      localStorage.setItem("user", JSON.stringify(result.user));
      localStorage.setItem("accessToken", result.token);
      if (!result.error) {
        window.location.href = "/"
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    setError(null);
    try {
      if (!user || !token) {
        throw new Error("You are not logged in");
      }
      setUser(null);
      setToken(null);
      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, error, isLoading, register, login, logout, verifyToken,updateLoggedInUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
