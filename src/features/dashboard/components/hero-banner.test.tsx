import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { HeroBanner } from "./hero-banner";

describe("HeroBanner", () => {
  it("shows the drawn headline and subtitle", () => {
    render(<HeroBanner />);
    expect(
      screen.getByRole("heading", { level: 2, name: "Your Money, More Possibilities" })
    ).toBeInTheDocument();
    expect(screen.getByText(/Crypto, global payments, games and predictions\./)).toHaveTextContent(
      "All together on Market."
    );
  });

  it("keeps its artwork decorative and lazy", () => {
    const { container } = render(<HeroBanner />);
    const images = container.querySelectorAll("img");
    expect(images).toHaveLength(3);
    for (const image of images) {
      expect(image).toHaveAttribute("alt", "");
      expect(image).toHaveAttribute("loading", "lazy");
    }
  });

  it("paints the globe behind the text so the text stays readable when the banner narrows", () => {
    const { container } = render(<HeroBanner />);
    const globe = container.querySelector('img[src*="hero-globe"]');
    const heading = screen.getByRole("heading", { level: 2 });
    expect(globe).not.toBeNull();
    expect(
      globe && globe.compareDocumentPosition(heading) & Node.DOCUMENT_POSITION_FOLLOWING
    ).toBeTruthy();
  });
});
