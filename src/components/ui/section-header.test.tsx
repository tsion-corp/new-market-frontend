import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SectionHeader } from "./section-header";

describe("SectionHeader", () => {
  it("renders the title as a level 2 heading by default", () => {
    render(<SectionHeader title="Stake your opinions" />);
    expect(screen.getByRole("heading", { level: 2, name: "Stake your opinions" })).toHaveClass(
      "text-section-title-mobile",
      "xl:text-section-title"
    );
  });

  it("uses the requested heading level", () => {
    render(<SectionHeader title="Games" level={3} />);
    expect(screen.getByRole("heading", { level: 3, name: "Games" })).toBeInTheDocument();
  });

  it("accepts rich title content", () => {
    render(
      <SectionHeader
        title={
          <>
            <span>Trending</span> Games
          </>
        }
      />
    );
    expect(screen.getByRole("heading", { level: 2, name: "Trending Games" })).toBeInTheDocument();
  });

  it("places the controls beside the title", () => {
    render(<SectionHeader title="Games" controls={<button type="button">Next</button>} />);
    expect(screen.getByRole("button", { name: "Next" })).toBeInTheDocument();
  });
});
