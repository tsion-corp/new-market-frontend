import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { DashboardView } from "./dashboard-view";
import { stubIntersectionObserver } from "./observer-stub";
import { game, market, receivedTransaction, sentTransaction } from "./test-data";

stubIntersectionObserver();

describe("DashboardView", () => {
  it("composes the hero, balance, transactions, predictions and games", () => {
    render(
      <DashboardView
        dashboard={{
          balance: { amount: 500087n, currency: "USD" },
          transactions: [sentTransaction, receivedTransaction],
          markets: [market],
          games: [game],
        }}
      />
    );
    expect(
      screen.getByRole("heading", { name: "Your Money, More Possibilities" })
    ).toBeInTheDocument();
    expect(screen.getByText("$5,000.87")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Recent transactions" })).toBeInTheDocument();
    expect(screen.getByRole("region", { name: "Stake your opinions" })).toBeInTheDocument();
    expect(screen.getByRole("region", { name: "Trending Games" })).toBeInTheDocument();
  });

  it("pins the wallet panel below the header on desktop while the rest scrolls", () => {
    render(
      <DashboardView
        dashboard={{
          balance: { amount: 500087n, currency: "USD" },
          transactions: [sentTransaction],
          markets: [market],
          games: [game],
        }}
      />
    );
    const balance = screen.getByText("$5,000.87");
    const panel = screen
      .getByRole("heading", { name: "Recent transactions" })
      .closest(".xl\\:sticky");
    expect(panel).toHaveClass("xl:top-[103.554px]", "xl:pb-[25.446px]");
    expect(panel).not.toHaveClass("xl:h-[845.911px]");
    expect(panel).toContainElement(balance);
  });

  it("shows every empty state when the lists are empty", () => {
    render(
      <DashboardView
        dashboard={{
          balance: { amount: 0n, currency: "USD" },
          transactions: [],
          markets: [],
          games: [],
        }}
      />
    );
    expect(screen.getByText("$0")).toBeInTheDocument();
    expect(screen.getByText("No transactions yet")).toBeInTheDocument();
    expect(screen.getByText("No markets right now")).toBeInTheDocument();
    expect(screen.getByText("No games right now")).toBeInTheDocument();
  });

  it("keeps the wallet panel at the drawn 403.455 px up to 1440 px and grows it to at most 480 px on wider screens", () => {
    const { container } = render(
      <DashboardView
        dashboard={{
          balance: { amount: 500087n, currency: "USD" },
          transactions: [sentTransaction],
          markets: [market],
          games: [game],
        }}
      />
    );
    expect(container.firstElementChild).toHaveClass(
      "xl:grid-cols-[minmax(0,1fr)_clamp(403.455px,calc(403.455px_+_(100vw_-_1440px)_*_0.25),480px)]"
    );
    const card = screen.getByText("$5,000.87").closest(".relative");
    expect(card).not.toHaveClass("xl:w-[352px]");
  });
});
