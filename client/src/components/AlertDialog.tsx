import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Link } from "@mui/material";

export default function AlertDialog({ data }) {
  const [open, setOpen] = React.useState(true);
  const alertRef = React.useRef();
  const handleClose = () => {
    setOpen(false);
  };
  const handleClcikOutside = (event) => {
    if (alertRef.current && !alertRef.current.contains(event.targer)) {
      window.location.href = "/elaborazione-sconti";
    }
  };
  React.useEffect(() => {
    document.addEventListener("click", handleClcikOutside);
    return () => {
      document.removeEventListener("click", handleClcikOutside);
    };
  }, []);
  return (
    <React.Fragment>
      <Dialog
        ref={alertRef}
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Oops! Si è verificato un errore."}
        </DialogTitle>
        <DialogContent>
          <img
            src="https://cdn.dribbble.com/users/620375/screenshots/4575735/media/f6124780c321bb71730265e0ef767ce8.jpg"
            alt="404"
            width="370"
            style={{ margin: "auto" }}
          />
          <DialogContentText id="alert-dialog-description">
            {data["error"] || data["msg"]}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Link href="/elaborazione-sconti" onClick={handleClose}>
            Chiudere
          </Link>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
