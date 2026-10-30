import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { DashboardError } from "./dashboard-error";

const consoleError = vi.spyOn(console, "error");

beforeEach(() => {
  consoleError.mockImplementation(() => undefined);
});

afterEach(() => {
  consoleError.mockReset();
});

describe("DashboardError", () => {
  it("tells the user the dashboard could not load", () => {
    render(<DashboardError error={new Error("boom")} retry={vi.fn()} />);
    expect(
      screen.getByRole("heading", { level: 1, name: "We couldn't load your dashboard." })
    ).toBeInTheDocument();
  });

  it("retries when Try again is pressed", () => {
    const retry = vi.fn();
    render(<DashboardError error={new Error("boom")} retry={retry} />);
    fireEvent.click(screen.getByRole("button", { name: "Try again" }));
    expect(retry).toHaveBeenCalledOnce();
  });

  it("logs the error with context", () => {
    const error = new Error("boom");
    render(<DashboardError error={error} retry={vi.fn()} />);
    expect(consoleError).toHaveBeenCalledWith("Dashboard failed to load", error);
  });
});
