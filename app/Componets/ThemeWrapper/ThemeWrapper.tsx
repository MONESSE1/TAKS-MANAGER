"use client";

import { ThemeProvider } from "styled-components";
import { useGlobalState } from "@/app/context/globalProvider";

export default function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const { theme } = useGlobalState();

  // fallback dacă theme nu este încă inițializat
  const fallbackTheme = theme || { colors: { primary: "#000000" } };

  return <ThemeProvider theme={fallbackTheme}>{children}</ThemeProvider>;
}
