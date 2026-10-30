import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MaskedIcon } from "./masked-icon";

describe("MaskedIcon", () => {
  it("cuts the icon's shape out of its own colour at the icon's size", () => {
    const { container } = render(
      <MaskedIcon
        src="/icons/nav-games.svg"
        width={25.18}
        height={23.698}
        className="bg-foreground"
      />
    );
    const icon = container.firstElementChild as HTMLElement;
    expect(icon).toHaveAttribute("aria-hidden", "true");
    expect(icon).toHaveClass("bg-foreground", "shrink-0");
    expect(icon.style.width).toBe("25.18px");
    expect(icon.style.height).toBe("23.698px");
    expect(icon.style.maskImage).toBe('url("/icons/nav-games.svg")');
  });
});
