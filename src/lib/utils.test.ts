import { describe, expect, it } from "vitest";
import { cn } from "./utils";

describe("cn", () => {
  it("keeps a theme font size next to a text colour", () => {
    expect(cn("text-wallet-button text-on-light")).toBe("text-wallet-button text-on-light");
    expect(cn("text-row-caption", "text-muted-foreground")).toBe(
      "text-row-caption text-muted-foreground"
    );
    expect(cn("text-balance-amount-mobile", "xl:text-balance-amount", "text-foreground")).toBe(
      "text-balance-amount-mobile xl:text-balance-amount text-foreground"
    );
  });

  it("lets a later theme font size replace an earlier one", () => {
    expect(cn("text-section-title-mobile", "text-section-title")).toBe("text-section-title");
  });

  it("treats theme radii as radii", () => {
    expect(cn("rounded-full", "rounded-carousel-prev")).toBe("rounded-carousel-prev");
    expect(cn("rounded-md", "rounded-card-media-mobile")).toBe("rounded-card-media-mobile");
  });

  it("still merges standard utilities", () => {
    expect(cn("px-2 py-1", false, "px-4")).toBe("py-1 px-4");
  });
});
