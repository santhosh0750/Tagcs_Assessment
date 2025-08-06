import {
  Button,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useDispatch, useSelector } from "react-redux";
import AlertCommon from "@/app/CommonUi/AlertCommon";
import UseThemeColor from "@/hooks/UseThemeColor";
import { useRouter } from "next/navigation";

export default function Emailandpassword({ Screen, setScreen }) {
  const { primary, secondary, text, textsecondary } = UseThemeColor();
  //
  const dispatch = useDispatch();
  const router = useRouter();

  //usestate
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [AlertOpen, setAlertOpen] = useState(false);
  const [AlertMessage, setAlertMessage] = useState({
    type: "",
    message: "",
  });
  const [PasswordShow, SetPasswordShow] = useState(false);

  //API
  const credentialcheck = () => {
    if (Password.trim() === "" || Email.trim === "") {
      setAlertMessage({
        type: "error",
        message: "Kindly Fill All The Fields",
      });
      setAlertOpen(true);
      setTimeout(() => {
        setAlertOpen(false);
      }, 2000);
      return;
    }
    setAlertMessage({
      type: "success",
      message: "Welome Back",
    });
    setAlertOpen(true);
    setTimeout(() => {
      setAlertOpen(false);
      router.push("dashboard");
    }, 2000);
    localStorage.setItem(
      "Logindetails",
      JSON.stringify({
        name: Email,
      })
    );
    dispatch({
      type: "LOGIN",
      data: {
        name: Email,
      },
    });
  };
  return (
    <Grid
      container
      size={12}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="h5" color={primary} sx={{ fontWeight: 700 }}>
        Hello Again!
      </Typography>
      <Grid
        size={12}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: 2,
        }}
      >
        <Typography
          variant="body1"
          color={"textSecondary"}
          sx={{ fontWeight: 400 }}
        >
          Ready to Dive In
        </Typography>
      </Grid>

      <TextField
        fullWidth
        size={"medium"}
        label="Email Address"
        variant="outlined"
        sx={{ mt: 2, background: "#e8f0fe" }}
        type="email"
        value={Email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <TextField
        fullWidth
        size={"medium"}
        label="Password"
        variant="outlined"
        sx={{ mt: 2, background: "#e8f0fe" }}
        value={Password}
        onChange={(e) => setPassword(e.target.value)}
        type={PasswordShow ? "text" : "password"}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            credentialcheck();
          }
        }}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => SetPasswordShow(!PasswordShow)}>
                  {PasswordShow ? (
                    <VisibilityOff sx={{ color: primary }} />
                  ) : (
                    <Visibility sx={{ color: primary }} />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />
      <Button
        size="medium"
        variant="contained"
        fullWidth
        sx={{ mt: 2 }}
        onClick={() => credentialcheck()}
      >
        Sign In
      </Button>
      <Grid
        size={12}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: 1,
        }}
      >
        <Typography
          variant="body1"
          color={textsecondary}
          sx={{
            fontWeight: 400,
            fontSize: 14,
            "&:hover": { color: primary, fontSize: 15 },
            cursor: "pointer",
            textDecoration: "underline",
          }}
          onClick={() => {
            setScreen(true);
          }}
        >
          New user ? Regeister here
        </Typography>
      </Grid>
      <Grid sx={{ mt: 2 }}>
        <Typography variant="body2">
          ////////////////////////////////////////////////
        </Typography>
      </Grid>
      {AlertOpen && (
        <AlertCommon
          AlertOpen={AlertOpen}
          setAlertOpen={setAlertOpen}
          type={AlertMessage.type}
          message={AlertMessage.message}
        />
      )}
    </Grid>
  );
}
