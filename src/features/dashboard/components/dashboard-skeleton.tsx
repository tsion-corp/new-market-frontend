import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import {
  BALANCE_CARD_BOX,
  DASHBOARD_GRID,
  HERO_PLACEMENT,
  SECTIONS_COLUMN,
  WALLET_PANEL,
} from "./dashboard-layout";

export function DashboardSkeleton() {
  return (
    <div role="status" className={DASHBOARD_GRID}>
      <span className="sr-only">Loading your dashboard</span>
      <Skeleton data-box="hero" className={cn(HERO_PLACEMENT, "xl:h-[228px] xl:rounded-panel")} />
      <div className={WALLET_PANEL}>
        <Skeleton
          data-box="balance-card"
          className={cn(
            BALANCE_CARD_BOX,
            "h-[301px] rounded-balance-card-mobile xl:h-[273px] xl:rounded-balance-card"
          )}
        />
        <Skeleton
          data-box="transactions"
          className="h-[274px] rounded-sunken-panel xl:h-[367.264px] xl:rounded-panel"
        />
      </div>
      <div className={SECTIONS_COLUMN}>
        <Skeleton
          data-box="predictions"
          className="h-[328.78px] rounded-card-mobile xl:h-[459.882px] xl:rounded-section"
        />
        <Skeleton
          data-box="games"
          className="h-[345.295px] rounded-card-mobile xl:h-[486.145px] xl:rounded-section"
        />
      </div>
    </div>
  );
}
