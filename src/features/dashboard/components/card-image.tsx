import Image from "next/image";
import { cn } from "@/lib/utils";
import type { ImageAsset } from "../types";

export interface CardImageProps {
  image: ImageAsset;
  className?: string;
}

export function CardImage({ image, className }: CardImageProps) {
  const { objectPosition } = image;
  return (
    <div
      className={cn(
        "h-[131.381px] w-full shrink-0 overflow-clip rounded-card-media-mobile xl:h-[165px] xl:rounded-card-media",
        className
      )}
    >
      <Image
        src={image.src}
        width={image.width}
        height={image.height}
        alt={image.alt}
        className="size-full object-cover"
        style={
          objectPosition
            ? { objectPosition: `${objectPosition.x}% ${objectPosition.y}%` }
            : undefined
        }
      />
    </div>
  );
}
