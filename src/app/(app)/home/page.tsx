import type { Metadata } from "next";
import { DashboardView } from "@/features/dashboard";
import { getDashboard } from "@/features/dashboard/server";

export const metadata: Metadata = { title: "Home" };

export default async function HomePage() {
  const dashboard = await getDashboard();
  return (
    <>
      <h1 className="sr-only">Home</h1>
      <DashboardView dashboard={dashboard} />
    </>
  );
}
