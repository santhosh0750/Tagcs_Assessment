"use client";
import { Grid, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const LoginRoutefun = () => {
    let userInfo = JSON.parse(localStorage.getItem("Logindetails"));
    if (userInfo) {
      router.push("dashboard");
    } else {
      router.push("auth");
    }
  };
  useEffect(() => {
    LoginRoutefun();
  }, []);
  return (
    <Grid container sx={{ height: "100vh", alignItems: "center" }}>
      <Grid size={12}>
        <Typography textAlign={"center"} sx={{ fontSize: 16 }}>
          Loading...
        </Typography>
      </Grid>
    </Grid>
  );
}
