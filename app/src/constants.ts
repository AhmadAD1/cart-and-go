import { red } from "@mui/material/colors";

export const API_URL = `${import.meta.env.VITE_API_URL}/api`;
export const UPLOADS_URL = `${import.meta.env.VITE_API_URL}`;
export const ROWS_PER_PAGE = 10;
export const STYLE = {
  primaryColor: red[500],
};
export const PERMISSIONS = [
  // users
  "CREATE_USER",
  "DELETE_USER",
  "UPDATE_USER",
  "READ_USER",
  // Super Admins
  "CREATE_SUPER_ADMIN",
  "DELETE_SUPER_ADMIN",
  "UPDATE_SUPER_ADMIN",
  "READ_SUPER_ADMIN",
  // Adminss
  "CREATE_ADMIN",
  "DELETE_ADMIN",
  "UPDATE_ADMIN",
  "READ_ADMIN",
  // Employees
  "CREATE_EMPLOYEE",
  "DELETE_EMPLOYEE",
  "UPDATE_EMPLOYEE",
  "READ_EMPLOYEE",
  // Client
  "CREATE_CLIENT",
  "DELETE_CLIENT",
  "UPDATE_CLIENT",
  "READ_CLIENT",
  // Department
  "CREATE_DEPARTMENT",
  "DELETE_DEPARTMENT",
  "READ_DEPARTMENT",
  "UPDATE_DEPARTMENT",
  // Position
  "CREATE_POSITION",
  "DELETE_POSITION",
  "UPDATE_POSITION",
  "READ_POSITION",
  // Roles
  "CREATE_ROLE",
  "DELETE_ROLE",
  "UPDATE_ROLE",
  "READ_ROLE",
  // Contact
  "CREATE_CONTACT",
  "DELETE_CONTACT",
  "UPDATE_CONTACT",
  "READ_CONTACT",
  // Tags
  "CREATE_TAG",
  "DELETE_TAG",
  "UPDATE_TAG",
  "READ_TAG",
  // Tasks
  "CREATE_TASK",
  "DELETE_TASK",
  "UPDATE_TASK",
  "READ_TASK",
  "ASSIGN_TASK",
  // LOG
  "READ_LOG",
];
