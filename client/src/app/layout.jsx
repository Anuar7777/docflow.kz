import "../styles/globals.css";
import { Montserrat_Alternates } from "next/font/google";

export const metadata = {
  title: "DocFlow - easily work with your documents",
  description: "For Diploma Work",
};

const montserrat = Montserrat_Alternates({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={montserrat.className}>{children}</body>
    </html>
  );
}
