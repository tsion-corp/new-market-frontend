import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { PredictionCard } from "./prediction-card";
import { market } from "./test-data";

describe("PredictionCard", () => {
  it("shows the question as a heading with the market image", () => {
    render(<PredictionCard market={market} />);
    expect(
      screen.getByRole("heading", { level: 3, name: "Will Tacha post tomorrow by 2PM?" })
    ).toBeInTheDocument();
    const image = screen.getByRole("img", { name: "Tacha posing in a blue dress" });
    expect(image).toHaveAttribute("loading", "lazy");
    expect(image).toHaveStyle({ objectPosition: "50% 28.773%" });
  });

  it("links the Yes and No prices to predictions, described by the question", () => {
    render(<PredictionCard market={market} />);
    const yes = screen.getByRole("link", { name: "Yes 62¢" });
    const no = screen.getByRole("link", { name: "No 38¢" });
    expect(yes).toHaveAttribute("href", "/predictions");
    expect(no).toHaveAttribute("href", "/predictions");
    expect(yes).toHaveAccessibleDescription("Will Tacha post tomorrow by 2PM?");
    expect(no).toHaveAccessibleDescription("Will Tacha post tomorrow by 2PM?");
  });

  it("links the question to predictions", () => {
    render(<PredictionCard market={market} />);
    expect(screen.getByRole("link", { name: "Will Tacha post tomorrow by 2PM?" })).toHaveAttribute(
      "href",
      "/predictions"
    );
  });

  it("centres an image without a focal point", () => {
    const image = { ...market.image, objectPosition: undefined };
    render(<PredictionCard market={{ ...market, image }} />);
    const style = screen.getByRole("img", { name: "Tacha posing in a blue dress" }).style;
    expect(style.objectPosition).toBe("");
  });
});
