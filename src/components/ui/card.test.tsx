import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Card } from "./card";

describe("Card", () => {
  it("renders its children on the raised surface with the design radii", () => {
    render(<Card>Arkjet</Card>);
    expect(screen.getByText("Arkjet")).toHaveClass(
      "bg-surface-raised",
      "border-border",
      "rounded-card-mobile",
      "xl:rounded-card",
      "hover:border-edge-strong"
    );
  });

  it("merges a caller class", () => {
    render(<Card className="w-[350px]">Arkjet</Card>);
    expect(screen.getByText("Arkjet")).toHaveClass("w-[350px]");
  });
});
