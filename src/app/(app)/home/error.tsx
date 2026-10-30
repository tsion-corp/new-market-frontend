"use client";

import { DashboardError } from "@/features/dashboard";

interface HomeErrorProps {
  error: unknown;
  reset: () => void;
  retry: () => void;
}

export default function HomeError({ error, retry }: HomeErrorProps) {
  return <DashboardError error={error} retry={retry} />;
}
