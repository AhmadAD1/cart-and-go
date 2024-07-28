import React, { useEffect, useState } from "react";
import { Button, Toolbar, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useApiProvider } from "@src/providers/apiProvider";
import UserForm from "./components/UserForm";
import { API_URL } from "@src/constants";
import { usePageState } from "@src/providers/pageStateProvider";
import { User as TUser } from "@src/constants/UserTypes";

const User = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { get } = useApiProvider();
  const {
    setGeneralError,
  } = usePageState();
  const [user, setUser] = useState<TUser | null>(null);

  const getUser = async () => {
    const result = await get("GET", `users/${id}`);
    if (!result) {
      // return navigate("/notfound");
    }
    setUser(result);
  };

  const onSave = async (body) => {
    const result = await get("PATCH", `users/${id}`, null, body);
    if (result) {
      setGeneralError({ open: true, msg: "User updated successfully" });
      getUser();
    }
  };

  useEffect(() => {
    getUser();
  }, [id]);
  return (
    <>
      <Toolbar>
        <Typography variant="h6" color="text.secondary">
          {user?._id || ""}
        </Typography>
      </Toolbar>
      <UserForm user={user} onSubmit={onSave} />
    </>
  );
};

export default User;
