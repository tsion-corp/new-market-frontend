import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { receivedTransaction, sentTransaction } from "./test-data";
import { TransactionRow } from "./transaction-row";

function renderRow(transaction = sentTransaction) {
  return render(
    <ul>
      <TransactionRow transaction={transaction} />
    </ul>
  );
}

describe("TransactionRow", () => {
  it("shows the title, counterparty and formatted amount", () => {
    renderRow(receivedTransaction);
    const row = screen.getByRole("listitem");
    expect(within(row).getByText("Received Money")).toBeInTheDocument();
    expect(within(row).getByText("Last Man Standing")).toBeInTheDocument();
    expect(within(row).getByText("$1,234.56")).toBeInTheDocument();
  });

  it("draws the send icon for an icon visual", () => {
    const { container } = renderRow();
    const icon = container.querySelector("img");
    expect(icon?.getAttribute("src")).toContain("send.svg");
    expect(icon).not.toHaveClass("rotate-180");
  });

  it("draws the send icon turned around for a receive visual", () => {
    const { container } = renderRow({
      ...sentTransaction,
      visual: { kind: "icon", icon: "receive" },
    });
    expect(container.querySelector("img")).toHaveClass("rotate-180");
  });

  it("draws the counterparty image for an image visual", () => {
    const { container } = renderRow(receivedTransaction);
    const image = container.querySelector("img");
    expect(image?.getAttribute("src")).toContain("transaction-avatar.avif");
    expect(image).toHaveAttribute("loading", "lazy");
  });
});
