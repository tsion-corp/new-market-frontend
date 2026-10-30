import Link from "next/link";
import { useId } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import type { Game } from "../types";
import { CardImage } from "./card-image";

const GAMEPAD_ICON = { src: "/icons/gamepad.svg", width: 25.518, height: 18.089 };

export interface GameCardProps {
  game: Game;
}

export function GameCard({ game }: GameCardProps) {
  const titleId = useId();
  return (
    <Card className="flex w-[278.686px] flex-col gap-[9.555px] xl:w-[300px] xl:gap-[15.839px]">
      <CardImage image={game.cover} />
      <div className="flex flex-col items-start gap-[19.11px] p-[9.555px] xl:items-stretch xl:gap-[36.364px] xl:p-0">
        <div className="flex w-[183px] flex-col gap-[4.061px] xl:w-auto xl:gap-[6.061px]">
          <h3
            id={titleId}
            className="text-game-title-mobile font-bold text-foreground xl:text-game-title"
          >
            {game.title}
          </h3>
          <p className="text-game-description-mobile font-semibold text-foreground-secondary xl:text-game-description">
            {game.description}
          </p>
        </div>
        <Button variant="play" asChild>
          <Link href="/games" aria-describedby={titleId}>
            <Icon {...GAMEPAD_ICON} />
            Play Now
          </Link>
        </Button>
      </div>
    </Card>
  );
}
