import { fireEvent, render, screen } from "@testing-library/react";
import Link from "next/link";
import { describe, expect, it, vi } from "vitest";
import { Button } from "./button";

describe("Button", () => {
  it("is a type=button button by default", () => {
    render(<Button variant="receive">Try again</Button>);
    expect(screen.getByRole("button", { name: "Try again" })).toHaveAttribute("type", "button");
  });

  it("calls onClick when pressed", () => {
    const onClick = vi.fn();
    render(
      <Button variant="send" onClick={onClick}>
        Send
      </Button>
    );
    fireEvent.click(screen.getByRole("button", { name: "Send" }));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("is not clickable when disabled and shows 40 percent opacity", () => {
    const onClick = vi.fn();
    render(
      <Button variant="play" disabled onClick={onClick}>
        Play Now
      </Button>
    );
    const button = screen.getByRole("button", { name: "Play Now" });
    expect(button).toBeDisabled();
    expect(button).toHaveClass("disabled:opacity-40");
    fireEvent.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });

  it("renders its child link when asChild is set", () => {
    render(
      <Button variant="receive" asChild>
        <Link href="/payments">Receive</Link>
      </Button>
    );
    const link = screen.getByRole("link", { name: "Receive" });
    expect(link).toHaveAttribute("href", "/payments");
    expect(link).toHaveClass("band-ring-gradient");
    expect(link).not.toHaveAttribute("type");
  });

  it.each([
    [
      "send",
      ["bg-(image:--gradient-send)", "text-on-light", "shadow-send-mobile", "xl:shadow-send"],
    ],
    [
      "receive",
      ["font-mona-sans", "bg-tint-strong", "band-ring-gradient", "xl:text-wallet-button"],
    ],
    ["play", ["bg-tint", "shadow-play-mobile", "xl:shadow-play", "text-play-mobile"]],
    ["outcome-yes", ["bg-outcome-yes-surface", "border-outcome-yes-border", "text-outcome-yes"]],
    ["outcome-no", ["border-outcome-no-border", "text-outcome-no", "xl:rounded-outcome"]],
  ] as const)("applies the %s variant", (variant, classes) => {
    render(<Button variant={variant}>Label</Button>);
    expect(screen.getByRole("button", { name: "Label" })).toHaveClass(...classes);
  });

  it("draws the Receive border with the vertical brand gradient, not plain blue", () => {
    render(<Button variant="receive">Receive</Button>);
    const button = screen.getByRole("button", { name: "Receive" });
    expect(button).toHaveClass(
      "band-ring",
      "band-ring-gradient",
      "[--band-ring-width:1.253px]",
      "xl:[--band-ring-width:1.137px]"
    );
    expect(button).not.toHaveClass("border-brand-blue");
    expect(button).not.toHaveClass("border-[1.253px]");
    expect(button).not.toHaveClass("xl:border-[1.137px]");
  });

  it("draws the Play Now border with the vertical brand gradient, not plain blue", () => {
    render(<Button variant="play">Play Now</Button>);
    const button = screen.getByRole("button", { name: "Play Now" });
    expect(button).toHaveClass(
      "band-ring",
      "band-ring-gradient",
      "[--band-ring-width:1.045px]",
      "xl:[--band-ring-width:1.471px]",
      "p-[11.337px]",
      "xl:p-[15.955px]"
    );
    expect(button).not.toHaveClass("border-brand-blue");
    expect(button).not.toHaveClass("border-[1.045px]");
    expect(button).not.toHaveClass("xl:border-[1.471px]");
  });

  it("keeps the wallet font size beside the text colour", () => {
    render(<Button variant="send">Send</Button>);
    expect(screen.getByRole("button", { name: "Send" })).toHaveClass(
      "text-wallet-button-mobile",
      "xl:text-wallet-button",
      "text-on-light"
    );
  });
});
