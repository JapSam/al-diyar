import type { Metadata } from "next";
import { IBM_Plex_Sans_Arabic } from "next/font/google";
import "./globals.css";
import ClientShell from "@/components/ui/ClientShell";

const ibmPlex = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-ibm-plex",
});

export const metadata: Metadata = {
  title: "الديار للتطوير العقاري | نبني المستقبل، نصنع الأثر",
  description:
    "شركة رائدة في التطوير العقاري بالمملكة العربية السعودية. نقدم مشاريع سكنية وتجارية فاخرة بأعلى معايير الجودة والابتكار.",
  keywords: "تطوير عقاري، عقارات السعودية، فلل فاخرة، مشاريع سكنية، الديار",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" data-scroll-behavior="smooth" className={`${ibmPlex.variable} antialiased`}>
      <body className="min-h-screen">
        <ClientShell>{children}</ClientShell>
      </body>
    </html>
  );
}
