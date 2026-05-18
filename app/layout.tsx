import type { Metadata } from "next";
import { FoldersProvider } from "./_context/FoldersContext";
import { LinksProvider } from "./_context/LinksContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "현석링크",
  description: "나만의 링크 저장소",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "현석링크",
    description: "나만의 링크 저장소",
    images: [{ url: "/thumbnail.png" }],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <FoldersProvider>
          <LinksProvider>{children}</LinksProvider>
        </FoldersProvider>
      </body>
    </html>
  );
}
