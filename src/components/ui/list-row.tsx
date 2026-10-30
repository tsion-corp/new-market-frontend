import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface ListRowProps {
  leading: ReactNode;
  title: ReactNode;
  subtitle: ReactNode;
  trailing: ReactNode;
  className?: string;
}

export function ListRow({ leading, title, subtitle, trailing, className }: ListRowProps) {
  return (
    <li className={cn("flex h-[42.939px] items-center justify-between gap-4", className)}>
      <div className="flex min-w-0 items-center gap-[16.138px]">
        <span className="flex size-[42.939px] shrink-0 items-center justify-center overflow-clip rounded-full border-[0.704px] border-edge-strong">
          {leading}
        </span>
        <span className="flex min-w-0 flex-col gap-[5.052px] leading-none font-bold">
          <span className="text-row-title text-foreground">{title}</span>
          <span className="text-row-caption text-muted-foreground">{subtitle}</span>
        </span>
      </div>
      <span className="shrink-0 text-row-amount font-bold text-muted-foreground">{trailing}</span>
    </li>
  );
}
