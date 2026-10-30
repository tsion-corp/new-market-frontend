import { cva } from "class-variance-authority";
import Image from "next/image";
import { cn } from "@/lib/utils";

const avatarVariants = cva("flex shrink-0 items-center justify-center overflow-clip rounded-full", {
  variants: {
    size: {
      md: "size-11",
      lg: "size-12",
    },
    ring: {
      true: "band-ring band-ring-avatar",
      false: "",
    },
  },
  compoundVariants: [
    { size: "md", ring: true, className: "[--band-ring-width:1.6px]" },
    { size: "lg", ring: true, className: "[--band-ring-width:1.403px]" },
  ],
});

const layerVariants = cva("relative shrink-0 translate-y-[14.64%]", {
  variants: {
    size: {
      md: "h-[62.573px] w-[40.408px]",
      lg: "h-[78.77px] w-[50.868px]",
    },
  },
});

const LAYER_SIZES = { md: "41px", lg: "51px" } as const;

export interface AvatarProps {
  src: string;
  alt: string;
  size: "md" | "lg";
  ring?: boolean;
  className?: string;
}

export function Avatar({ src, alt, size, ring = false, className }: AvatarProps) {
  return (
    <span className={cn(avatarVariants({ size, ring }), className)}>
      <span className={layerVariants({ size })}>
        <Image src={src} alt={alt} fill sizes={LAYER_SIZES[size]} className="object-cover" />
      </span>
    </span>
  );
}
