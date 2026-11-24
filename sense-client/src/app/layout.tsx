import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GridSense — Smart Building Energy Intelligence Platform",
  description:
    "Enterprise-grade multi-tenant energy analytics, automated anomaly detection, and building hierarchy telemetry.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased selection:bg-emerald-500/20 selection:text-emerald-400">
        {children}
      </body>
    </html>
  );
}
