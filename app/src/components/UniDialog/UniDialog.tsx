import { useEffect,forwardRef } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import WarningIcon from "@mui/icons-material/Warning";
import { Grow, Typography } from "@mui/material";
import { red } from "@mui/material/colors";
import Flex from "../Flex/Flex";

const Transition = forwardRef(function Transition(props, ref) {
  return <Grow ref={ref} {...props} />;
});

export default function UniDialog({
  open,
  setOpen,
  onYesClick,
  yesBtnTxt = "yes",
  noBtnTxt = "no",
  title,
  body,
  yesBtnColor = "error",
  redWarning,
  redWarningTxt = "Please be aware, this is an irreversible action",
  deleted,
}) {
  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    if (deleted) {
      handleClose();
    }
  }, [deleted]);

  return (
    <>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description">
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText component={"div"} id="alert-dialog-slide-description">
            {body}
            {redWarning && (
              <Flex jc="flex-start" direction={"row"} style={{ color: red[600], mt: 2 }} gap={1}>
                <WarningIcon style={{ fontSize: 12 }} />
                <Typography component={"div"} sx={{ fontSize: 12 }}>
                  {redWarningTxt}
                </Typography>
              </Flex>
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onYesClick} color={yesBtnColor} variant="outlined" size="small" sx={{ fontSize: 10 }}>
            {yesBtnTxt}
          </Button>
          <Button onClick={handleClose} variant="outlined" size="small" sx={{ fontSize: 10 }}>
            {noBtnTxt}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
