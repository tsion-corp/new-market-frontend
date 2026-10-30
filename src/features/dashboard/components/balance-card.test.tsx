import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { BalanceCard } from "./balance-card";

const balance = { amount: 500087n, currency: "USD" } as const;

describe("BalanceCard", () => {
  it("shows the formatted total balance", () => {
    render(<BalanceCard balance={balance} />);
    expect(screen.getByText("Total balance")).toBeInTheDocument();
    expect(screen.getByText("$5,000.87")).toBeInTheDocument();
  });

  it("hides and restores the balance with the eye button", () => {
    render(<BalanceCard balance={balance} />);
    fireEvent.click(screen.getByRole("button", { name: "Hide balance" }));
    expect(screen.queryByText("$5,000.87")).not.toBeInTheDocument();
    expect(screen.getByText("• • • • • •")).toBeInTheDocument();
    expect(screen.getByText("Balance hidden")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Show balance" }));
    expect(screen.getByText("$5,000.87")).toBeInTheDocument();
  });

  it("links Send and Receive to payments", () => {
    render(<BalanceCard balance={balance} />);
    expect(screen.getByRole("link", { name: "Send" })).toHaveAttribute("href", "/payments");
    expect(screen.getByRole("link", { name: "Receive" })).toHaveAttribute("href", "/payments");
  });

  it("renders the currency and tour controls as named, disabled buttons", () => {
    render(<BalanceCard balance={balance} />);
    expect(screen.getByRole("button", { name: "Display currency: USD" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Take a tour" })).toBeDisabled();
  });

  it("uses the mobile background by default and the desktop one at 1280 px", () => {
    const { container } = render(<BalanceCard balance={balance} />);
    const source = container.querySelector("picture source");
    expect(source).toHaveAttribute("media", "(min-width: 1280px)");
    expect(source?.getAttribute("srcset")).toContain("balance-card-bg-desktop.avif");
    const image = container.querySelector("picture img");
    expect(image?.getAttribute("src")).toContain("balance-card-bg-mobile.avif");
    expect(image).toHaveAttribute("fetchpriority", "high");
    expect(image).toHaveAttribute("alt", "");
  });

  it("ships only the part of the mobile background the card shows", () => {
    const { container } = render(<BalanceCard balance={balance} />);
    const image = container.querySelector("picture img");
    expect(image).toHaveAttribute("width", "583");
    expect(image).toHaveAttribute("height", "452");
  });
});
