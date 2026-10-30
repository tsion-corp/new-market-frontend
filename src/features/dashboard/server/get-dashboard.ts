import type { Dashboard } from "../types";
import { dashboardFixture } from "./fixture";

export async function getDashboard(): Promise<Dashboard> {
  return dashboardFixture;
}
