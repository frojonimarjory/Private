import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Marjory Frojoni",
  description: "Journalist & Storyteller",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
