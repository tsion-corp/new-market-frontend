import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import SearchPage from "./page";

async function renderSearch(searchParams: Record<string, string | string[] | undefined>) {
  render(
    await SearchPage({ params: Promise.resolve({}), searchParams: Promise.resolve(searchParams) })
  );
}

describe("SearchPage", () => {
  it("names the page in its heading", async () => {
    await renderSearch({});
    expect(screen.getByRole("heading", { level: 1, name: "Search" })).toBeInTheDocument();
  });

  it("repeats the query in its message", async () => {
    await renderSearch({ q: "arkjet" });
    expect(screen.getByText('Results for "arkjet" are not designed yet.')).toBeInTheDocument();
  });

  it("uses the first query when several are given", async () => {
    await renderSearch({ q: ["arkjet", "tacha"] });
    expect(screen.getByText('Results for "arkjet" are not designed yet.')).toBeInTheDocument();
  });

  it("shows a plain message without a query", async () => {
    await renderSearch({ q: "  " });
    expect(screen.getByText("Search results are not designed yet.")).toBeInTheDocument();
  });

  it("renders markup in the query as text", async () => {
    await renderSearch({ q: "<b>bold</b>" });
    expect(screen.getByText('Results for "<b>bold</b>" are not designed yet.')).toBeInTheDocument();
  });
});
