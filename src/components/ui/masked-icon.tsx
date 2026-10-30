import { cn } from "@/lib/utils";
import type { IconSource } from "./icon";

interface MaskedIconProps extends IconSource {
  className?: string;
}

export function MaskedIcon({ src, width, height, className }: MaskedIconProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "pointer-events-none block shrink-0 [mask-size:100%_100%] [mask-position:center] [mask-repeat:no-repeat]",
        className
      )}
      style={{ width, height, maskImage: `url("${src}")` }}
    />
  );
}
