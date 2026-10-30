import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Avatar } from "./avatar";

describe("Avatar", () => {
  it("renders the image with its alt text", () => {
    render(<Avatar src="/images/dashboard/avatar.avif" alt="Mark" size="lg" />);
    expect(screen.getByRole("img", { name: "Mark" })).toHaveClass("object-cover");
  });

  it("is a 48 px circle with a 1.403 px cyan-to-pink gradient ring at the large size", () => {
    const { container } = render(
      <Avatar src="/images/dashboard/avatar.avif" alt="" size="lg" ring />
    );
    expect(container.firstChild).toHaveClass(
      "size-12",
      "rounded-full",
      "band-ring",
      "band-ring-avatar",
      "[--band-ring-width:1.403px]"
    );
    expect(container.firstChild).not.toHaveClass("border-[1.403px]");
  });

  it("is a 44 px circle with a 1.6 px ring at the medium size", () => {
    const { container } = render(
      <Avatar src="/images/dashboard/avatar.avif" alt="" size="md" ring />
    );
    expect(container.firstChild).toHaveClass(
      "size-11",
      "band-ring",
      "band-ring-avatar",
      "[--band-ring-width:1.6px]"
    );
    expect(container.firstChild).not.toHaveClass("border-[1.6px]");
  });

  it("has no ring unless asked", () => {
    const { container } = render(<Avatar src="/images/dashboard/avatar.avif" alt="" size="md" />);
    expect(container.firstChild).not.toHaveClass("band-ring");
  });
});
