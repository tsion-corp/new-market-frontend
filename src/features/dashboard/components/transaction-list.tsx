import { TextLink } from "@/components/ui/text-link";
import { cn } from "@/lib/utils";
import type { Transaction } from "../types";
import { EmptyState } from "./empty-state";
import { TransactionRow } from "./transaction-row";

const MOBILE_ROWS = 3;
const DESKTOP_ROWS = 5;

export interface TransactionListProps {
  transactions: Transaction[];
  className?: string;
}

export function TransactionList({ transactions, className }: TransactionListProps) {
  return (
    <section
      className={cn(
        "flex flex-col gap-6 rounded-sunken-panel bg-surface-sunken p-6 xl:gap-[26.513px] xl:rounded-none xl:bg-transparent xl:p-0",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <h2 className="text-list-heading font-semibold whitespace-pre text-muted-foreground">
          {"Recent transactions"}
        </h2>
        <TextLink href="/transactions">View all</TextLink>
      </div>
      {transactions.length === 0 ? (
        <EmptyState>No transactions yet</EmptyState>
      ) : (
        <ul className="flex flex-col gap-[26.513px]">
          {transactions.slice(0, DESKTOP_ROWS).map((transaction, index) => (
            <TransactionRow
              key={transaction.id}
              transaction={transaction}
              className={index >= MOBILE_ROWS ? "max-xl:hidden" : undefined}
            />
          ))}
        </ul>
      )}
    </section>
  );
}
