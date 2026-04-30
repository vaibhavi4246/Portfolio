import type { Metadata } from "next";
import { Geist, Geist_Mono, Bebas_Neue, Syne } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-neue",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vaibhavi Jain — Portfolio",
  description:
    "AI/ML Developer & App Engineer. B.Tech Computer Engineering at Thapar Institute (2023–2027). Building intelligent systems, one commit at a time.",
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
  },
  openGraph: {
    title: "Vaibhavi Jain — Portfolio",
    description: "AI/ML Developer & App Engineer",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${bebasNeue.variable} ${syne.variable} h-full`}
    >
      <body className="h-full overflow-hidden bg-vscode-bg text-vscode-text antialiased">
        {children}
      </body>
    </html>
  );
}
