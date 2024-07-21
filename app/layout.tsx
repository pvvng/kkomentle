import type { Metadata } from "next";
import "./globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { cookies } from "next/headers";
import ReactQueryProvider from "@/util/provider/ReactQueryProvider";

export const metadata: Metadata = {
  title: "꼬들꼬들",
  description: "단어 유사도 추측 게임",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  let darkmode = cookies().get('mode') as {[ket :string] :string} | undefined;

  if(darkmode === undefined){
    darkmode = {mode : 'darkmode', value : 'light'};
  }

  return (
    <html lang="en">
      <head>
        <title>꼬들꼬들</title>
        <link rel='manifest' href='/manifest.json' />
      </head>
        <body className={
          darkmode !== undefined &&
          darkmode.value === 'dark' 
          ? 'dark-mode-container'
          : ''
        }>
          <ReactQueryProvider>
            {children}
          </ReactQueryProvider>
        </body>
    </html>
  );
}
