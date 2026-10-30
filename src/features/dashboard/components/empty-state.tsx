import type { ReactNode } from "react";

export interface EmptyStateProps {
  children: ReactNode;
}

export function EmptyState({ children }: EmptyStateProps) {
  return <p className="text-list-heading font-semibold text-muted-foreground">{children}</p>;
}
