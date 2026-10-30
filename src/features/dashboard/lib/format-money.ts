import type { Money } from "../types";

const CURRENCY_SYMBOLS: Record<Money["currency"], string> = { USD: "$" };

function groupThousands(digits: string): string {
  return digits.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function formatMoney(money: Money): string {
  const negative = money.amount < 0n;
  const absolute = negative ? -money.amount : money.amount;
  const dollars = groupThousands((absolute / 100n).toString());
  const cents = absolute % 100n;
  const fraction = cents === 0n ? "" : `.${cents.toString().padStart(2, "0")}`;
  return `${negative ? "-" : ""}${CURRENCY_SYMBOLS[money.currency]}${dollars}${fraction}`;
}

export function formatCents(cents: bigint): string {
  return `${cents.toString()}¢`;
}
