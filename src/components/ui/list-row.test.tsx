import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ListRow } from "./list-row";

describe("ListRow", () => {
  it("renders leading, title, subtitle and trailing as a list item", () => {
    render(
      <ul>
        <ListRow
          leading={<span>icon</span>}
          title="Sent Money"
          subtitle="Matt Exousia"
          trailing="$4,500"
        />
      </ul>
    );
    const row = screen.getByRole("listitem");
    expect(within(row).getByText("icon")).toBeInTheDocument();
    expect(within(row).getByText("Sent Money")).toHaveClass("text-row-title", "text-foreground");
    expect(within(row).getByText("Matt Exousia")).toHaveClass(
      "text-row-caption",
      "text-muted-foreground"
    );
    expect(within(row).getByText("$4,500")).toHaveClass("text-row-amount");
  });
});
