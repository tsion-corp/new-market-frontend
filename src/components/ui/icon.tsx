import Image from "next/image";
import { cn } from "@/lib/utils";

export type IconSource = { src: string; width: number; height: number };

interface IconProps extends IconSource {
  className?: string;
}

export function Icon({ src, width, height, className }: IconProps) {
  return (
    <Image
      src={src}
      width={width}
      height={height}
      alt=""
      className={cn("pointer-events-none shrink-0", className)}
    />
  );
}
