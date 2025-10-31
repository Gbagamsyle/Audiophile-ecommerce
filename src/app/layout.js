import "../styles/global.css";
import ConvexClientProvider from "./ConvexClientProvider.jsx";

export const metadata = {
  title: "Audiophile E-commerce",
  description: "High-quality audio equipment store",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ConvexClientProvider>
          {children}
        </ConvexClientProvider>
      </body>
    </html>
  );
}
