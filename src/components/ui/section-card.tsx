import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export function SectionCard({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3 xl:gap-6 xl:overflow-clip xl:rounded-section xl:bg-surface xl:p-6",
        className
      )}
      {...props}
    />
  );
}
