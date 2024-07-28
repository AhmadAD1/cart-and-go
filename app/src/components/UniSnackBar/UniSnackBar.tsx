import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function UniSnackbar({ open, setOpen, text, type = "success" }) {
  const handleClose = () => {
    setOpen((prev) => ({ ...prev, show: false }));
    setTimeout(() => setOpen({ error: null, show: false }), 2000);
  };

  return (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
        <Alert onClose={handleClose} severity={type} variant="filled" sx={{ width: "100%" }}>
          {text}
        </Alert>
      </Snackbar>
    </div>
  );
}
