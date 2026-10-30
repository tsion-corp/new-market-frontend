import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/layout/placeholder-page";

export const metadata: Metadata = { title: "Search" };

export default async function SearchPage({ searchParams }: PageProps<"/search">) {
  const { q } = await searchParams;
  const query = (Array.isArray(q) ? q[0] : q)?.trim();
  return (
    <PlaceholderPage
      title="Search"
      message={
        query
          ? `Results for "${query}" are not designed yet.`
          : "Search results are not designed yet."
      }
    />
  );
}
