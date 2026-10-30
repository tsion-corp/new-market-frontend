import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export function Card({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "rounded-card-mobile border-[1.051px] border-border bg-surface-raised p-[9.651px] transition-colors hover:border-edge-strong xl:rounded-card xl:border-[1.32px] xl:p-[12.121px]",
        className
      )}
      {...props}
    />
  );
}
