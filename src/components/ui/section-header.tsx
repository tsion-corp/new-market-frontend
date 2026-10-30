import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface SectionHeaderProps {
  title: ReactNode;
  level?: 2 | 3;
  controls?: ReactNode;
  className?: string;
}

export function SectionHeader({ title, level = 2, controls, className }: SectionHeaderProps) {
  const Heading = level === 3 ? "h3" : "h2";
  return (
    <div
      className={cn(
        "flex w-[calc(100%+5px)] items-center justify-between xl:h-10 xl:w-full xl:px-3",
        className
      )}
    >
      <Heading className="text-section-title-mobile font-semibold text-foreground xl:text-section-title">
        {title}
      </Heading>
      {controls}
    </div>
  );
}
