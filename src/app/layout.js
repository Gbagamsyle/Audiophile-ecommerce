import "../styles/global.css";
import { Manrope } from "next/font/google";
import ConvexClientProvider from "./ConvexClientProvider.jsx";
import Navbar from "../components/Navbar/Navbar.jsx";
import Footer from "../components/Footer";

export const metadata = {
  title: "Audiophile E-commerce",
  description: "High-quality audio equipment store",
};

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
  display: "swap",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={manrope.className}>
      <body className="has-hero">
        <ConvexClientProvider>
          <Navbar />
          {children}
          <Footer />
        </ConvexClientProvider>
      </body>
    </html>
  );
}
