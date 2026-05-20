import type { Metadata, Viewport } from "next";
import { Bebas_Neue, Inter_Tight, JetBrains_Mono } from "next/font/google";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#0b0b0f",
  width: "device-width",
  initialScale: 1,
};

const bebas = Bebas_Neue({
  weight: "400",
  variable: "--font-bebas",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ShipFlix — Streaming production-grade AI",
  description:
    "A binge-worthy portfolio of shipped GenAI: agents, RAG, MCP, multi-agent, compliance — by Venkata Surendra Reddy G.",
  metadataBase: new URL("https://shipflix.vercel.app"),
  openGraph: {
    title: "ShipFlix — Streaming production-grade AI",
    description:
      "6 shipped GenAI projects. 4 personas. Token-aware engineering. Built by Surendra.",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${bebas.variable} ${inter.variable} ${jetbrains.variable}`}
    >
      <body className="grain min-h-screen bg-bg text-text">{children}</body>
    </html>
  );
}
