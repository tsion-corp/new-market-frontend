import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import HomeError from "./error";

const consoleError = vi.spyOn(console, "error").mockImplementation(() => undefined);

afterEach(() => {
  consoleError.mockClear();
});

describe("Home error", () => {
  it("shows the message, logs the error and retries on Try again", () => {
    const error = new Error("boom");
    const retry = vi.fn();
    render(<HomeError error={error} retry={retry} reset={vi.fn()} />);
    expect(screen.getByRole("heading", { name: "We couldn't load your dashboard." })).toBeVisible();
    expect(consoleError).toHaveBeenCalledWith("Dashboard failed to load", error);
    fireEvent.click(screen.getByRole("button", { name: "Try again" }));
    expect(retry).toHaveBeenCalledOnce();
  });
});
