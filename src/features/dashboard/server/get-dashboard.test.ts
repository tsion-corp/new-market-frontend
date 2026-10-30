import { describe, expect, it } from "vitest";
import { getDashboard } from "./get-dashboard";

describe("getDashboard", () => {
  it("returns the balance in base units", async () => {
    const dashboard = await getDashboard();
    expect(dashboard.balance).toEqual({ amount: 500087n, currency: "USD" });
  });

  it("returns seven transactions with bigint amounts", async () => {
    const { transactions } = await getDashboard();
    expect(transactions).toHaveLength(7);
    for (const transaction of transactions) {
      expect(typeof transaction.amount.amount).toBe("bigint");
    }
    expect(transactions.map((transaction) => transaction.title)).toEqual([
      "Sent Money",
      "Received Money",
      "Won Game",
      "Sent Money",
      "Sent Money",
      "Sent Money",
      "Sent Money",
    ]);
  });

  it("gives every transaction a unique id", async () => {
    const { transactions } = await getDashboard();
    expect(new Set(transactions.map((transaction) => transaction.id)).size).toBe(7);
  });

  it("returns the two prediction markets with prices in cents", async () => {
    const { markets } = await getDashboard();
    expect(markets.map((market) => [market.yesPrice, market.noPrice])).toEqual([
      [62n, 38n],
      [62n, 38n],
    ]);
  });

  it("returns three games", async () => {
    const { games } = await getDashboard();
    expect(games.map((game) => game.title)).toEqual(["Arkjet", "Arkjet", "Arkjet"]);
  });
});
