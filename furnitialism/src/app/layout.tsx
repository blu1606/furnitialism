import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Furnitialism - 3D Interior Design & AI Furniture Shop",
  description: "Experience the future of furniture with Furnitialism's immersive 3D technology and AI-driven interior simulations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&display=block"
        />
      </head>
      <body className="antialiased bg-background-light text-stone-900">
        {children}
      </body>
    </html>
  );
}
