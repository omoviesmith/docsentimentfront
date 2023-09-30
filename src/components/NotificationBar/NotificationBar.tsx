import React from "react";

import { Alert, Snackbar } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useStore } from "../../stores/utils/useStore";

export const NotificationBar = observer(() => {
  const {
    notification: { open, message, severity },
    closeNotification,
  } = useStore();
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={closeNotification}>
      <Alert
        onClose={closeNotification}
        severity={severity}
        sx={{ width: "100%" }}
        variant="filled"
      >
        {message}
      </Alert>
    </Snackbar>
  );
});
