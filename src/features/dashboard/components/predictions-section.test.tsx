import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { stubIntersectionObserver } from "./observer-stub";
import { PredictionsSection } from "./predictions-section";
import { market } from "./test-data";

stubIntersectionObserver();

describe("PredictionsSection", () => {
  it("is a carousel of prediction cards named Stake your opinions", () => {
    render(<PredictionsSection markets={[market, { ...market, id: "market-2" }]} />);
    const region = screen.getByRole("region", { name: "Stake your opinions" });
    expect(
      within(region).getByRole("heading", { level: 2, name: "Stake your opinions" })
    ).toBeInTheDocument();
    expect(within(region).getAllByRole("link", { name: "Yes 62¢" })).toHaveLength(2);
  });

  it("starts with Previous disabled", () => {
    render(<PredictionsSection markets={[market]} />);
    expect(screen.getByRole("button", { name: "Previous" })).toBeDisabled();
  });

  it("shows an empty state inside the same panel when there are no markets", () => {
    render(<PredictionsSection markets={[]} />);
    expect(
      screen.getByRole("heading", { level: 2, name: "Stake your opinions" })
    ).toBeInTheDocument();
    expect(screen.getByText("No markets right now")).toHaveClass("text-muted-foreground");
    expect(screen.queryByRole("button", { name: "Next" })).not.toBeInTheDocument();
  });

  it("lets slides run to both edges while scrolling, with a 20 px (mobile) or 24 px (desktop) gap at rest and at the end", () => {
    render(<PredictionsSection markets={[market]} />);
    const id = screen.getByRole("button", { name: "Next" }).getAttribute("aria-controls");
    const viewport = id ? document.getElementById(id) : null;
    expect(viewport).toHaveClass(
      "-mx-5",
      "px-5",
      "scroll-px-5",
      "xl:-mx-6",
      "xl:px-6",
      "xl:scroll-px-6"
    );
  });
});
