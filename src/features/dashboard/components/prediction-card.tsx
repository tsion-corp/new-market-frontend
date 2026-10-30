import Link from "next/link";
import { useId } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatCents } from "../lib/format-money";
import type { PredictionMarket } from "../types";
import { CardImage } from "./card-image";

export interface PredictionCardProps {
  market: PredictionMarket;
}

export function PredictionCard({ market }: PredictionCardProps) {
  const questionId = useId();
  return (
    <Card className="flex w-[278.686px] flex-col items-center gap-[9.555px] xl:w-[350px] xl:gap-3">
      <CardImage image={market.image} />
      <div className="flex w-full flex-col gap-[19.11px] overflow-clip p-[9.555px] xl:gap-6 xl:p-3">
        <h3
          id={questionId}
          className="line-clamp-2 min-h-[2lh] text-question-mobile font-medium text-foreground xl:text-question"
        >
          <Link href="/predictions" className="hover:underline">
            {market.question}
          </Link>
        </h3>
        <div className="flex w-full gap-[7.28px] pt-[2.73px] xl:gap-[9.143px] xl:pt-[3.429px]">
          <Button variant="outcome-yes" asChild className="flex-1">
            <Link href="/predictions" aria-describedby={questionId}>
              Yes {formatCents(market.yesPrice)}
            </Link>
          </Button>
          <Button variant="outcome-no" asChild className="flex-1">
            <Link href="/predictions" aria-describedby={questionId}>
              No {formatCents(market.noPrice)}
            </Link>
          </Button>
        </div>
      </div>
    </Card>
  );
}
