import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { DashboardSkeleton } from "./dashboard-skeleton";

describe("DashboardSkeleton", () => {
  it("announces that the dashboard is loading", () => {
    render(<DashboardSkeleton />);
    expect(screen.getByRole("status")).toHaveTextContent("Loading your dashboard");
  });

  it("reserves the same boxes as the loaded dashboard without animation", () => {
    const { container } = render(<DashboardSkeleton />);
    const blocks = Array.from(container.querySelectorAll('[data-slot="skeleton"]'));
    expect(blocks.map((block) => block.getAttribute("data-box"))).toEqual([
      "hero",
      "balance-card",
      "transactions",
      "predictions",
      "games",
    ]);
    expect(container.querySelector('[data-box="hero"]')).toHaveClass("xl:h-[228px]");
    expect(container.querySelector('[data-box="balance-card"]')).toHaveClass(
      "h-[301px]",
      "xl:h-[273px]"
    );
    expect(container.querySelector('[data-box="transactions"]')).toHaveClass(
      "h-[274px]",
      "xl:h-[367.264px]"
    );
    expect(container.querySelector('[data-box="predictions"]')).toHaveClass(
      "h-[328.78px]",
      "xl:h-[459.882px]"
    );
    expect(container.querySelector('[data-box="games"]')).toHaveClass(
      "h-[345.295px]",
      "xl:h-[486.145px]"
    );
    for (const block of blocks) expect(block.className).not.toMatch(/animate/);
  });
});
