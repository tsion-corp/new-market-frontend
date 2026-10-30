import { useReducer, useRef, type RefCallback } from "react";

type Edges = { canPrev: boolean; canNext: boolean };

type EdgeAction = { type: "start-visible" | "end-visible"; visible: boolean };

function edgesReducer(state: Edges, action: EdgeAction): Edges {
  if (action.type === "start-visible") return { ...state, canPrev: !action.visible };
  return { ...state, canNext: !action.visible };
}

function scrollBehavior(): ScrollBehavior {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
}

export function useCarousel(): Edges & {
  viewportRef: RefCallback<HTMLElement>;
  prev: () => void;
  next: () => void;
} {
  const [edges, dispatch] = useReducer(edgesReducer, { canPrev: false, canNext: true });
  const viewport = useRef<HTMLElement | null>(null);

  const viewportRef: RefCallback<HTMLElement> = (node) => {
    viewport.current = node;
    const first = node?.firstElementChild;
    const last = node?.lastElementChild;
    if (!node || !first || !last) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.target === first) {
            dispatch({ type: "start-visible", visible: entry.isIntersecting });
          }
          if (entry.target === last) {
            dispatch({ type: "end-visible", visible: entry.isIntersecting });
          }
        }
      },
      { root: node, threshold: 0.99 }
    );
    observer.observe(first);
    observer.observe(last);
    return () => {
      observer.disconnect();
      viewport.current = null;
    };
  };

  function scrollByPage(direction: 1 | -1) {
    const node = viewport.current;
    if (!node) return;
    node.scrollBy({ left: direction * node.clientWidth, behavior: scrollBehavior() });
  }

  return {
    ...edges,
    viewportRef,
    prev: () => scrollByPage(-1),
    next: () => scrollByPage(1),
  };
}
