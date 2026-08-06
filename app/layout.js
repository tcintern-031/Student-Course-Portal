import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Student Course Portal",
  description: "A modern learning platform built with Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-gray-100">
        <Navbar />

        <main className="container mx-auto px-6 py-8 flex-grow">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}