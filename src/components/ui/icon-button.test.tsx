import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { IconButton } from "./icon-button";

const bell = { src: "/icons/notifications.svg", width: 47.131, height: 47.131 };

describe("IconButton", () => {
  it("renders a button named by its label with a decorative icon", () => {
    const { container } = render(<IconButton aria-label="Hide balance" icon={bell} />);
    const button = screen.getByRole("button", { name: "Hide balance" });
    expect(button).toHaveAttribute("type", "button");
    expect(container.querySelector("img")).toHaveAttribute("alt", "");
  });

  it("calls onClick when pressed", () => {
    const onClick = vi.fn();
    render(<IconButton aria-label="Next" icon={bell} onClick={onClick} />);
    fireEvent.click(screen.getByRole("button", { name: "Next" }));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("does not respond when disabled and is drawn at 40 percent opacity", () => {
    const onClick = vi.fn();
    render(
      <IconButton
        aria-label="Previous"
        icon={bell}
        variant="carousel-prev"
        disabled
        onClick={onClick}
      />
    );
    const button = screen.getByRole("button", { name: "Previous" });
    expect(button).toBeDisabled();
    expect(button).toHaveClass("disabled:opacity-40");
    fireEvent.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });

  it("renders a link when given an href", () => {
    render(<IconButton aria-label="Notifications, unread" icon={bell} href="/notifications" />);
    expect(screen.getByRole("link", { name: "Notifications, unread" })).toHaveAttribute(
      "href",
      "/notifications"
    );
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it.each([
    ["glass", "xl:size-[47.131px]"],
    ["ghost", "hover:bg-surface-active"],
    ["tint", "bg-tint"],
    ["carousel-prev", "rounded-carousel-prev"],
    ["carousel-next", "rounded-carousel-next"],
  ] as const)("applies the %s variant", (variant, expected) => {
    render(<IconButton aria-label="Action" icon={bell} variant={variant} />);
    expect(screen.getByRole("button", { name: "Action" })).toHaveClass(expected);
  });

  it("uses the carousel gradients for previous and next", () => {
    render(
      <>
        <IconButton aria-label="Previous" icon={bell} variant="carousel-prev" />
        <IconButton aria-label="Next" icon={bell} variant="carousel-next" />
      </>
    );
    expect(screen.getByRole("button", { name: "Previous" })).toHaveClass(
      "bg-(image:--gradient-carousel-prev)"
    );
    expect(screen.getByRole("button", { name: "Next" })).toHaveClass(
      "bg-(image:--gradient-carousel-next)"
    );
  });

  it("draws the carousel ring as a 0.373 px brand-gradient band at 20 percent opacity inside the button", () => {
    render(
      <>
        <IconButton aria-label="Previous" icon={bell} variant="carousel-prev" />
        <IconButton aria-label="Next" icon={bell} variant="carousel-next" />
      </>
    );
    for (const name of ["Previous", "Next"]) {
      const button = screen.getByRole("button", { name });
      expect(button).toHaveClass(
        "band-ring",
        "band-ring-gradient",
        "[--band-ring-width:0.373px]",
        "[--band-ring-opacity:0.2]"
      );
      expect(button).not.toHaveClass("border-brand-blue");
    }
  });
});
