import type { Metadata } from "next";
import "./globals.css";
import Provider from "../Provider";
import StoreProvider from "@/redux/storeProvider";
import InitUser from "@/InitUser";


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
          <StoreProvider>
            <InitUser/>
          {children}
          </StoreProvider>
        </Provider>
      </body>
    </html>
  );
}
