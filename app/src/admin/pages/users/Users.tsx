import React, { useEffect, useState } from "react";
import { Box, Button, Stack, Toolbar, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { MdAdd } from "react-icons/md";
import UserSearchForm from "./searchForm/UserSearchForm";
import UniTable from "@admin/components/UniTable/UniTable";
import DeleteDialog from "@admin/components/DeleteDialog/DeleteDialog";
import { useApiProvider } from "@src/providers/apiProvider";
import { usePageState } from "@src/providers/pageStateProvider";

const Users = () => {
  const [data, setData] = useState({ users: [], count: 0 });
  const {
    setPageStateUsersValue,
    users: { list },
  } = usePageState();
  const [query, setQuery] = useState({ username: "", page: 0 });
  const [activeUserId, setActiveUserId] = useState(null);
  const [open, setOpen] = useState(false);
  const { get } = useApiProvider();

  const headers = [
    { id: "_id", label: "view" },
    { id: "username", label: "Username" },
    { id: "email", label: "Email" },
  ];

  const findUsers = async () => {
    const result = await get("GET", "users", { ...query });
    if (result) {
      setPageStateUsersValue("list", result);
      setData(result);
    }
  };
  const onDeleteClick = (e, id) => {
    setActiveUserId(id);
    setOpen(true);
  };
  const onYesClick = async (e) => {
    setOpen(false);
    if (activeUserId) {
      const result = await get("DELETE", `users/${activeUserId}`);
      if (result) {
        setQuery((prev) => ({ page: 0, ...prev }));
      }
    }
  };
  useEffect(() => {
    findUsers();
  }, [query]);
  return (
    <Box component={"div"}>
      <Toolbar>
        <Typography variant="h6" color={"primary"}>
          Users
        </Typography>
      </Toolbar>
      <UserSearchForm onSubmit={(values) => setQuery((prev) => ({ page: 0, ...values }))} />
      <UniTable
        rows={list?.users || []}
        count={list?.count || 0}
        columns={headers}
        page={query.page}
        onPageChange={(e, p) => setQuery((prev) => ({ ...prev, page: p }))}
        onDeleteClick={onDeleteClick}
        detailsLink="/super-dashboard/users"
      />
      <DeleteDialog open={open} setOpen={setOpen} onYesClick={onYesClick} />
    </Box>
  );
};

export default Users;
