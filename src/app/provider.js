"use client";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";

import "./globals.css";
import dynamic from "next/dynamic";
import { lightTheme } from "@/styles/theme";

const ReduxProvider = dynamic(() => import("@/redux/provider"), {
  ssr: false,
});

export default function Providers({ children }) {
  return (
    <ReduxProvider>
      <ThemeProvider theme={lightTheme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ReduxProvider>
  );
}
