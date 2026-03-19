import type { Metadata } from "next";
import "./globals.css";
import Provider from "../Provider";


export const metadata: Metadata = {
  title: "Kasuwa",
  description: "Kasuwa link simplified by online",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Provider>
          {children}
        </Provider>
      </body>
    </html>
  );
}
