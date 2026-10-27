import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { siteConfig } from "@/config/site";
import { Hero } from "./hero";

describe("Hero", () => {
  it("names the product as the page heading", () => {
    render(<Hero />);
    expect(screen.getByRole("heading", { level: 1, name: siteConfig.name })).toBeInTheDocument();
  });

  it("describes the product", () => {
    render(<Hero />);
    expect(screen.getByText(siteConfig.description)).toBeInTheDocument();
  });
});
