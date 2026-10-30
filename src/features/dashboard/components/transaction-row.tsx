import Image from "next/image";
import { Icon } from "@/components/ui/icon";
import { ListRow } from "@/components/ui/list-row";
import { formatMoney } from "../lib/format-money";
import type { Transaction } from "../types";

const SEND_ICON = { src: "/icons/send.svg", width: 20.414, height: 20.414 };

export interface TransactionRowProps {
  transaction: Transaction;
  className?: string;
}

export function TransactionRow({ transaction, className }: TransactionRowProps) {
  const { visual } = transaction;
  return (
    <ListRow
      className={className}
      leading={
        visual.kind === "image" ? (
          <Image
            src={visual.image.src}
            width={visual.image.width}
            height={visual.image.height}
            alt={visual.image.alt}
            className="size-full object-cover"
          />
        ) : (
          <span className="flex size-full items-center justify-center bg-tint-faint">
            <Icon {...SEND_ICON} className={visual.icon === "receive" ? "rotate-180" : undefined} />
          </span>
        )
      }
      title={transaction.title}
      subtitle={transaction.counterparty}
      trailing={formatMoney(transaction.amount)}
    />
  );
}
