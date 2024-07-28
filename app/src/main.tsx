import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import AuthProvider from "./providers/authProvider.tsx";
import ApiProvider from "./providers/apiProvider.tsx";
import { PageStateProvider } from "./providers/pageStateProvider.tsx";
import "./main.scss";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <ApiProvider>
      <PageStateProvider>
        <App />
      </PageStateProvider>
    </ApiProvider>
  </AuthProvider>
);
