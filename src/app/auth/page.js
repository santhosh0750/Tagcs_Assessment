"use client";
import { Box, Button, Grid, Slide, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Emailandpassword from "./components/Emailandpassword";
import Register from "./components/Register";

function Page() {
  //usestate
  const [Screen, setScreen] = useState(false);
  const [visiable, setvisiable] = useState(false);

  useEffect(() => {
    if (Screen) {
      setvisiable(true);
    }
  }, [Screen]);

  return (
    <Grid
      container
      direction="row"
      sx={{
        justifyContent: "center",
        alignItems: "center",
        mt: 8,
      }}
    >
       <Image
        src={"/tagcs.png"}
        width={100}
        height={100}
        alt="Main Image"
        style={{ marginTop: "10px" }}
        priority
      />
      <Grid size={12} sx={{ display: "flex", justifyContent: "center" }}></Grid>
      <Grid size={{ md: 3.8, xs: 12 }} sx={{ mt: 2 }}>
        <Box
          sx={{
            background: "#fff",
            borderRadius: 3,
            px: 4,
            py: 4,
            display: "flex",
            justifyContent: "center",
            mt: 1,
          }}
        >
          {!Screen ? (
            <Emailandpassword Screen={Screen} setScreen={setScreen} />
          ) : (
            <Slide in={visiable} direction="left" timeout={500}>
              <Grid size={12}>
                <Register Screen={Screen} setScreen={setScreen} />
              </Grid>
            </Slide>
          )}
        </Box>
      </Grid>
    </Grid>
  );
}

export default Page;
