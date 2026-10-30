import Link from "next/link";
import type { ReactNode } from "react";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";

const ARROW_ICON = { src: "/icons/arrow-up-right.svg", width: 17.876, height: 17.876 };

export interface TextLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
}

export function TextLink({ href, children, className }: TextLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex shrink-0 items-center gap-[10.055px] text-action-link font-semibold text-foreground underline-offset-2 hover:underline",
        className
      )}
    >
      {children}
      <Icon {...ARROW_ICON} />
    </Link>
  );
}
