import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Skeleton } from "./skeleton";

describe("Skeleton", () => {
  it("is a solid block with no animation, hidden from assistive technology", () => {
    const { container } = render(<Skeleton className="h-[273px] w-[352px]" />);
    const block = container.firstChild;
    expect(block).toHaveClass("bg-surface-raised", "h-[273px]", "w-[352px]");
    expect(block).not.toHaveClass("animate-pulse");
    expect(block).toHaveAttribute("aria-hidden", "true");
  });
});
