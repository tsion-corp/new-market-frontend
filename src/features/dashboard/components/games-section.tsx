import { Carousel } from "@/components/ui/carousel";
import { SectionCard } from "@/components/ui/section-card";
import { SectionHeader } from "@/components/ui/section-header";
import { CAROUSEL_VIEWPORT } from "./dashboard-layout";
import type { Game } from "../types";
import { EmptyState } from "./empty-state";
import { GameCard } from "./game-card";

const LABEL = "Trending Games";

const TITLE = (
  <>
    <span className="hidden xl:inline">Trending</span> Games
  </>
);

export interface GamesSectionProps {
  games: Game[];
}

export function GamesSection({ games }: GamesSectionProps) {
  if (games.length === 0) {
    return (
      <SectionCard>
        <SectionHeader title={TITLE} />
        <EmptyState>No games right now</EmptyState>
      </SectionCard>
    );
  }
  return (
    <SectionCard>
      <Carousel label={LABEL} title={TITLE} viewportClassName={CAROUSEL_VIEWPORT}>
        {games.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </Carousel>
    </SectionCard>
  );
}
