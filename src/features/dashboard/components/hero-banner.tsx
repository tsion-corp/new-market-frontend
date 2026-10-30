import Image from "next/image";
import { cn } from "@/lib/utils";

export interface HeroBannerProps {
  className?: string;
}

export function HeroBanner({ className }: HeroBannerProps) {
  return (
    <section className={cn("relative h-[228px] overflow-clip rounded-panel bg-surface", className)}>
      <div className="absolute top-[-300px] left-[-58px] h-[1225px] w-[max(919px,calc(100%+58px))] opacity-25">
        <Image
          src="/images/dashboard/hero-texture.avif"
          width={1080}
          height={1440}
          alt=""
          className="size-full max-w-none object-cover"
        />
        <div className="absolute inset-0 bg-(image:--gradient-hero-scrim)" />
      </div>
      <Image
        src="/images/dashboard/hero-glow.svg"
        width={1222}
        height={450}
        alt=""
        className="pointer-events-none absolute top-[-190px] left-[calc(50%-611px)] h-[450px] w-[1222px] max-w-none"
      />
      <Image
        src="/images/dashboard/hero-globe.avif"
        width={779}
        height={584}
        alt=""
        className="absolute top-5 right-[-97.333px] h-[292px] w-[389.333px] max-w-none object-cover"
      />
      <div className="absolute top-1/2 left-[37px] flex w-[427px] -translate-y-1/2 flex-col gap-3 font-semibold">
        <h2 className="w-[360px] text-hero-title text-foreground">
          Your Money, More Possibilities
        </h2>
        <p className="text-hero-subtitle text-foreground-subtle">
          Crypto, global payments, games and predictions.
          <br />
          All together on Market.
        </p>
      </div>
    </section>
  );
}
