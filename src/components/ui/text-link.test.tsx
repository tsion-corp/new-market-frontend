import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { TextLink } from "./text-link";

describe("TextLink", () => {
  it("links to its href with a decorative arrow", () => {
    const { container } = render(<TextLink href="/transactions">View all</TextLink>);
    const link = screen.getByRole("link", { name: "View all" });
    expect(link).toHaveAttribute("href", "/transactions");
    expect(link).toHaveClass("text-action-link", "hover:underline");
    expect(container.querySelector("img")).toHaveAttribute("alt", "");
  });
});
