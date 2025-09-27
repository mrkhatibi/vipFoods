"use client";

import Header from "@/components/layouts/Header";
import "./globals.css";
import Footer from "@/components/layouts/Footer";
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <QueryClientProvider client={queryClient}>
        <SessionProvider>
          <body>
            <header>
              <Header />
            </header>
            <main>{children}</main>
            <footer>
              <Footer />
            </footer>
          </body>
        </SessionProvider>
      </QueryClientProvider>
    </html>
  );
}
