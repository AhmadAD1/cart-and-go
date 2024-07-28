import React, { createContext, useContext, useState } from "react";
import { useAuthProvider } from "./authProvider";
import { API_URL } from "../constants";

interface QueryParams {
  [key: string]: string | number | boolean;
}

interface ApiContextValue {
  error: string | null;
  isLoading: boolean;
  get: (method: string, source: string, query?: QueryParams | null, body?: any, auth: boolean) => Promise<any | null>;
  getMultiPartFormData: (method: string, source: string, query?: QueryParams, body?: FormData) => Promise<any | null>;
}

const ApiContext = createContext<ApiContextValue>({
  error: null,
  isLoading: false,
  get: async (method, source, query = {}, body, auth = true) => null,
  getMultiPartFormData: async (method, source, query = {}, body) => null,
});

export const useApiProvider = () => {
  return useContext(ApiContext);
};

const ApiProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { token, user } = useAuthProvider();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const get = async (method: string, source: string, query: QueryParams = {}, body?: any, auth = true) => {
    try {
      setIsLoading(true);
      setError(null);
      if (auth) {
        if (!user || !token) {
          throw new Error("You are not authenticated, Please login");
        }
      }
      const url = new URL(`${API_URL}/${source}`);
      query && Object.keys(query).forEach((key) => url.searchParams.append(key, query[key].toString()));
      const response = await fetch(url.toString(), {
        method,
        headers: auth
          ? {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            }
          : {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
        body: body ? JSON.stringify(body) : undefined,
      });
      const result = await response.json();
      if (result.error || response.status !== 200) {
        throw new Error(result?.error || "Something went wrong");
      }
      return result || null; // Ensure to handle potential null return
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const getMultiPartFormData = async (method, source, headers = {}, body) => {
    try {
      const url = new URL(`${API_URL}/${source}`);

      const response = await fetch(url, {
        method,
        headers: {
          ...headers,
          Authorization: `Bearer ${token}`,
        },
        body,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Error:", error);
      setError(error.message);

      return null;
    }
  };

  const value: ApiContextValue = {
    error,
    isLoading,
    get,
    getMultiPartFormData,
  };

  return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
};

export default ApiProvider;
