import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { receivedTransaction, sentTransaction } from "./test-data";
import { TransactionList } from "./transaction-list";

const seven = Array.from({ length: 7 }, (_, index) => ({
  ...sentTransaction,
  id: `transaction-${index}`,
  title: `Transaction ${index + 1}`,
}));

describe("TransactionList", () => {
  it("is headed Recent transactions with a View all link to transactions", () => {
    render(<TransactionList transactions={[sentTransaction]} />);
    expect(
      screen.getByRole("heading", { level: 2, name: "Recent transactions" })
    ).toHaveTextContent("Recent transactions", { normalizeWhitespace: false });
    expect(screen.getByRole("link", { name: "View all" })).toHaveAttribute("href", "/transactions");
  });

  it("renders a row for every transaction", () => {
    render(<TransactionList transactions={[sentTransaction, receivedTransaction]} />);
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
    expect(screen.getByText("Sent Money")).toBeInTheDocument();
    expect(screen.getByText("Received Money")).toBeInTheDocument();
    expect(screen.getByText("$4,500")).toBeInTheDocument();
  });

  it("shows the five most recent transactions, and only the first three below the desktop breakpoint", () => {
    render(<TransactionList transactions={seven} />);
    const rows = screen.getAllByRole("listitem");
    expect(rows).toHaveLength(5);
    expect(screen.getByText("Transaction 5")).toBeInTheDocument();
    expect(screen.queryByText("Transaction 6")).not.toBeInTheDocument();
    for (const row of rows.slice(0, 3)) expect(row).not.toHaveClass("max-xl:hidden");
    for (const row of rows.slice(3)) expect(row).toHaveClass("max-xl:hidden");
  });

  it("shows an empty state when there are no transactions", () => {
    render(<TransactionList transactions={[]} />);
    expect(screen.getByText("No transactions yet")).toHaveClass("text-muted-foreground");
    expect(screen.queryByRole("list")).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: "View all" })).toBeInTheDocument();
  });
});
