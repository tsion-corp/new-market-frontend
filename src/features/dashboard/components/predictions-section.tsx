import { Carousel } from "@/components/ui/carousel";
import { SectionCard } from "@/components/ui/section-card";
import { SectionHeader } from "@/components/ui/section-header";
import { CAROUSEL_VIEWPORT } from "./dashboard-layout";
import type { PredictionMarket } from "../types";
import { EmptyState } from "./empty-state";
import { PredictionCard } from "./prediction-card";

const TITLE = "Stake your opinions";

export interface PredictionsSectionProps {
  markets: PredictionMarket[];
}

export function PredictionsSection({ markets }: PredictionsSectionProps) {
  if (markets.length === 0) {
    return (
      <SectionCard>
        <SectionHeader title={TITLE} />
        <EmptyState>No markets right now</EmptyState>
      </SectionCard>
    );
  }
  return (
    <SectionCard>
      <Carousel label={TITLE} viewportClassName={CAROUSEL_VIEWPORT}>
        {markets.map((market) => (
          <PredictionCard key={market.id} market={market} />
        ))}
      </Carousel>
    </SectionCard>
  );
}
