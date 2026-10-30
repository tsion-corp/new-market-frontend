import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { siteConfig } from "@/config/site";
import { Logo } from "./logo";

describe("Logo", () => {
  it("links home and is named after the site", () => {
    render(<Logo />);
    expect(screen.getByRole("link", { name: siteConfig.name })).toHaveAttribute("href", "/home");
  });

  it("uses the full logo by default", () => {
    render(<Logo />);
    expect(screen.getByRole("img", { name: siteConfig.name })).toHaveAttribute(
      "src",
      "/images/brand/logo.svg"
    );
  });

  it("uses the compact logo when asked", () => {
    render(<Logo variant="compact" />);
    expect(screen.getByRole("img", { name: siteConfig.name })).toHaveAttribute(
      "src",
      "/images/brand/logo-compact.svg"
    );
  });

  it.each(["full", "compact"] as const)(
    "loads the %s logo eagerly because it sits above the fold on every page",
    (variant) => {
      render(<Logo variant={variant} />);
      const logo = screen.getByRole("img", { name: siteConfig.name });
      expect(logo).toHaveAttribute("loading", "eager");
      expect(logo).not.toHaveAttribute("fetchpriority", "high");
    }
  );
});
