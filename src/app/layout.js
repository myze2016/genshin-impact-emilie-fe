'use client'
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from '@mui/material/styles'
import theme from "@/lib/theme";
import { CssBaseline, Container, Box } from '@mui/material'
import Nav from "@/components/nav/horizontal-nav";
import ClientOnly from "@/components/ClientOnly";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import VerticalNav from "@/components/nav/vertical-nav";
import { useState } from "react";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  const [collapsed, setCollapsed] = useState(true);
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ClientOnly>
        <ThemeProvider theme={theme}>
            <ToastContainer newestOnTop />
            <CssBaseline />

            <Nav />
            <VerticalNav collapsed={collapsed} setCollapsed={setCollapsed} />

            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                ml: collapsed ? '72px' : '240px', 
                transition: 'margin 0.3s ease',
              }}
            >
              <Container maxWidth={false} className="p-5">
                {children}
              </Container>
            </Box>
          </ThemeProvider>
        </ClientOnly>
      </body>
    </html>
  );
}
