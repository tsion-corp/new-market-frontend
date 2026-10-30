import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Loading from "./loading";

describe("Home loading", () => {
  it("shows the dashboard skeleton", () => {
    const { container } = render(<Loading />);
    expect(screen.getByRole("status")).toHaveTextContent("Loading your dashboard");
    expect(container.querySelectorAll('[data-slot="skeleton"]')).toHaveLength(5);
  });
});
