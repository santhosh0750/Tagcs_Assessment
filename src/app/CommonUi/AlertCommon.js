import React from "react";
import Alert from "@mui/material/Alert";
import { AlertTitle, Snackbar } from "@mui/material";

export default function AlertCommon({
  AlertOpen,
  setAlertOpen,
  type,
  message,
}) {
  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      open={AlertOpen}
      autoHideDuration={2000}
      onClose={() => setAlertOpen(false)}
      sx={{ width: "100%" }}
    >
      <Alert severity={type}>{message}</Alert>
    </Snackbar>
  );
}
