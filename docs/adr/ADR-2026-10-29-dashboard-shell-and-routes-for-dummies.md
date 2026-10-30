# The dashboard and the app's main layout, in plain English

- **Status:** Accepted
- **Technical version:** [ADR-2026-10-29-dashboard-shell-and-routes.md](ADR-2026-10-29-dashboard-shell-and-routes.md)

## What is the problem?

The designer has finished the Home screen people see after signing in: the menu on the left, the search bar and profile picture at the top, the balance, recent transactions, prediction questions and games. The menu also points to pages that are not designed yet, and we do not want buttons that lead nowhere.

## What are we doing about it?

We will build the Home screen at its own web address, `/home`, exactly as drawn, down to the size of every gap and letter, on both desktop and phone. The menu, top bar and phone navigation are built once and shared by every signed-in page. Every menu item gets a simple real page that says it is not designed yet, so nothing is a dead end. The public landing page at the main address stays as it is.

## What changes for people?

Visitors can open the new Home screen and click every menu item. The pages that are not designed yet are honest about it. As each new design arrives, its simple page is swapped for the real one. Checking that every page stays fast takes a little longer in our automatic checks because there are more pages.

## What could go wrong?

The design shows only a large desktop and a phone, not the sizes in between, so tablets could look odd. The plan proposes how in-between sizes behave, for approval, and we check the screen against the design side by side before it ships.
