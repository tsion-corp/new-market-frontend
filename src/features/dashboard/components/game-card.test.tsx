import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { GameCard } from "./game-card";
import { game } from "./test-data";

describe("GameCard", () => {
  it("shows the title, description and cover", () => {
    render(<GameCard game={game} />);
    expect(screen.getByRole("heading", { level: 3, name: "Arkjet" })).toBeInTheDocument();
    expect(screen.getByText("Earn by flying airplanes to multipliers")).toBeInTheDocument();
    expect(
      screen.getByRole("img", { name: "Arkjet cover: a red plane above the Arkjet logo" })
    ).toHaveAttribute("loading", "lazy");
  });

  it("links Play Now to games, described by the game title", () => {
    render(<GameCard game={game} />);
    const play = screen.getByRole("link", { name: "Play Now" });
    expect(play).toHaveAttribute("href", "/games");
    expect(play).toHaveAccessibleDescription("Arkjet");
  });
});
