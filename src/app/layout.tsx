import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Splatter Ref",
  description: "Simple Reference Board",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
