"use client";

import { Geist, Geist_Mono } from "next/font/google";
import GlobalStyleProvider from "./Providers/GlobalStyleProvider";
import ContextProvider from "./Providers/ContextProvider";
import Providers from "./Providers/Providers";
import ThemeWrapper from "@/app/Componets/ThemeWrapper/ThemeWrapper";
import { ClerkProvider } from '@clerk/nextjs';
import ClientAuthWrapper from "@/app/Componets/ClientAuthWrapper/ClientAuthWrapper";
import Sidebar from "@/app/Componets/Sidebar/Sidebar"; 
import styled from "styled-components";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css"
            integrity="sha512-Ev0%4WrAkqV6N8gIGL/F/aIDq0b7xQ2vcrd1wxfjTbSH8C5R7PBEaKcr51Ckwr/U63MJ2Im1vX0SVk9ABhg=="
            crossOrigin="anonymous"
            referrerPolicy="no-referrer"
          />
        </head>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <ClientAuthWrapper>
            <Providers>
              <ContextProvider>
                <ThemeWrapper>
                  <GlobalStyleProvider>
                    <MainLayout>
                      <Sidebar /> {/* Adăugăm sidebarul fix aici */}
                      <PageContent>{children}</PageContent>
                    </MainLayout>
                  </GlobalStyleProvider>
                </ThemeWrapper>
              </ContextProvider>
            </Providers>
          </ClientAuthWrapper>
        </body>
      </html>
    </ClerkProvider>
  );
}

const MainLayout = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  background-color: ${(props) => props.theme.colorBg};
  overflow: hidden;
`;

const PageContent = styled.div`
  flex: 1;
  height: 100%;
  overflow-y: auto;
`;
