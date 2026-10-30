import { cn } from "@/lib/utils";
import { Logo } from "./logo";
import type { NavGroup } from "./nav-items";
import { SIDEBAR_ITEMS } from "./nav-items";
import { NavLink } from "./nav-link";

const GROUPS: Record<NavGroup, string> = {
  primary: "pt-[34.831px]",
  trading: "mt-[15.923px] border-t-[0.995px] border-divider pt-[8.956px]",
  support: "flex-1 justify-end",
};

type SidebarProps = {
  className?: string;
};

export function Sidebar({ className }: SidebarProps) {
  return (
    <div
      className={cn(
        "sticky top-0 h-dvh w-[237.844px] shrink-0 flex-col overflow-y-auto border-r-[0.995px] border-edge-faint bg-surface px-[15.923px] pt-[38.811px] pb-[37.816px]",
        className
      )}
    >
      <Logo />
      <nav aria-label="Main" className="flex w-[205.999px] flex-1 flex-col">
        {Object.entries(GROUPS).map(([group, groupClassName]) => (
          <ul key={group} className={cn("flex flex-col gap-1", groupClassName)}>
            {SIDEBAR_ITEMS.filter((item) => item.group === group).map((item) => (
              <li key={item.href}>
                <NavLink
                  href={item.href}
                  label={item.label}
                  icon={item.icon}
                  weight={item.weight}
                  trailing={item.trailing}
                />
              </li>
            ))}
          </ul>
        ))}
      </nav>
    </div>
  );
}
