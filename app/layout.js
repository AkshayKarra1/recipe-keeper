import { Roboto, Balthazar } from "next/font/google";
import "../styles/global.css";

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

const inter = Balthazar({ subsets: ["latin"], weight: ["400"] });

export const metadata = {
  title: "Recipe Keeper",
  description: "One stop shop for all hunger needs...",
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="main">
          <div className="gradient" />
        </div>
        <main className="app">{children}</main>
      </body>
    </html>
  );
}
