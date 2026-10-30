"use client";

import { useId, type ReactNode } from "react";
import { IconButton } from "@/components/ui/icon-button";
import { SectionHeader } from "@/components/ui/section-header";
import { useCarousel } from "@/hooks/use-carousel";
import { cn } from "@/lib/utils";

const CHEVRON_ICON = { src: "/icons/chevron-down.svg", width: 18.908, height: 18.908 };

export interface CarouselProps {
  label: string;
  title?: ReactNode;
  level?: 2 | 3;
  children: ReactNode;
  className?: string;
  viewportClassName?: string;
}

export function Carousel({
  label,
  title = label,
  level,
  children,
  className,
  viewportClassName,
}: CarouselProps) {
  const viewportId = useId();
  const { viewportRef, canPrev, canNext, prev, next } = useCarousel();

  return (
    <section
      aria-roledescription="carousel"
      aria-label={label}
      className={cn("flex min-w-0 flex-col gap-3 xl:gap-6", className)}
    >
      <SectionHeader
        title={title}
        level={level}
        controls={
          <div className="flex shrink-0 items-center gap-[7.733px]">
            <IconButton
              aria-label="Previous"
              aria-controls={viewportId}
              variant="carousel-prev"
              icon={CHEVRON_ICON}
              iconClassName="size-[22.933px] rotate-90"
              disabled={!canPrev}
              onClick={prev}
            />
            <IconButton
              aria-label="Next"
              aria-controls={viewportId}
              variant="carousel-next"
              icon={CHEVRON_ICON}
              iconClassName="size-[22.933px] -rotate-90"
              disabled={!canNext}
              onClick={next}
            />
          </div>
        }
      />
      <div
        id={viewportId}
        ref={viewportRef}
        className={cn(
          "flex snap-x snap-mandatory [scrollbar-width:none] gap-[15.574px] overflow-x-auto overscroll-x-contain *:shrink-0 *:snap-start xl:gap-3 [&::-webkit-scrollbar]:hidden",
          viewportClassName
        )}
      >
        {children}
      </div>
    </section>
  );
}
