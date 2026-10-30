import { render, screen, within } from "@testing-library/react";
import { usePathname } from "next/navigation";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { BottomNav } from "./bottom-nav";

vi.mock("next/navigation", () => ({ usePathname: vi.fn() }));

const ROUTES = [
  ["Home", "/home"],
  ["Payments", "/payments"],
  ["Games", "/games"],
  ["Predictions", "/predictions"],
  ["Profile", "/profile"],
] as const;

describe("BottomNav", () => {
  beforeEach(() => {
    vi.mocked(usePathname).mockReturnValue("/home");
  });

  it("is a navigation landmark with its own label", () => {
    render(<BottomNav />);
    expect(screen.getByRole("navigation", { name: "Quick" })).toBeInTheDocument();
  });

  it("links every item to its route in the drawn order", () => {
    render(<BottomNav />);
    const links = within(screen.getByRole("navigation", { name: "Quick" })).getAllByRole("link");
    expect(links.map((link) => [link.textContent, link.getAttribute("href")])).toEqual(ROUTES);
  });

  it("marks only the current route", () => {
    vi.mocked(usePathname).mockReturnValue("/profile");
    render(<BottomNav />);
    expect(screen.getByRole("link", { name: "Profile" })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("link", { name: "Home" })).not.toHaveAttribute("aria-current");
  });
});
