import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import Layout from "@components/Layout/Layout";
import { AuthContextType, useAuthProvider } from "@src/providers/authProvider";
import AdminLayout from "@admin/components/Layout/AdminLayout";

interface RequireAuthProps {
  allowedRole: string[];
}

const RequireAuth: React.FC<RequireAuthProps> = ({ allowedRole }) => {
  const { user, token } = useAuthProvider() as AuthContextType;

  const location = useLocation();
  return allowedRole.includes(user?.role) ? (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  ) : user ? (
    <Navigate
      to={user.role === "user" ? "/" : user.role === "superadmin" ? "/super-dashboard" : "/unauthorized"}
      state={{ from: location }}
      replace
    />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default RequireAuth;
