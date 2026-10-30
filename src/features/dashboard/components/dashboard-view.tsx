import type { Dashboard } from "../types";
import { BalanceCard } from "./balance-card";
import {
  BALANCE_CARD_BOX,
  DASHBOARD_GRID,
  HERO_PLACEMENT,
  SECTIONS_COLUMN,
  WALLET_PANEL,
} from "./dashboard-layout";
import { GamesSection } from "./games-section";
import { HeroBanner } from "./hero-banner";
import { PredictionsSection } from "./predictions-section";
import { TransactionList } from "./transaction-list";

export interface DashboardViewProps {
  dashboard: Dashboard;
}

export function DashboardView({ dashboard }: DashboardViewProps) {
  return (
    <div className={DASHBOARD_GRID}>
      <HeroBanner className={HERO_PLACEMENT} />
      <div className={WALLET_PANEL}>
        <BalanceCard balance={dashboard.balance} className={BALANCE_CARD_BOX} />
        <TransactionList transactions={dashboard.transactions} />
      </div>
      <div className={SECTIONS_COLUMN}>
        <PredictionsSection markets={dashboard.markets} />
        <GamesSection games={dashboard.games} />
      </div>
    </div>
  );
}
