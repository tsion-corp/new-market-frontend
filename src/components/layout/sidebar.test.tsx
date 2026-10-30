import { render, screen, within } from "@testing-library/react";
import { usePathname } from "next/navigation";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { siteConfig } from "@/config/site";
import { Sidebar } from "./sidebar";

vi.mock("next/navigation", () => ({ usePathname: vi.fn() }));

const ROUTES = [
  ["Home", "/home"],
  ["Games", "/games"],
  ["Payments", "/payments"],
  ["Predictions", "/predictions"],
  ["Portfolio", "/portfolio"],
  ["Trading", "/trading"],
  ["Help", "/help"],
  ["Settings", "/settings"],
] as const;

describe("Sidebar", () => {
  beforeEach(() => {
    vi.mocked(usePathname).mockReturnValue("/home");
  });

  it("is a labelled navigation landmark", () => {
    render(<Sidebar />);
    expect(screen.getByRole("navigation", { name: "Main" })).toBeInTheDocument();
  });

  it("links every item to its route in the drawn order", () => {
    render(<Sidebar />);
    const links = within(screen.getByRole("navigation", { name: "Main" })).getAllByRole("link");
    expect(links.map((link) => [link.textContent, link.getAttribute("href")])).toEqual(ROUTES);
  });

  it("marks only the current route", () => {
    vi.mocked(usePathname).mockReturnValue("/payments");
    render(<Sidebar />);
    expect(screen.getByRole("link", { name: "Payments" })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("link", { name: "Home" })).not.toHaveAttribute("aria-current");
  });

  it("shows the logo linking home", () => {
    render(<Sidebar />);
    expect(screen.getByRole("link", { name: siteConfig.name })).toHaveAttribute("href", "/home");
  });
});
