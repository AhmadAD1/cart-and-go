import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Box, FormHelperText, Typography } from "@mui/material";
import { red } from "@mui/material/colors";
import { API_URL, UPLOADS_URL } from "@src/constants";

export default function UniSelect({
  name,
  items,
  selectTitle,
  value,
  img,
  handleChange,
  size = "small",
  cstStyle,
  error,
}) {
  return (
    <Box component="div" sx={{ ...cstStyle }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label"> {selectTitle} </InputLabel>
        <Select
          name={name}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          label={selectTitle}
          onChange={handleChange}
          autoWidth
          error={error}
          size={size}
          sx={{
            ".MuiOutlinedInput-input": {
              display: "flex",
              flexDirection: "row",
              gap: 2,
            },
          }}>
          {items?.length > 0 ? (
            items?.map((item, i) => (
              <MenuItem
                key={i}
                value={item.value}
                sx={{
                  gap: 2,
                }}>
                {img && <img src={`${UPLOADS_URL}/${item.image}`} width={20} />}
                <Typography>{item.text}</Typography>
              </MenuItem>
            ))
          ) : (
            <Typography sx={{ p: 2, fontSize: 10, color: "#999" }}>No Items Yet</Typography>
          )}
        </Select>
        {error && <FormHelperText sx={{ color: red[700] }}> {error} </FormHelperText>}
      </FormControl>
    </Box>
  );
}
