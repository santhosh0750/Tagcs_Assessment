import AlertCommon from "@/app/CommonUi/AlertCommon";
import UseThemeColor from "@/hooks/UseThemeColor";
import { Button, Grid, TextField, Typography } from "@mui/material";
import React, { useState } from "react";

export default function Register({ Screen, setScreen }) {
  const { primary, secondary, text, textsecondary } = UseThemeColor();

  //usestates
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Mobile, setMobile] = useState("");
  const [AlertOpen, setAlertOpen] = useState(false);
  const [AlertMessage, setAlertMessage] = useState({
    type: "",
    message: "",
  });

  //API
  const Regestieruser = () => {
    if (
      Name.trim() === "" ||
      Email.trim() === "" ||
      Mobile.trim() === "" ||
      Mobile.length !== 10
    ) {
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
      message: "Registration Successful",
    });
    setAlertOpen(true);
    setTimeout(() => {
      setAlertOpen(false);
      setScreen(false);
    }, 2000);
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
      <Typography variant="h5" color={text} sx={{ fontWeight: 700 }}>
        Welcome
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
        <Typography variant="body1" color={text} sx={{ fontWeight: 400 }}>
          Please fill in the details to register
        </Typography>
      </Grid>
      <Grid container size={12} spacing={2} sx={{ mt: 2 }}>
        <Grid size={12}>
          <TextField
            fullWidth
            size="medium"
            label={"Enter the Name"}
            value={Name}
            onChange={(e) => setName(e.target.value)}
          />
        </Grid>
        <Grid size={12}>
          <TextField
            fullWidth
            size="medium"
            label={"Enter the Email"}
            type="email"
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Grid>
        <Grid size={12}>
          <TextField
            fullWidth
            size="medium"
            label={"Enter the Mobile Number"}
            slotProps={{
              input: {
                inputProps: {
                  maxLength: 10,
                },
              },
            }}
            value={Mobile}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "");
              setMobile(value);
            }}
          />
        </Grid>
      </Grid>
      <Button
        variant="contained"
        fullWidth
        sx={{ mt: 1 }}
        onClick={() => {
          Regestieruser();
        }}
      >
        Regeister
      </Button>
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
