import { cn } from "@/lib/utils";
import { BOTTOM_NAV_ITEMS } from "./nav-items";
import { NavLink } from "./nav-link";

type BottomNavProps = {
  className?: string;
};

export function BottomNav({ className }: BottomNavProps) {
  return (
    <nav
      aria-label="Quick"
      className={cn(
        "fixed inset-x-0 bottom-0 z-10 bg-surface-bar pb-[env(safe-area-inset-bottom)]",
        className
      )}
    >
      <div className="relative h-[75px]">
        <ul className="absolute top-[calc(50%-0.5px)] left-1/2 flex -translate-x-1/2 -translate-y-1/2 items-end gap-6">
          {BOTTOM_NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <NavLink href={item.href} label={item.label} icon={item.icon} variant="bar" />
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
