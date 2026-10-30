import { cva, type VariantProps } from "class-variance-authority";
import Link from "next/link";
import type { ComponentProps } from "react";
import { Icon, type IconSource } from "@/components/ui/icon";
import { cn } from "@/lib/utils";

const iconButtonVariants = cva(
  "inline-flex shrink-0 cursor-pointer items-center justify-center overflow-clip rounded-full transition-colors disabled:pointer-events-none disabled:cursor-default disabled:opacity-40",
  {
    variants: {
      variant: {
        glass: "size-10 xl:size-[47.131px] [&>img]:size-full",
        ghost: "size-[40.458px] hover:bg-surface-active xl:size-[36.694px]",
        tint: "size-[39.692px] border-[1.045px] border-edge-medium bg-tint hover:border-edge-strong xl:size-9 xl:border-[0.947px]",
        "carousel-prev":
          "band-ring size-10 rounded-carousel-prev bg-(image:--gradient-carousel-prev) px-[7.843px] py-[5.976px] [--band-ring-opacity:0.2] [--band-ring-width:0.373px] band-ring-gradient",
        "carousel-next":
          "band-ring size-10 rounded-carousel-next bg-(image:--gradient-carousel-next) px-[7.843px] py-[5.976px] [--band-ring-opacity:0.2] [--band-ring-width:0.373px] band-ring-gradient",
      },
    },
    defaultVariants: { variant: "ghost" },
  }
);

type IconButtonOwnProps = VariantProps<typeof iconButtonVariants> & {
  "aria-label": string;
  icon: IconSource;
  iconClassName?: string;
};

type IconButtonAsButton = IconButtonOwnProps &
  Omit<ComponentProps<"button">, "aria-label" | "children"> & { href?: undefined };

type IconButtonAsLink = IconButtonOwnProps &
  Omit<ComponentProps<typeof Link>, "aria-label" | "children" | "href"> & { href: string };

export type IconButtonProps = IconButtonAsButton | IconButtonAsLink;

export function IconButton(props: IconButtonProps) {
  if (props.href !== undefined) {
    const { variant, icon, iconClassName, className, ...linkProps } = props;
    return (
      <Link className={cn(iconButtonVariants({ variant }), className)} {...linkProps}>
        <Icon {...icon} className={iconClassName} />
      </Link>
    );
  }
  const { variant, icon, iconClassName, className, type = "button", ...buttonProps } = props;
  return (
    <button type={type} className={cn(iconButtonVariants({ variant }), className)} {...buttonProps}>
      <Icon {...icon} className={iconClassName} />
    </button>
  );
}
