import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { GamesSection } from "./games-section";
import { stubIntersectionObserver } from "./observer-stub";
import { game } from "./test-data";

stubIntersectionObserver();

describe("GamesSection", () => {
  it("is a carousel of game cards named Trending Games", () => {
    render(<GamesSection games={[game, { ...game, id: "game-2" }]} />);
    const region = screen.getByRole("region", { name: "Trending Games" });
    expect(within(region).getAllByRole("link", { name: "Play Now" })).toHaveLength(2);
  });

  it("titles the section Games on mobile and Trending Games on desktop", () => {
    render(<GamesSection games={[game]} />);
    const heading = screen.getByRole("heading", { level: 2, name: "Trending Games" });
    expect(within(heading).getByText("Trending")).toHaveClass("hidden", "xl:inline");
  });

  it("starts with Previous disabled", () => {
    render(<GamesSection games={[game]} />);
    expect(screen.getByRole("button", { name: "Previous" })).toBeDisabled();
  });

  it("shows an empty state inside the same panel when there are no games", () => {
    render(<GamesSection games={[]} />);
    expect(screen.getByRole("heading", { level: 2, name: "Trending Games" })).toBeInTheDocument();
    expect(screen.getByText("No games right now")).toHaveClass("text-muted-foreground");
  });

  it("lets slides run to both edges while scrolling, with a 20 px (mobile) or 24 px (desktop) gap at rest and at the end", () => {
    render(<GamesSection games={[game]} />);
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
