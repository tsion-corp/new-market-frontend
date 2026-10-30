import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SectionCard } from "./section-card";

describe("SectionCard", () => {
  it("is a plain column on mobile and the rounded surface panel on desktop", () => {
    render(<SectionCard>Trending Games</SectionCard>);
    expect(screen.getByText("Trending Games")).toHaveClass(
      "flex",
      "flex-col",
      "gap-3",
      "xl:rounded-section",
      "xl:bg-surface",
      "xl:p-6",
      "xl:gap-6"
    );
  });
});
