"use client";

import { Button } from "@/components/ui/button";
import { useErrorLog } from "../hooks/use-error-log";

export interface DashboardErrorProps {
  error: unknown;
  retry: () => void;
}

export function DashboardError({ error, retry }: DashboardErrorProps) {
  useErrorLog("Dashboard failed to load", error);
  return (
    <section className="flex flex-col items-start gap-6 rounded-panel bg-surface p-6">
      <h1 className="text-section-title font-semibold text-foreground">
        We couldn&apos;t load your dashboard.
      </h1>
      <Button variant="receive" onClick={() => retry()}>
        Try again
      </Button>
    </section>
  );
}
