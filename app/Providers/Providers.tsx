"use client";

import React from "react";
import ContextProvider from "@/app/Providers/ContextProvider";

interface Props {
  children: React.ReactNode;
}

export default function Providers({ children }: Props) {
  return (
    <ContextProvider>
      {children}
    </ContextProvider>
  );
}
