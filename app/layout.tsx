import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "adv101-notesapp-winzin-lopez",
  description: "Exercise 3 Next.js Application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#191B1D] text-[#E8E8E8] antialiased">{children}</body>
    </html>
  );
}