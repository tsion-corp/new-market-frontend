import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SearchField } from "./search-field";

describe("SearchField", () => {
  it("is a search landmark that submits GET to its action", () => {
    render(<SearchField action="/search" name="q" placeholder="Search Market" />);
    const form = screen.getByRole("search");
    expect(form).toHaveAttribute("method", "get");
    expect(form).toHaveAttribute("action", "/search");
  });

  it("has a labelled search input that carries the query name", () => {
    render(<SearchField action="/search" name="q" placeholder="Search Market" />);
    const input = screen.getByRole("searchbox", { name: "Search Market" });
    expect(input).toHaveAttribute("name", "q");
    expect(input).toHaveAttribute("placeholder", "Search Market");
  });

  it("sends the typed query as a form field", () => {
    render(<SearchField action="/search" name="q" placeholder="Search Market" />);
    const input = screen.getByRole("searchbox", { name: "Search Market" });
    (input as HTMLInputElement).value = "arkjet";
    const data = new FormData(screen.getByRole("search") as HTMLFormElement);
    expect(data.get("q")).toBe("arkjet");
  });

  it("is drawn at the design size with the search gradient", () => {
    render(<SearchField action="/search" name="q" placeholder="Search Market" />);
    expect(screen.getByRole("search")).toHaveClass(
      "h-[53.739px]",
      "w-[441.852px]",
      "bg-(image:--gradient-search)",
      "rounded-search"
    );
  });
});
