import type { Metadata } from "next";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "NUCLIEX — SSDs & IT solutions engineered in India",
  description:
    "SATA and NVMe SSDs, computer hardware, and professional IT services from NUCLIEX INFOSYS, Pune. Clear warranty, real support.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN">
      <body>{children}</body>
    </html>
  );
}
