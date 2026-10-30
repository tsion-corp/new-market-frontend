"use client";

import { getImageProps } from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { IconButton } from "@/components/ui/icon-button";
import { cn } from "@/lib/utils";
import { useBalanceVisibility } from "../hooks/use-balance-visibility";
import { formatMoney } from "../lib/format-money";
import type { Money } from "../types";

const COINS_ICON = { src: "/icons/coins.svg", width: 12.9, height: 12.899 };
const EYE_ICON = { src: "/icons/eye.svg", width: 22.934, height: 22.934 };
const CHEVRON_ICON = { src: "/icons/chevron-down-muted.svg", width: 14.4, height: 14.4 };
const SEND_DARK_ICON = { src: "/icons/send-dark.svg", width: 19.69, height: 19.69 };
const SEND_ICON = { src: "/icons/send.svg", width: 20.414, height: 20.414 };
const FLAG_ICON = { src: "/images/dashboard/usd-flag.avif", width: 80, height: 42 };

const {
  props: { src: desktopBackground },
} = getImageProps({
  src: "/images/dashboard/balance-card-bg-desktop.avif",
  width: 683,
  height: 1024,
  alt: "",
});

const { props: mobileBackground } = getImageProps({
  src: "/images/dashboard/balance-card-bg-mobile.avif",
  width: 583,
  height: 452,
  alt: "",
  loading: "eager",
  fetchPriority: "high",
});

export interface BalanceCardProps {
  balance: Money;
  className?: string;
}

export function BalanceCard({ balance, className }: BalanceCardProps) {
  const { visible, toggle } = useBalanceVisibility();
  return (
    <div
      className={cn(
        "relative h-[301px] overflow-clip rounded-balance-card-mobile border-[0.809px] border-edge-strong bg-(image:--gradient-balance-card) xl:h-[273px] xl:rounded-balance-card xl:border-[0.734px]",
        className
      )}
    >
      <div className="absolute inset-0 xl:inset-auto xl:top-[-168.73px] xl:left-[calc(50%-4.5px)] xl:h-[667px] xl:w-[445px] xl:-translate-x-1/2">
        <picture>
          <source media="(min-width: 1280px)" srcSet={desktopBackground} />
          <img {...mobileBackground} alt="" className="size-full max-w-none object-cover" />
        </picture>
        <div className="absolute inset-0 bg-(image:--gradient-balance-card-scrim)" />
      </div>
      <div className="absolute top-[36.68px] left-1/2 flex w-[171.999px] -translate-x-1/2 flex-col items-center gap-[13.231px] xl:top-[33.27px] xl:w-[155.999px] xl:gap-3">
        <div className="flex w-full flex-col items-center gap-[4.41px] xl:gap-1">
          <div className="flex items-center gap-[4.41px] xl:gap-1">
            <button
              type="button"
              disabled
              aria-label="Display currency: USD"
              className="flex h-[39.692px] w-[113.385px] items-center gap-[7.938px] rounded-full border-[1.323px] border-border bg-tint py-[5.292px] pr-[10.585px] pl-[7.938px] xl:h-9 xl:w-[103px] xl:gap-[7.2px] xl:border-[1.2px] xl:py-[4.8px] xl:pr-[9.6px] xl:pl-[7.2px]"
            >
              <span className="size-[26.462px] shrink-0 overflow-clip rounded-full bg-tint-strong xl:size-6">
                <Icon {...FLAG_ICON} className="size-full object-cover" />
              </span>
              <span className="flex-1 text-center font-mona-sans text-currency-mobile font-semibold text-foreground xl:text-currency">
                USD
              </span>
              <Icon {...CHEVRON_ICON} className="size-[15.877px] xl:size-[14.4px]" />
            </button>
            <IconButton
              aria-label="Take a tour"
              variant="tint"
              icon={COINS_ICON}
              iconClassName="h-[14.222px] w-[14.224px] xl:h-[12.899px] xl:w-[12.9px]"
              disabled
              className="disabled:opacity-100"
            />
          </div>
          <div className="flex w-full items-center justify-between">
            <span className="text-balance-label-mobile font-medium text-foreground-dim xl:text-balance-label">
              Total balance
            </span>
            <IconButton
              aria-label={visible ? "Hide balance" : "Show balance"}
              variant="ghost"
              icon={EYE_ICON}
              iconClassName="size-[25.286px] xl:size-[22.934px]"
              onClick={toggle}
            />
          </div>
        </div>
        <p className="text-balance-amount-mobile font-bold whitespace-nowrap text-foreground xl:text-balance-amount">
          {visible ? (
            formatMoney(balance)
          ) : (
            <>
              <span aria-hidden="true">• • • • • •</span>
              <span className="sr-only">Balance hidden</span>
            </>
          )}
        </p>
      </div>
      <div className="absolute top-[223.82px] left-[36.38px] flex items-center gap-[10.025px] xl:top-[203.002px] xl:left-[calc(50%-143px)] xl:gap-[9.092px]">
        <Button variant="send" asChild>
          <Link href="/payments">
            <Icon {...SEND_DARK_ICON} />
            Send
          </Link>
        </Button>
        <Button variant="receive" asChild>
          <Link href="/payments">
            <Icon {...SEND_ICON} className="rotate-180" />
            Receive
          </Link>
        </Button>
      </div>
    </div>
  );
}
