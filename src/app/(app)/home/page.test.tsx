import { render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import HomePage, { metadata } from "./page";

vi.mock("server-only", () => ({}));

class FakeIntersectionObserver {
  observe() {}

  disconnect() {}
}

beforeEach(() => {
  vi.stubGlobal("IntersectionObserver", FakeIntersectionObserver);
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("HomePage", () => {
  it("is titled Home", () => {
    expect(metadata.title).toBe("Home");
  });

  it("has one visually hidden level one heading and the dashboard", async () => {
    render(await HomePage());
    const headings = screen.getAllByRole("heading", { level: 1 });
    expect(headings).toHaveLength(1);
    expect(headings[0]).toHaveTextContent("Home");
    expect(headings[0]).toHaveClass("sr-only");
    expect(screen.getByText("$5,000.87")).toBeInTheDocument();
  });
});
