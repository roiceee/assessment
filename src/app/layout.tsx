import Auth0ContextProvider from "@/components/Auth0ContextProvider";
import Navbar from "@/components/navbar";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Assessment website",
  description: "Assessment website with login/signup functionality",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="night">
      <Auth0ContextProvider>
        <body>
          <Navbar />
          {children}
        </body>
      </Auth0ContextProvider>
    </html>
  );
}
