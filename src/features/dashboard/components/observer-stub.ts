import { afterEach, beforeEach, vi } from "vitest";

class FakeIntersectionObserver {
  observe() {}

  disconnect() {}

  unobserve() {}

  takeRecords() {
    return [];
  }
}

export function stubIntersectionObserver() {
  beforeEach(() => {
    vi.stubGlobal("IntersectionObserver", FakeIntersectionObserver);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });
}
