"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon, type IconSource } from "@/components/ui/icon";
import { MaskedIcon } from "@/components/ui/masked-icon";
import { cn } from "@/lib/utils";
import type { NavWeight } from "./nav-items";

type NavLinkProps = {
  href: string;
  label: string;
  icon: IconSource;
  weight?: NavWeight;
  trailing?: IconSource;
  variant?: "sidebar" | "bar";
};

function isCurrentRoute(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function NavLink({
  href,
  label,
  icon,
  weight = "semibold",
  trailing,
  variant = "sidebar",
}: NavLinkProps) {
  const pathname = usePathname();
  const isCurrent = isCurrentRoute(pathname, href);

  if (variant === "bar") {
    return (
      <Link
        href={href}
        aria-current={isCurrent ? "page" : undefined}
        className={cn(
          "flex flex-col items-center justify-center",
          isCurrent ? "p-[13.481px]" : "p-[13.176px]"
        )}
      >
        <span
          className={cn(
            "flex flex-col items-center gap-1",
            isCurrent ? "w-[29.037px]" : "w-[29.647px]"
          )}
        >
          <MaskedIcon
            {...icon}
            className={isCurrent ? "bg-(image:--gradient-nav-active)" : "bg-nav-inactive"}
          />
          <span
            className={cn(
              "font-funnel-sans text-bottom-nav font-medium whitespace-nowrap",
              isCurrent ? "text-foreground" : "text-nav-inactive"
            )}
          >
            {label}
          </span>
        </span>
      </Link>
    );
  }

  return (
    <Link
      href={href}
      aria-current={isCurrent ? "page" : undefined}
      className={cn(
        "flex h-[61.7px] w-[205.999px] items-center gap-[20.898px] overflow-clip px-[20.898px] text-foreground transition-colors hover:bg-surface-active",
        isCurrent ? "rounded-nav-item-active bg-surface-active" : "rounded-nav-item"
      )}
    >
      <MaskedIcon
        {...icon}
        className={isCurrent ? "bg-(image:--gradient-nav-active)" : "bg-foreground"}
      />
      <span
        className={cn("flex-1 text-nav", weight === "medium" ? "font-medium" : "font-semibold")}
      >
        {label}
      </span>
      {trailing ? <Icon {...trailing} /> : null}
    </Link>
  );
}
