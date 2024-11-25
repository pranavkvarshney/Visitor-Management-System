
import { LoginProvider } from '@/app/components/contexts/LoginContext'
import ChatWidget from './components/ChatWidget';
import { Inter } from "next/font/google";
import Footer from "./components/Footer";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "V🚶‍➡️Z i T O R",
  description: "Generated for cool developers",
};

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body className={inter.className}>
        <LoginProvider>
          {children}
          <ChatWidget />
        </LoginProvider>
        <Footer />
      </body>
    </html>
  );
}
