import type { Metadata, Viewport } from "next";
import { Funnel_Display, Funnel_Sans, Mona_Sans } from "next/font/google";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import "./globals.css";

const funnelDisplay = Funnel_Display({
  subsets: ["latin"],
  weight: "variable",
  display: "swap",
  variable: "--font-funnel-display",
});

const monaSans = Mona_Sans({
  subsets: ["latin"],
  weight: "600",
  display: "swap",
  preload: false,
  variable: "--font-mona-sans",
});

const funnelSans = Funnel_Sans({
  subsets: ["latin"],
  weight: "500",
  display: "swap",
  preload: false,
  variable: "--font-funnel-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: siteConfig.name, template: `%s | ${siteConfig.name}` },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
    url: "/",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#050606",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full antialiased",
        funnelDisplay.variable,
        monaSans.variable,
        funnelSans.variable
      )}
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
