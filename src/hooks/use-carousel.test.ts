import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useCarousel } from "./use-carousel";

type ObserverRecord = {
  callback: IntersectionObserverCallback;
  observed: Element[];
  disconnect: ReturnType<typeof vi.fn<() => void>>;
};

let observers: ObserverRecord[] = [];

class FakeIntersectionObserver {
  record: ObserverRecord;

  constructor(callback: IntersectionObserverCallback) {
    this.record = { callback, observed: [], disconnect: vi.fn<() => void>() };
    observers.push(this.record);
  }

  observe(element: Element) {
    this.record.observed.push(element);
  }

  disconnect() {
    this.record.disconnect();
  }

  unobserve() {}

  takeRecords() {
    return [];
  }
}

function buildViewport(count: number) {
  const viewport = document.createElement("div");
  Object.defineProperty(viewport, "clientWidth", { value: 300 });
  viewport.scrollBy = vi.fn();
  for (let index = 0; index < count; index += 1) {
    viewport.appendChild(document.createElement("div"));
  }
  return viewport;
}

function report(target: Element, isIntersecting: boolean) {
  const record = observers[observers.length - 1];
  act(() => {
    record.callback(
      [{ target, isIntersecting } as IntersectionObserverEntry],
      {} as IntersectionObserver
    );
  });
}

beforeEach(() => {
  observers = [];
  vi.stubGlobal("IntersectionObserver", FakeIntersectionObserver);
  vi.stubGlobal(
    "matchMedia",
    vi.fn(() => ({ matches: false }))
  );
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("useCarousel", () => {
  it("cannot go back at the start and can go forward", () => {
    const { result } = renderHook(() => useCarousel());
    expect(result.current.canPrev).toBe(false);
    expect(result.current.canNext).toBe(true);
  });

  it("observes the first and last item", () => {
    const viewport = buildViewport(3);
    const { result } = renderHook(() => useCarousel());
    act(() => {
      result.current.viewportRef(viewport);
    });
    expect(observers[0].observed).toEqual([viewport.firstElementChild, viewport.lastElementChild]);
  });

  it("follows the observer as the edges leave and enter view", () => {
    const viewport = buildViewport(3);
    const { result } = renderHook(() => useCarousel());
    act(() => {
      result.current.viewportRef(viewport);
    });
    report(viewport.firstElementChild as Element, false);
    expect(result.current.canPrev).toBe(true);
    report(viewport.lastElementChild as Element, true);
    expect(result.current.canNext).toBe(false);
    report(viewport.firstElementChild as Element, true);
    expect(result.current.canPrev).toBe(false);
  });

  it("scrolls one viewport width forward and back", () => {
    const viewport = buildViewport(3);
    const { result } = renderHook(() => useCarousel());
    act(() => {
      result.current.viewportRef(viewport);
    });
    act(() => {
      result.current.next();
    });
    expect(viewport.scrollBy).toHaveBeenLastCalledWith({ left: 300, behavior: "smooth" });
    act(() => {
      result.current.prev();
    });
    expect(viewport.scrollBy).toHaveBeenLastCalledWith({ left: -300, behavior: "smooth" });
  });

  it("scrolls without animation when reduced motion is requested", () => {
    vi.stubGlobal(
      "matchMedia",
      vi.fn(() => ({ matches: true }))
    );
    const viewport = buildViewport(3);
    const { result } = renderHook(() => useCarousel());
    act(() => {
      result.current.viewportRef(viewport);
    });
    act(() => {
      result.current.next();
    });
    expect(viewport.scrollBy).toHaveBeenLastCalledWith({ left: 300, behavior: "auto" });
  });

  it("disconnects the observer when the viewport is detached", () => {
    const viewport = buildViewport(3);
    const { result } = renderHook(() => useCarousel());
    let cleanup: void | (() => void);
    act(() => {
      cleanup = result.current.viewportRef(viewport);
    });
    act(() => {
      if (typeof cleanup === "function") cleanup();
    });
    expect(observers[0].disconnect).toHaveBeenCalled();
  });
});
