import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { Button, Paper, Typography } from "@mui/material";
import { usePageState } from "@src/providers/pageStateProvider";

export default function OrderStatus({
  handleChange,
  value,
  onSave,
}: {
  handleChange: (event: any) => void;
  onSave: () => void;
  value: string;
  }) {
  const {orders:{orderDetails}} = usePageState()
  const statusArr = ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"];
  return (
    <Paper sx={{ p: 2, mt: 2 }}>
      <Typography sx={{ fontSize: "1.2rem", mb: 2 }}>Order Status</Typography>
      <FormControl>
        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={value}
          onChange={handleChange}
          sx={{ flexDirection: "row" }}>
          {statusArr.map((item) => (
            <FormControlLabel value={item.toLowerCase()} control={<Radio />} label={item} />
          ))}
        </RadioGroup>
      </FormControl>
      <Button fullWidth variant="outlined" sx={{mt:2}} size="small" onClick={onSave}> Save </Button>
    </Paper>
  );
}
