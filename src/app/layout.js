'use client'
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from '@mui/material/styles'
import theme from "@/lib/theme";
import { CssBaseline, Container } from '@mui/material'
import Nav from "@/components/nav/nav";
import ClientOnly from "@/components/ClientOnly";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ClientOnly>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Nav />
            <Container maxWidth={false} className="p-5">
            {children}
            </Container>
          </ThemeProvider>
        </ClientOnly>
      </body>
    </html>
  );
}
