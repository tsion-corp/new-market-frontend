import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Header } from "./header";

describe("Header", () => {
  it("is a banner landmark", () => {
    render(<Header />);
    expect(screen.getByRole("banner")).toBeInTheDocument();
  });

  it("stays pinned to the top over the page background while the page scrolls", () => {
    render(<Header />);
    expect(screen.getByRole("banner")).toHaveClass("sticky", "top-0", "z-10", "bg-background");
  });

  it("searches the market with a GET form to /search", () => {
    render(<Header />);
    const input = screen.getByPlaceholderText("Search Market");
    expect(input).toHaveAttribute("name", "q");
    const form = input.closest("form");
    expect(form).toHaveAttribute("action", "/search");
    expect(form?.getAttribute("method") ?? "get").toBe("get");
  });

  it("links the bell to notifications", () => {
    render(<Header />);
    expect(screen.getByRole("link", { name: "Notifications, unread" })).toHaveAttribute(
      "href",
      "/notifications"
    );
  });

  it("links the avatar to the profile", () => {
    render(<Header />);
    expect(screen.getByRole("link", { name: "Your profile" })).toHaveAttribute("href", "/profile");
  });
});
