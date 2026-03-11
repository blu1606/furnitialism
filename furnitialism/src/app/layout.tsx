import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Furnitialism - 3D Interior Design",
  description: "Experience interiors like never before with Furnitialism's immersive 3D technology and AI-driven simulations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&display=block"
        />
      </head>
      <body className="antialiased bg-background-light dark:bg-background-dark text-stone-900 dark:text-white">
        {children}
      </body>
    </html>
  );
}
