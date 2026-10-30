import { describe, expect, it } from "vitest";
import { formatCents, formatMoney } from "./format-money";

describe("formatMoney", () => {
  it("formats zero as whole dollars", () => {
    expect(formatMoney({ amount: 0n, currency: "USD" })).toBe("$0");
  });

  it("keeps cents when there are any", () => {
    expect(formatMoney({ amount: 500087n, currency: "USD" })).toBe("$5,000.87");
  });

  it("formats an amount below one dollar", () => {
    expect(formatMoney({ amount: 5n, currency: "USD" })).toBe("$0.05");
  });

  it("drops .00 from whole dollar amounts", () => {
    expect(formatMoney({ amount: 450000n, currency: "USD" })).toBe("$4,500");
  });

  it("groups thousands", () => {
    expect(formatMoney({ amount: 123456789n, currency: "USD" })).toBe("$1,234,567.89");
  });

  it("formats amounts beyond the safe integer range exactly", () => {
    expect(formatMoney({ amount: 90071992547409931n, currency: "USD" })).toBe(
      "$900,719,925,474,099.31"
    );
  });

  it("formats negative amounts", () => {
    expect(formatMoney({ amount: -1050n, currency: "USD" })).toBe("-$10.50");
  });
});

describe("formatCents", () => {
  it("formats a price in cents", () => {
    expect(formatCents(62n)).toBe("62¢");
  });

  it("formats zero cents", () => {
    expect(formatCents(0n)).toBe("0¢");
  });
});
