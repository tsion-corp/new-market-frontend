import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useBalanceVisibility } from "./use-balance-visibility";

describe("useBalanceVisibility", () => {
  it("starts with the balance visible", () => {
    const { result } = renderHook(() => useBalanceVisibility());
    expect(result.current.visible).toBe(true);
  });

  it("hides and shows the balance on each toggle", () => {
    const { result } = renderHook(() => useBalanceVisibility());
    act(() => result.current.toggle());
    expect(result.current.visible).toBe(false);
    act(() => result.current.toggle());
    expect(result.current.visible).toBe(true);
  });
});
