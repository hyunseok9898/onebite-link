import type { Metadata } from "next";
import { FoldersProvider } from "./_context/FoldersContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "한입링크",
  description: "링크 관리 앱",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <FoldersProvider>{children}</FoldersProvider>
      </body>
    </html>
  );
}
