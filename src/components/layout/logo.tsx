import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";

const LOGOS = {
  full: { src: "/images/brand/logo.svg", width: 138.455, height: 40.431 },
  compact: { src: "/images/brand/logo-compact.svg", width: 102.576, height: 36 },
} as const;

type LogoProps = {
  variant?: keyof typeof LOGOS;
};

export function Logo({ variant = "full" }: LogoProps) {
  const logo = LOGOS[variant];
  return (
    <Link href="/home" className="shrink-0">
      <Image
        src={logo.src}
        alt={siteConfig.name}
        width={logo.width}
        height={logo.height}
        loading="eager"
      />
    </Link>
  );
}
