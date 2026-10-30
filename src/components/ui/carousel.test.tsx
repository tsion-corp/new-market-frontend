import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { Carousel } from "./carousel";

let callbacks: IntersectionObserverCallback[] = [];

class FakeIntersectionObserver {
  constructor(callback: IntersectionObserverCallback) {
    callbacks.push(callback);
  }

  observe() {}

  disconnect() {}

  unobserve() {}

  takeRecords() {
    return [];
  }
}

const scrollBy = vi.fn();

beforeEach(() => {
  callbacks = [];
  scrollBy.mockReset();
  vi.stubGlobal("IntersectionObserver", FakeIntersectionObserver);
  vi.stubGlobal(
    "matchMedia",
    vi.fn(() => ({ matches: false }))
  );
  Element.prototype.scrollBy = scrollBy;
});

afterEach(() => {
  vi.unstubAllGlobals();
});

function renderCarousel() {
  return render(
    <Carousel label="Stake your opinions">
      <div>First market</div>
      <div>Second market</div>
      <div>Third market</div>
    </Carousel>
  );
}

describe("Carousel", () => {
  it("is a named carousel region with a heading and its slides", () => {
    renderCarousel();
    const region = screen.getByRole("region", { name: "Stake your opinions" });
    expect(region).toHaveAttribute("aria-roledescription", "carousel");
    expect(
      screen.getByRole("heading", { level: 2, name: "Stake your opinions" })
    ).toBeInTheDocument();
    expect(screen.getByText("Second market")).toBeInTheDocument();
  });

  it("disables Previous at the start and keeps Next enabled", () => {
    renderCarousel();
    expect(screen.getByRole("button", { name: "Previous" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Next" })).toBeEnabled();
  });

  it("scrolls the viewport forward when Next is pressed", () => {
    renderCarousel();
    fireEvent.click(screen.getByRole("button", { name: "Next" }));
    expect(scrollBy).toHaveBeenCalledOnce();
    expect(scrollBy.mock.contexts[0]).toBe(screen.getByText("First market").parentElement);
  });

  it("enables Previous once the first slide leaves view", () => {
    renderCarousel();
    const first = screen.getByText("First market");
    act(() => {
      callbacks[callbacks.length - 1](
        [{ target: first, isIntersecting: false } as unknown as IntersectionObserverEntry],
        {} as IntersectionObserver
      );
    });
    expect(screen.getByRole("button", { name: "Previous" })).toBeEnabled();
  });

  it("shows a visible title that differs from its accessible label", () => {
    render(
      <Carousel label="Trending Games" title={<span>Games now</span>}>
        <div>Arkjet</div>
      </Carousel>
    );
    expect(screen.getByRole("region", { name: "Trending Games" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: "Games now" })).toBeInTheDocument();
  });

  it("points both buttons at the viewport they control", () => {
    renderCarousel();
    const viewport = screen.getByText("First market").parentElement;
    const id = viewport?.getAttribute("id");
    expect(id).toBeTruthy();
    expect(screen.getByRole("button", { name: "Previous" })).toHaveAttribute("aria-controls", id);
    expect(screen.getByRole("button", { name: "Next" })).toHaveAttribute("aria-controls", id);
  });

  it("lets the caller size the viewport so slides can run to the container edge", () => {
    render(
      <Carousel label="Stake your opinions" viewportClassName="-mr-5">
        <div>Only market</div>
      </Carousel>
    );
    expect(screen.getByText("Only market").parentElement).toHaveClass("-mr-5");
  });
});
