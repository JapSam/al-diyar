"use client";

import ThemeProvider from "./ThemeProvider";
import Navbar from "./Navbar";
import Footer from "./Footer";
import WhatsAppButton from "./WhatsAppButton";
import LoadingScreen from "./LoadingScreen";
import CustomCursor from "./CustomCursor";

export default function ClientShell({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <LoadingScreen />
      <CustomCursor />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <WhatsAppButton />
    </ThemeProvider>
  );
}
