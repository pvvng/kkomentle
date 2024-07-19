import type { Metadata } from "next";
import { Inter } from "next/font/google";
import './font.css'
import "./globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { cookies } from "next/headers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "꼬들꼬들",
  description: "단어 유사도 추측 게임 꼬들꼬들",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  let darkmode = cookies().get('mode');

  return (
    <html lang="en">
        <body className={
          darkmode !== undefined && darkmode.value === 'dark' 
            ? 'dark-mode-container'
            : ''
        }>
          {children}
        </body>
    </html>
  );
}
