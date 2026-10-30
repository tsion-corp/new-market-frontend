import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { PlaceholderPage } from "./placeholder-page";

describe("PlaceholderPage", () => {
  it("names the page in its only level one heading", () => {
    render(<PlaceholderPage title="Payments" />);
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByRole("heading", { level: 1, name: "Payments" })).toBeInTheDocument();
  });

  it("says the page is not designed yet", () => {
    render(<PlaceholderPage title="Payments" />);
    expect(screen.getByText("This page is not designed yet.")).toBeInTheDocument();
  });

  it("shows a custom message when given one", () => {
    render(<PlaceholderPage title="Search" message="Results are not designed yet." />);
    expect(screen.getByText("Results are not designed yet.")).toBeInTheDocument();
  });
});
