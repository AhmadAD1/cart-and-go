import React, { useEffect, useState } from "react";
import { Box, Button, Stack, Toolbar, Typography } from "@mui/material";
import UniTable from "@admin/components/UniTable/UniTable";
import { useApiProvider } from "@src/providers/apiProvider";

const NewsLetter = () => {
  const [data, setData] = useState([]);

  const [query, setQuery] = useState({ username: "", page: 0 });
  const { get } = useApiProvider();

  const headers = [
    { id: "_id", label: "view" },
    { id: "email", label: "Email" },
  ];

  const findNewsLetter = async () => {
    const result = await get("GET", "users/subscribers", null);
    if (result) {
      setData(result);
    }
  };
  useEffect(() => {
    findNewsLetter();
  }, [query]);
  return (
    <Box component={"div"}>
      <Toolbar>
        <Typography variant="h6" color={"primary"}>
          NewsLetter
        </Typography>
      </Toolbar>
      <UniTable
        rows={data || []}
        count={data?.length || 0}
        columns={headers}
        page={query.page}
        onPageChange={(e, p) => setQuery((prev) => ({ ...prev, page: p }))}
        noActions
      />
    </Box>
  );
};

export default NewsLetter;
