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
import { usePathname } from "next/navigation";
import { getUser } from "@/hooks/useAuth";
import { useRouter } from 'next/navigation'
import { useEffect } from "react";
import { UserProvider } from "@/context/UserContext";
import { CommonProvider } from "@/context/CommonContext";
import { StatProvider } from "@/context/StatContext";
import { ElementProvider } from "@/context/ElementContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function RootLayout({ children }) {
    const router = useRouter()

  // const { data: user, loading: loading } = getUser('', false)


  const pathname = usePathname()
  const hideNav = ['/login', '/register'].includes(pathname)
  const [collapsed, setCollapsed] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token && !hideNav) {
      router.push('/login');
    } 

    if (token && hideNav) {
      router.push('/dashboard');
    }
  }, []);


  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >

        <ClientOnly>
            <ThemeProvider theme={theme}>
               <UserProvider>
                 <CommonProvider>
                   <StatProvider>
                     <ElementProvider>
            <ToastContainer newestOnTop />
            <CssBaseline />

            {!hideNav && <Nav />}
             {!hideNav && <VerticalNav collapsed={collapsed} setCollapsed={setCollapsed} />}

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
                     </ElementProvider>
                       </StatProvider>
                     </CommonProvider>
            </UserProvider>
          </ThemeProvider> 
        </ClientOnly>
      </body>
    </html>
  );
}
