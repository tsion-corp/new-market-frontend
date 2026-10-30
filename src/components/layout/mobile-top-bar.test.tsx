import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { siteConfig } from "@/config/site";
import { MobileTopBar } from "./mobile-top-bar";

describe("MobileTopBar", () => {
  it("is a banner landmark without a search field", () => {
    render(<MobileTopBar />);
    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.queryByPlaceholderText("Search Market")).not.toBeInTheDocument();
  });

  it("orders the avatar, the logo and the bell as drawn", () => {
    render(<MobileTopBar />);
    expect(screen.getAllByRole("link").map((link) => link.getAttribute("href"))).toEqual([
      "/profile",
      "/home",
      "/notifications",
    ]);
  });

  it("names each link", () => {
    render(<MobileTopBar />);
    expect(screen.getByRole("link", { name: "Your profile" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: siteConfig.name })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Notifications, unread" })).toBeInTheDocument();
  });

  it("uses the compact logo", () => {
    render(<MobileTopBar />);
    expect(screen.getByRole("img", { name: siteConfig.name })).toHaveAttribute(
      "src",
      "/images/brand/logo-compact.svg"
    );
  });
});
