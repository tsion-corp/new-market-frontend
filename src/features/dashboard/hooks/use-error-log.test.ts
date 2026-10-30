import { renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { useErrorLog } from "./use-error-log";

const consoleError = vi.spyOn(console, "error").mockImplementation(() => undefined);

afterEach(() => {
  consoleError.mockClear();
});

describe("useErrorLog", () => {
  it("logs the error once with its context", () => {
    const error = new Error("boom");
    const { rerender } = renderHook(() => useErrorLog("Dashboard failed to load", error));
    rerender();
    expect(consoleError).toHaveBeenCalledOnce();
    expect(consoleError).toHaveBeenCalledWith("Dashboard failed to load", error);
  });

  it("logs again when a new error arrives", () => {
    const { rerender } = renderHook(({ error }) => useErrorLog("Dashboard failed to load", error), {
      initialProps: { error: new Error("first") as unknown },
    });
    rerender({ error: new Error("second") });
    expect(consoleError).toHaveBeenCalledTimes(2);
  });
});
