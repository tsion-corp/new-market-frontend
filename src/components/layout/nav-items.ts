import type { IconSource } from "@/components/ui/icon";

export type NavWeight = "medium" | "semibold";

export type NavGroup = "primary" | "trading" | "support";

type NavItem = {
  href: string;
  label: string;
  icon: IconSource;
  weight: NavWeight;
  group: NavGroup;
  trailing?: IconSource;
};

type BottomNavItem = {
  href: string;
  label: string;
  icon: IconSource;
};

export const SIDEBAR_ITEMS: readonly NavItem[] = [
  {
    href: "/home",
    label: "Home",
    icon: { src: "/icons/nav-home.svg", width: 24.485, height: 22.631 },
    weight: "semibold",
    group: "primary",
  },
  {
    href: "/games",
    label: "Games",
    icon: { src: "/icons/nav-games.svg", width: 25.18, height: 23.698 },
    weight: "semibold",
    group: "primary",
  },
  {
    href: "/payments",
    label: "Payments",
    icon: { src: "/icons/nav-payments.svg", width: 25.874, height: 25.874 },
    weight: "semibold",
    group: "primary",
  },
  {
    href: "/predictions",
    label: "Predictions",
    icon: { src: "/icons/nav-predictions.svg", width: 25.874, height: 25.874 },
    weight: "semibold",
    group: "primary",
  },
  {
    href: "/portfolio",
    label: "Portfolio",
    icon: { src: "/icons/nav-portfolio.svg", width: 25.874, height: 25.874 },
    weight: "semibold",
    group: "primary",
  },
  {
    href: "/trading",
    label: "Trading",
    icon: { src: "/icons/nav-trading.svg", width: 25.874, height: 25.874 },
    weight: "semibold",
    group: "trading",
    trailing: { src: "/icons/chevron-down.svg", width: 18.908, height: 18.908 },
  },
  {
    href: "/help",
    label: "Help",
    icon: { src: "/icons/nav-help.svg", width: 25.874, height: 25.874 },
    weight: "medium",
    group: "support",
  },
  {
    href: "/settings",
    label: "Settings",
    icon: { src: "/icons/nav-settings.svg", width: 25.874, height: 25.874 },
    weight: "medium",
    group: "support",
  },
];

export const BOTTOM_NAV_ITEMS: readonly BottomNavItem[] = [
  {
    href: "/home",
    label: "Home",
    icon: { src: "/icons/bottom-nav-home.svg", width: 22.72, height: 21 },
  },
  {
    href: "/payments",
    label: "Payments",
    icon: { src: "/icons/bottom-nav-payments.svg", width: 21.055, height: 21 },
  },
  {
    href: "/games",
    label: "Games",
    icon: { src: "/icons/bottom-nav-games.svg", width: 22.313, height: 21 },
  },
  {
    href: "/predictions",
    label: "Predictions",
    icon: { src: "/icons/bottom-nav-predictions.svg", width: 20.808, height: 21 },
  },
  {
    href: "/profile",
    label: "Profile",
    icon: { src: "/icons/bottom-nav-profile.svg", width: 18.823, height: 21 },
  },
];
