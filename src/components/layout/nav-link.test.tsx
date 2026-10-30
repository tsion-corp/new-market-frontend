import { render, screen } from "@testing-library/react";
import { usePathname } from "next/navigation";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { NavLink } from "./nav-link";

vi.mock("next/navigation", () => ({ usePathname: vi.fn() }));

const icon = { src: "/icons/nav-games.svg", width: 25.18, height: 23.698 };

describe("NavLink", () => {
  beforeEach(() => {
    vi.mocked(usePathname).mockReturnValue("/home");
  });

  it("links to its route with its label as the name", () => {
    render(<NavLink href="/games" label="Games" icon={icon} />);
    expect(screen.getByRole("link", { name: "Games" })).toHaveAttribute("href", "/games");
  });

  it("marks the current route with aria-current", () => {
    vi.mocked(usePathname).mockReturnValue("/games");
    render(<NavLink href="/games" label="Games" icon={icon} />);
    expect(screen.getByRole("link", { name: "Games" })).toHaveAttribute("aria-current", "page");
  });

  it("marks a nested route of its section as current", () => {
    vi.mocked(usePathname).mockReturnValue("/games/arkjet");
    render(<NavLink href="/games" label="Games" icon={icon} />);
    expect(screen.getByRole("link", { name: "Games" })).toHaveAttribute("aria-current", "page");
  });

  it("does not mark other routes as current", () => {
    vi.mocked(usePathname).mockReturnValue("/gamesroom");
    render(<NavLink href="/games" label="Games" icon={icon} />);
    expect(screen.getByRole("link", { name: "Games" })).not.toHaveAttribute("aria-current");
  });

  it("renders the icon as decoration shaped by its file", () => {
    const { container } = render(<NavLink href="/games" label="Games" icon={icon} />);
    const shape = container.querySelector('[aria-hidden="true"]') as HTMLElement;
    expect(shape.style.maskImage).toBe(`url("${icon.src}")`);
  });

  it("paints the current link's icon with the brand gradient", () => {
    vi.mocked(usePathname).mockReturnValue("/games");
    const { container } = render(<NavLink href="/games" label="Games" icon={icon} />);
    expect(container.querySelector('[aria-hidden="true"]')).toHaveClass(
      "bg-(image:--gradient-nav-active)"
    );
  });

  it("paints other sidebar icons white", () => {
    const { container } = render(<NavLink href="/games" label="Games" icon={icon} />);
    const shape = container.querySelector('[aria-hidden="true"]');
    expect(shape).toHaveClass("bg-foreground");
    expect(shape).not.toHaveClass("bg-(image:--gradient-nav-active)");
  });

  it("paints other bottom-bar icons the inactive grey and the current one with the gradient", () => {
    const { container, rerender } = render(
      <NavLink href="/games" label="Games" icon={icon} variant="bar" />
    );
    expect(container.querySelector('[aria-hidden="true"]')).toHaveClass("bg-nav-inactive");
    vi.mocked(usePathname).mockReturnValue("/games");
    rerender(<NavLink href="/games" label="Games" icon={icon} variant="bar" />);
    expect(container.querySelector('[aria-hidden="true"]')).toHaveClass(
      "bg-(image:--gradient-nav-active)"
    );
  });

  it("renders a trailing icon when given one", () => {
    const { container } = render(
      <NavLink
        href="/trading"
        label="Trading"
        icon={icon}
        trailing={{ src: "/icons/chevron-down.svg", width: 18.908, height: 18.908 }}
      />
    );
    expect(container.querySelector('img[src="/icons/chevron-down.svg"]')).toBeInTheDocument();
  });

  it("uses the bar layout for the bottom navigation", () => {
    render(<NavLink href="/games" label="Games" icon={icon} variant="bar" />);
    expect(screen.getByText("Games")).toHaveClass("font-funnel-sans");
  });
});
